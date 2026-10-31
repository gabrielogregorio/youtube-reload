import * as Sentry from '@sentry/react';
import { vi } from 'vitest';
import { LanguageEnum } from '@/core/i18n';
import { LanguageService } from '@/services/LanguageService';
import { LogService } from '@/services/log/LogService';
import { StorageAccessNameEnum, StorageService } from '@/services/StorageService';
import { UserService } from '@/services/UserService';

vi.mock('@sentry/react');
vi.mock('@/core/env', () => ({ envs: { VITE_ENVIRONMENT: '', TIME_BUILD: '', SENTRY_DSN: '', VERSION: '' } }));

describe('StorageService', () => {
  it('should save, read and remove an item', () => {
    StorageService.setItem(StorageAccessNameEnum.Profile, 'value');
    expect(StorageService.getItem(StorageAccessNameEnum.Profile)).toBe('value');

    StorageService.removeItem(StorageAccessNameEnum.Profile);
    expect(StorageService.getItem(StorageAccessNameEnum.Profile)).toBeUndefined();
  });

  it('should clear everything', () => {
    StorageService.setItem(StorageAccessNameEnum.Profile, 'value');

    StorageService.clear();

    expect(StorageService.getItem(StorageAccessNameEnum.Profile)).toBeUndefined();
  });

  it('should parse json and treat a missing or corrupted value as empty', () => {
    expect(StorageService.getItemAndParse(StorageAccessNameEnum.Notify)).toBeUndefined();

    StorageService.setItem(StorageAccessNameEnum.Notify, '[1,2]');
    expect(StorageService.getItemAndParse(StorageAccessNameEnum.Notify)).toEqual([1, 2]);

    StorageService.setItem(StorageAccessNameEnum.Notify, '{broken');
    expect(StorageService.getItemAndParse(StorageAccessNameEnum.Notify)).toBeUndefined();
  });
});

describe('UserService', () => {
  it('should create a user and read it back', () => {
    expect(UserService.getUserId()).toBeUndefined();

    const userId = UserService.createUser();

    expect(UserService.getUserId()).toBe(userId);
  });
});

describe('LanguageService', () => {
  it('should read the language it saved', () => {
    LanguageService.saveLanguage(LanguageEnum.Portuguese);

    expect(LanguageService.getInitialLanguage()).toBe(LanguageEnum.Portuguese);
  });
});

describe('LogService', () => {
  it('should forward everything to Sentry', () => {
    const error = new Error('failure');
    const breadcrumb = { message: 'click' };

    LogService.setUser({ id: '1' });
    LogService.logError(error);
    LogService.logMessage('message');
    LogService.addBreadcrumb(breadcrumb);

    expect(Sentry.setUser).toHaveBeenCalledWith({ id: '1' });
    expect(Sentry.captureException).toHaveBeenCalledWith(error);
    expect(Sentry.captureMessage).toHaveBeenCalledWith('message');
    expect(Sentry.addBreadcrumb).toHaveBeenCalledWith(breadcrumb);
  });

  it('should start Sentry disabled while there is no dsn', async () => {
    await import('@/services/log/init');

    expect(Sentry.init).toHaveBeenCalledWith(expect.objectContaining({ enabled: false }));
  });
});
