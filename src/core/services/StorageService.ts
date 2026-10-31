export enum StorageAccessNameEnum {
  Reactions = 'reactions.v2',
  Profile = 'profile',
  Notify = 'notify',
  UserId = 'UserId',
}

export class StorageService {
  public static setItem(key: StorageAccessNameEnum, value: string) {
    localStorage.setItem(key, value);
  }

  public static getItem(key: StorageAccessNameEnum): string | undefined {
    return localStorage.getItem(key) || undefined;
  }

  public static removeItem(key: StorageAccessNameEnum) {
    localStorage.removeItem(key);
  }

  public static clear() {
    localStorage.clear();
  }

  public static getItemAndParse<T = unknown>(key: string): T | undefined {
    try {
      const item: string | undefined = localStorage.getItem(key) || undefined;

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
