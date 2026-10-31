import { ptBR } from '@/core/i18n/locales/ptBR';

export enum LanguageEnum {
  English = 'en',
  Portuguese = 'pt-BR',
}

export const LANGUAGES: { code: LanguageEnum; label: string; name: string }[] = [
  { code: LanguageEnum.English, label: 'EN', name: 'English' },
  { code: LanguageEnum.Portuguese, label: 'PT', name: 'Português (Brasil)' },
];

export type TranslateVariablesType = Record<string, string | number>;

const dictionaries: Record<LanguageEnum, Record<string, string>> = {
  [LanguageEnum.English]: {},
  [LanguageEnum.Portuguese]: ptBR,
};

export const normalizeLanguage = (tag: string | null | undefined): LanguageEnum | undefined => {
  const language = (tag ?? '').trim().toLowerCase();

  if (language.startsWith('pt')) {
    return LanguageEnum.Portuguese;
  }

  if (language.startsWith('en')) {
    return LanguageEnum.English;
  }

  return undefined;
};

export const detectLanguage = ({
  search,
  stored,
  navigatorLanguage,
}: {
  search: string;
  stored: string | undefined;
  navigatorLanguage: string;
}): LanguageEnum => {
  const fromUrl = new URLSearchParams(search).get('lang');

  return normalizeLanguage(fromUrl) ?? normalizeLanguage(stored) ?? normalizeLanguage(navigatorLanguage) ?? LanguageEnum.English;
};

const fillVariables = (text: string, variables: TranslateVariablesType): string => {
  return text.replace(/\{(\w+)\}/g, (placeholder, name: string) => String(variables[name] ?? placeholder));
};

// English is both the source text and the key; a missing translation falls back to it.
export const translate = (language: LanguageEnum, text: string, variables: TranslateVariablesType = {}): string => {
  return fillVariables(dictionaries[language][text] ?? text, variables);
};
