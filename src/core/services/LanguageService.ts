import { detectLanguage, LanguageEnum } from '@/core/i18n';
import { StorageAccessNameEnum, StorageService } from '@/services/StorageService';

export class LanguageService {
  public static getInitialLanguage(): LanguageEnum {
    return detectLanguage({
      search: window.location.search,
      stored: StorageService.getItem(StorageAccessNameEnum.Language),
      navigatorLanguage: navigator.language,
    });
  }

  public static saveLanguage(language: LanguageEnum) {
    StorageService.setItem(StorageAccessNameEnum.Language, language);
  }
}
