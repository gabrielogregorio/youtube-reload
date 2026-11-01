import { isPublishedSite, storageKey, storagePrefix } from '@/services/storageKey';

export enum StorageAccessNameEnum {
  Reactions = 'reactions.v2',
  Profile = 'profile',
  Notify = 'notify',
  UserId = 'UserId',
  Language = 'language',
}

// Versions up to 5.1.3 saved these names bare. Moved rather than copied, so a removed value does not come back.
const moveLegacyValue = (key: StorageAccessNameEnum, prefixedKey: string): string | null => {
  const legacyValue = localStorage.getItem(key);

  if (legacyValue !== null) {
    localStorage.setItem(prefixedKey, legacyValue);
    localStorage.removeItem(key);
  }

  return legacyValue;
};

const read = (key: StorageAccessNameEnum): string | undefined => {
  const prefixedKey = storageKey(key);
  const value = localStorage.getItem(prefixedKey) ?? (isPublishedSite() ? moveLegacyValue(key, prefixedKey) : null);

  return value || undefined;
};

export class StorageService {
  public static setItem(key: StorageAccessNameEnum, value: string) {
    localStorage.setItem(storageKey(key), value);
  }

  public static getItem(key: StorageAccessNameEnum): string | undefined {
    return read(key);
  }

  public static removeItem(key: StorageAccessNameEnum) {
    localStorage.removeItem(storageKey(key));
  }

  /** Removes only what belongs to this environment: localStorage.clear() would erase every project of the origin. */
  public static clear() {
    const prefix = storagePrefix();

    Object.keys(localStorage)
      .filter((key) => key.startsWith(prefix))
      .forEach((key) => {
        localStorage.removeItem(key);
      });
  }

  public static getItemAndParse<T = unknown>(key: StorageAccessNameEnum): T | undefined {
    try {
      const item = read(key);

      if (item === undefined) {
        return undefined;
      }
      return JSON.parse(item) as T;
    } catch {
      // a corrupted value behaves like an empty key
      return undefined;
    }
  }
}
