import { detectLanguage, LanguageEnum, normalizeLanguage, translate } from '@/core/i18n';
import { ptBR } from '@/core/i18n/locales/ptBR';
import { randomPhrase } from '@/features/DailyHighlightCarousel/data/randomPhrase';
import { specialDates } from '@/features/DailyHighlightCarousel/data/specialDates';
import { mockNotify } from '@/features/Notify/data/notify';

describe('normalizeLanguage', () => {
  it.each([
    ['pt', LanguageEnum.Portuguese],
    ['pt-PT', LanguageEnum.Portuguese],
    [' PT-br ', LanguageEnum.Portuguese],
    ['en', LanguageEnum.English],
    ['en-US', LanguageEnum.English],
    ['fr', undefined],
    ['', undefined],
    [null, undefined],
    [undefined, undefined],
  ])('should normalize %s', (tag, expected) => {
    expect(normalizeLanguage(tag)).toBe(expected);
  });
});

describe('detectLanguage', () => {
  it('should prefer the url over everything else', () => {
    expect(detectLanguage({ search: '?lang=pt-BR', stored: 'en', navigatorLanguage: 'en-US' })).toBe(LanguageEnum.Portuguese);
  });

  it('should use the stored language when the url has none', () => {
    expect(detectLanguage({ search: '', stored: 'pt-BR', navigatorLanguage: 'en-US' })).toBe(LanguageEnum.Portuguese);
  });

  it('should use the browser language when nothing was chosen', () => {
    expect(detectLanguage({ search: '', stored: undefined, navigatorLanguage: 'pt-BR' })).toBe(LanguageEnum.Portuguese);
  });

  it('should fall back to english on an unknown language', () => {
    expect(detectLanguage({ search: '?lang=fr', stored: 'de', navigatorLanguage: 'ja' })).toBe(LanguageEnum.English);
  });
});

describe('translate', () => {
  it('should keep the english source text', () => {
    expect(translate(LanguageEnum.English, 'Home')).toBe('Home');
  });

  it('should translate to portuguese', () => {
    expect(translate(LanguageEnum.Portuguese, 'Home')).toBe('Início');
  });

  it('should fall back to english on a missing translation', () => {
    expect(translate(LanguageEnum.Portuguese, 'Not translated')).toBe('Not translated');
  });

  it('should fill the variables and keep the unknown ones', () => {
    expect(translate(LanguageEnum.Portuguese, 'Open notifications, {count} new', { count: 3 })).toBe('Abrir notificações, 3 novas');
    expect(translate(LanguageEnum.English, '{known} {unknown}', { known: 'ok' })).toBe('ok {unknown}');
  });
});

describe('pt-BR dictionary', () => {
  const sourceFiles = import.meta.glob('/src/**/*.{ts,tsx}', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

  const textsInCode = Object.entries(sourceFiles)
    .filter(([path]) => !/\.(spec|test|stories)\.|src\/stories\//.test(path))
    .flatMap(([, content]) => [...content.matchAll(/\bt\(\s*'((?:[^'\\]|\\.)*)'/g), ...content.matchAll(/\bt\(\s*"((?:[^"\\]|\\.)*)"/g)])
    .map((match) => match[1]);

  const textsInData = [
    ...Object.values(specialDates)
      .flat()
      .flatMap((date) => [date.title, date.description]),
    ...randomPhrase.map((phrase) => phrase.description),
    ...mockNotify.map((notification) => notification.title),
  ].filter(Boolean);

  it('should find the texts to check', () => {
    expect(textsInCode.length).toBeGreaterThan(30);
  });

  it.each([...new Set([...textsInCode, ...textsInData, 'Home', 'Likes', 'UnLikes'])])('should translate "%s"', (text) => {
    expect(ptBR[text]).toBeTruthy();
  });
});
