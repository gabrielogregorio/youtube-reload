// Uses the production build served on BASE_URL like a person would, reads what Chrome really takes
// from the machine and fails when the site goes over the memory limit. CPU is reported, not enforced,
// because it depends on the machine running the check.
import { execSync } from 'node:child_process';
import { appendFileSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { setTimeout as wait } from 'node:timers/promises';
import { Launcher } from 'chrome-launcher';
import { launch, type Page } from 'puppeteer-core';

const BASE_URL = process.env.BASE_URL ?? 'http://127.0.0.1:5556/youtube-reload/';
const MAX_SITE_MEMORY_IN_MB = Number(process.env.MAX_SITE_MEMORY_IN_MB ?? 300);
const REPORT_FILE = 'resourceUsageReport.json';
const SAMPLE_INTERVAL_IN_MS = 500;
const TIME_FOR_THE_SCREEN_TO_SETTLE_IN_MS = 300;
const ROUNDS_OF_USE = 5;
const KB_IN_A_MB = 1024;
const FIRST_TIME_FIELD_AFTER_THE_NAME = 11;

if (process.platform !== 'linux') {
  throw new Error('This check reads /proc, so it only runs on Linux');
}

const clockTicksPerSecond = Number(execSync('/usr/bin/getconf CLK_TCK').toString());

const readProcessFile = (pid: number, file: string): string => {
  try {
    return readFileSync(`/proc/${pid}/${file}`, 'utf8');
  } catch {
    // Chrome starts and ends processes all the time, so one can vanish between two reads.
    return '';
  }
};

const listThreads = (pid: number): string[] => {
  try {
    return readdirSync(`/proc/${pid}/task`);
  } catch {
    return [];
  }
};

const listProcessTree = (pid: number): number[] => {
  const children = listThreads(pid).flatMap((thread) =>
    readProcessFile(pid, `task/${thread}/children`).trim().split(/\s+/).filter(Boolean),
  );

  return [pid, ...children.flatMap((child) => listProcessTree(Number(child)))];
};

const readMemoryInMb = (pid: number): number => {
  const proportionalSetSize = /^Pss:\s+(\d+)/m.exec(readProcessFile(pid, 'smaps_rollup'));

  return proportionalSetSize ? Number(proportionalSetSize[1]) / KB_IN_A_MB : 0;
};

const readCpuTicks = (pid: number): number => {
  const stat = readProcessFile(pid, 'stat');
  const fieldsAfterTheName = stat.slice(stat.lastIndexOf(')') + 2).split(' ');
  const userTicks = Number(fieldsAfterTheName[FIRST_TIME_FIELD_AFTER_THE_NAME]);
  const systemTicks = Number(fieldsAfterTheName[FIRST_TIME_FIELD_AFTER_THE_NAME + 1]);

  return userTicks + systemTicks || 0;
};

const isRenderer = (pid: number): boolean => readProcessFile(pid, 'cmdline').includes('--type=renderer');

const createMonitor = (chromePid: number) => {
  const usage = { peakSiteMemoryInMb: 0, peakChromeMemoryInMb: 0, peakCpuPercent: 0, cpuSeconds: 0 };
  const lastTicksByPid = new Map<number, number>();
  let lastSampleAt = performance.now();

  const sample = () => {
    const now = performance.now();
    const pids = listProcessTree(chromePid);
    let siteMemoryInMb = 0;
    let chromeMemoryInMb = 0;
    let newTicks = 0;

    pids.forEach((pid) => {
      const memoryInMb = readMemoryInMb(pid);
      const ticks = readCpuTicks(pid);

      chromeMemoryInMb += memoryInMb;
      siteMemoryInMb += isRenderer(pid) ? memoryInMb : 0;
      newTicks += Math.max(ticks - (lastTicksByPid.get(pid) ?? ticks), 0);
      lastTicksByPid.set(pid, ticks);
    });

    const cpuSeconds = newTicks / clockTicksPerSecond;
    const elapsedSeconds = (now - lastSampleAt) / 1000;

    usage.cpuSeconds += cpuSeconds;
    usage.peakSiteMemoryInMb = Math.max(usage.peakSiteMemoryInMb, siteMemoryInMb);
    usage.peakChromeMemoryInMb = Math.max(usage.peakChromeMemoryInMb, chromeMemoryInMb);
    usage.peakCpuPercent = Math.max(usage.peakCpuPercent, (cpuSeconds / elapsedSeconds) * 100);
    lastSampleAt = now;
  };

  return { sample, usage };
};

const clickButton = async (page: Page, scope: string, text: string): Promise<void> => {
  await page.$$eval(
    `${scope} button`,
    (buttons, buttonText) => {
      const button = buttons.find((candidate) => candidate.textContent?.trim() === buttonText);

      if (!button) {
        throw new Error(`Button "${buttonText}" not found`);
      }

      (button as HTMLElement).click();
    },
    text,
  );

  await wait(TIME_FOR_THE_SCREEN_TO_SETTLE_IN_MS);
};

const useTheSite = async (page: Page): Promise<void> => {
  await clickButton(page, 'nav', 'Home');
  await clickButton(page, 'body', 'Generate Playlist');
  await clickButton(page, 'main', 'Like');
  await clickButton(page, 'main', 'Ignore');
  await clickButton(page, 'nav', 'Likes');
  await clickButton(page, 'nav', 'UnLikes');
  await clickButton(page, 'nav', 'Home');

  await page.click('#open-notify');
  await page.click('#notify-backdrop');

  await page.select('#language-switcher', 'pt-BR');
  await page.select('#language-switcher', 'en');
  await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
  await wait(TIME_FOR_THE_SCREEN_TO_SETTLE_IN_MS);
  await page.evaluate('window.scrollTo(0, 0)');
};

const browser = await launch({
  executablePath: Launcher.getFirstInstallation(),
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--lang=en-US'],
  defaultViewport: { width: 1280, height: 720 },
});

const chromePid = browser.process()?.pid;

if (!chromePid) {
  throw new Error('Chrome started without a process id');
}

const { sample, usage } = createMonitor(chromePid);
const sampling = setInterval(sample, SAMPLE_INTERVAL_IN_MS);
const startedAt = performance.now();

try {
  const [page] = await browser.pages();

  await page.goto(`${BASE_URL}?lang=en`, { waitUntil: 'networkidle2' });

  for (let round = 0; round < ROUNDS_OF_USE; round += 1) {
    await useTheSite(page);
  }
} finally {
  clearInterval(sampling);
  sample();
  await browser.close();
}

const durationInSeconds = (performance.now() - startedAt) / 1000;

const report = {
  maxSiteMemoryInMb: MAX_SITE_MEMORY_IN_MB,
  peakSiteMemoryInMb: Math.round(usage.peakSiteMemoryInMb),
  peakChromeMemoryInMb: Math.round(usage.peakChromeMemoryInMb),
  peakCpuPercentOfOneCore: Math.round(usage.peakCpuPercent),
  averageCpuPercentOfOneCore: Math.round((usage.cpuSeconds / durationInSeconds) * 100),
  durationInSeconds: Math.round(durationInSeconds),
};

writeFileSync(REPORT_FILE, `${JSON.stringify(report, null, 2)}\n`);
console.log(`site memory peak: ${report.peakSiteMemoryInMb} MB (maximum ${MAX_SITE_MEMORY_IN_MB} MB)`);
console.log(`whole Chrome peak: ${report.peakChromeMemoryInMb} MB (report only)`);
console.log(`CPU: ${report.averageCpuPercentOfOneCore}% on average, ${report.peakCpuPercentOfOneCore}% at peak, of one core (report only)`);

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    [
      '### Resource usage',
      '',
      '| Metric | Value |',
      '|---|---|',
      `| Site memory peak (limit ${MAX_SITE_MEMORY_IN_MB} MB) | ${report.peakSiteMemoryInMb} MB |`,
      `| Whole Chrome peak | ${report.peakChromeMemoryInMb} MB |`,
      `| CPU average, one core | ${report.averageCpuPercentOfOneCore}% |`,
      `| CPU peak, one core | ${report.peakCpuPercentOfOneCore}% |`,
      '',
    ].join('\n'),
  );
}

if (report.peakSiteMemoryInMb > MAX_SITE_MEMORY_IN_MB) {
  console.error(`The site used ${report.peakSiteMemoryInMb} MB, over the ${MAX_SITE_MEMORY_IN_MB} MB limit`);
  process.exitCode = 1;
}
