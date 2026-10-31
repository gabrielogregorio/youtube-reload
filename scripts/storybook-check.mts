// Opens every story of the built Storybook in a real browser. Fails when one does not render, when a
// flow stops working or when axe finds a WCAG A or AA violation.
import { createRequire } from 'node:module';
import { Launcher } from 'chrome-launcher';
import { launch, type Browser } from 'puppeteer-core';
import { serveTheThumbnailsLocally } from './thumbnails.mts';

interface IStorybookEntry {
  id: string;
  type: 'story' | 'docs';
}

interface IAxeViolation {
  id: string;
  nodes: { target: string[] }[];
}

interface IStoryResult {
  phase: string;
  hasErrorDisplay: boolean;
  violations: IAxeViolation[];
}

const STORYBOOK_URL = process.env.STORYBOOK_URL ?? 'http://127.0.0.1:6007/';
const WCAG_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
const FAILED_PHASES = ['errored', 'aborted', 'playErrored', 'renderErrored'];
const FINISHED_PHASES = ['completed', 'finished', ...FAILED_PHASES];
const TIME_TO_RENDER_IN_MS = 20000;

const axeSourcePath = createRequire(import.meta.url).resolve('axe-core/axe.min.js');

const checkEntry = async (browser: Browser, entry: IStorybookEntry, unexpectedHosts: Set<string>): Promise<string[]> => {
  const page = await browser.newPage();
  const problems: string[] = [];

  page.on('pageerror', (error) => problems.push(`uncaught error: ${(error as Error).message}`));
  // A flow that fails only reaches the console: the story still ends as finished.
  page.on('console', (message) => {
    if (message.type() === 'error' && !message.text().includes('net::ERR')) {
      problems.push(`console error: ${message.text().slice(0, 200)} ${message.location().url ?? ''}`);
    }
  });
  page.setDefaultTimeout(TIME_TO_RENDER_IN_MS);

  await serveTheThumbnailsLocally(page, new URL(STORYBOOK_URL).origin, unexpectedHosts);
  await page.goto(new URL(`iframe.html?id=${entry.id}&viewMode=${entry.type}`, STORYBOOK_URL).href);

  await page.waitForFunction(
    `document.body.classList.contains('sb-show-errordisplay') ||
     ${
       entry.type === 'docs'
         ? `document.querySelector('#storybook-docs')?.childElementCount > 0`
         : `${JSON.stringify(FINISHED_PHASES)}.includes(window.__STORYBOOK_PREVIEW__?.currentRender?.phase)`
     }`,
  );

  await page.addScriptTag({ path: axeSourcePath });

  const result = (await page.evaluate(`(async () => {
    await Promise.all(
      document.getAnimations()
        .filter((animation) => animation.effect?.getTiming().iterations !== Infinity)
        .map((animation) => animation.finished.catch(() => undefined)),
    );

    const root = document.querySelector('${entry.type === 'docs' ? '#storybook-docs' : '#storybook-root'}');
    const audit = await window.axe.run(root, { runOnly: { type: 'tag', values: ${JSON.stringify(WCAG_AA_TAGS)} } });

    return {
      phase: window.__STORYBOOK_PREVIEW__?.currentRender?.phase ?? '',
      hasErrorDisplay: document.body.classList.contains('sb-show-errordisplay'),
      violations: audit.violations.map(({ id, nodes }) => ({ id, nodes: nodes.map(({ target }) => ({ target })) })),
    };
  })()`)) as IStoryResult;

  if (result.hasErrorDisplay || FAILED_PHASES.includes(result.phase)) {
    const message = await page.evaluate(`document.querySelector('#error-message')?.innerText ?? ''`);
    problems.push(`did not finish (${result.phase}): ${String(message).slice(0, 200)}`);
  }

  result.violations.forEach(({ id, nodes }) => {
    problems.push(`axe ${id}: ${nodes.map(({ target }) => target.join(' ')).join(', ')}`);
  });

  await page.close();

  return problems;
};

const response = await fetch(new URL('index.json', STORYBOOK_URL));

if (!response.ok) {
  throw new Error(`Storybook index answered ${response.status}`);
}

const { entries } = (await response.json()) as { entries: Record<string, IStorybookEntry> };
const stories = Object.values(entries);

const browser = await launch({
  executablePath: Launcher.getFirstInstallation(),
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--lang=en-US'],
  defaultViewport: { width: 1280, height: 720 },
});

const unexpectedHosts = new Set<string>();
let failures = 0;

try {
  for (const entry of stories) {
    const problems = await checkEntry(browser, entry, unexpectedHosts);

    if (problems.length > 0) {
      failures += 1;
      console.error(`✖ ${entry.id}`);
      problems.forEach((problem) => console.error(`    ${problem}`));
    }
  }
} finally {
  await browser.close();
}

console.log(`${stories.length - failures} of ${stories.length} stories and docs pages passed`);

if (unexpectedHosts.size > 0) {
  console.error(`Hosts that are not mocked: ${[...unexpectedHosts].join(', ')}`);
  process.exitCode = 1;
}

if (failures > 0) {
  process.exitCode = 1;
}
