import { useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export const useDocumentLanguage = () => {
  const { language, t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = language;

    const skipLink = document.getElementById('skip-link');

    if (skipLink) {
      skipLink.textContent = t('Skip to main content');
    }
  }, [language, t]);
};
