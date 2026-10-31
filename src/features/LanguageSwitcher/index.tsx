import { ChangeEvent } from 'react';
import { LanguageEnum, LANGUAGES } from '@/core/i18n';
import { useTranslation } from '@/hooks/useTranslation';
import { LogService } from '@/services/log/LogService';

export const LanguageSwitcher = () => {
  const { language, t, changeLanguage } = useTranslation();

  const handleChangeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    LogService.addBreadcrumb({ type: 'click', level: 'info', message: `change language to ${event.target.value}` });
    changeLanguage(event.target.value as LanguageEnum);
  };

  return (
    <select
      id="language-switcher"
      aria-label={t('Language')}
      title={t('Language')}
      value={language}
      onChange={handleChangeLanguage}
      className="ml-2 h-7 rounded-md bg-dark-charcoal px-1 text-xs font-bold text-white-ultra-light cursor-pointer hover:bg-dark-grey transition-all duration-150">
      {LANGUAGES.map((item) => (
        <option key={item.code} value={item.code} title={item.name}>
          {item.label}
        </option>
      ))}
    </select>
  );
};
