import { useCallback } from 'react';
import { LanguageEnum, translate, TranslateVariablesType } from '@/core/i18n';
import { languageSelector } from '@/core/states/redux/features/language/selectors';
import { setLanguage } from '@/core/states/redux/features/language/slices';
import { useAppDispatch, useAppSelector } from '@/core/states/redux/store/useRedux';
import { LanguageService } from '@/services/LanguageService';

export const useTranslation = () => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector(languageSelector);

  const t = useCallback(
    (text: string, variables?: TranslateVariablesType) => {
      return translate(language, text, variables);
    },
    [language],
  );

  const changeLanguage = useCallback(
    (newLanguage: LanguageEnum) => {
      LanguageService.saveLanguage(newLanguage);
      dispatch(setLanguage(newLanguage));
    },
    [dispatch],
  );

  return {
    language,
    t,
    changeLanguage,
  };
};
