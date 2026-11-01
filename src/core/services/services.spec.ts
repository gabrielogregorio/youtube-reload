import * as Sentry from '@sentry/react';
import { vi } from 'vitest';
import { LanguageEnum } from '@/core/i18n';
import { LanguageService } from '@/services/LanguageService';
import { LogService } from '@/services/log/LogService';
import { storagePrefixFor } from '@/services/storageKey';
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

  it('should save under the prefix of the project, never under a bare key', () => {
    StorageService.setItem(StorageAccessNameEnum.Profile, 'value');

    expect(localStorage.getItem('youtube-reload.profile')).toBe('value');
    expect(localStorage.getItem('profile')).toBeNull();
  });

  it('should clear only its own keys, because the origin is shared with other projects', () => {
    localStorage.setItem('another-project.data', 'from another project');
    localStorage.setItem('youtube-reload-preview.dev.profile', 'from a preview');
    localStorage.setItem('youtube-reload-storybook.profile', 'from the storybook');
    StorageService.setItem(StorageAccessNameEnum.Profile, 'value');

    StorageService.clear();

    expect(StorageService.getItem(StorageAccessNameEnum.Profile)).toBeUndefined();
    expect(localStorage.getItem('another-project.data')).toBe('from another project');
    expect(localStorage.getItem('youtube-reload-preview.dev.profile')).toBe('from a preview');
    expect(localStorage.getItem('youtube-reload-storybook.profile')).toBe('from the storybook');
  });

  it('should move a value saved under the old bare key', () => {
    localStorage.setItem('profile', 'saved before the prefix');

    expect(StorageService.getItem(StorageAccessNameEnum.Profile)).toBe('saved before the prefix');
    expect(localStorage.getItem('youtube-reload.profile')).toBe('saved before the prefix');
    expect(localStorage.getItem('profile')).toBeNull();
  });

  it('should prefer the prefixed value over an old bare key', () => {
    localStorage.setItem('profile', 'old');
    StorageService.setItem(StorageAccessNameEnum.Profile, 'new');

    expect(StorageService.getItem(StorageAccessNameEnum.Profile)).toBe('new');
    expect(localStorage.getItem('profile')).toBe('old');
  });

  it('should leave the old bare keys alone outside the site', () => {
    window.history.pushState({}, '', '/youtube-reload/storybook/iframe.html');
    localStorage.setItem('profile', 'belongs to the site');

    expect(StorageService.getItem(StorageAccessNameEnum.Profile)).toBeUndefined();
    expect(localStorage.getItem('profile')).toBe('belongs to the site');

    window.history.pushState({}, '', '/');
  });

  it('should parse json and treat a missing or corrupted value as empty', () => {
    expect(StorageService.getItemAndParse(StorageAccessNameEnum.Notify)).toBeUndefined();

    StorageService.setItem(StorageAccessNameEnum.Notify, '[1,2]');
    expect(StorageService.getItemAndParse(StorageAccessNameEnum.Notify)).toEqual([1, 2]);

    StorageService.setItem(StorageAccessNameEnum.Notify, '{broken');
    expect(StorageService.getItemAndParse(StorageAccessNameEnum.Notify)).toBeUndefined();
  });
});

describe('storagePrefixFor', () => {
  it.each([
    ['/youtube-reload/', 'youtube-reload.'],
    ['/youtube-reload/some/route', 'youtube-reload.'],
    ['/youtube-reload/preview/dev/', 'youtube-reload-preview.dev.'],
    ['/youtube-reload/storybook/iframe.html', 'youtube-reload-storybook.'],
    ['/youtube-reload/storybook/dev/iframe.html', 'youtube-reload-storybook-preview.dev.'],
    ['/iframe.html', 'youtube-reload.'],
  ])('should map %s to %s', (pathname, prefix) => {
    expect(storagePrefixFor(pathname)).toBe(prefix);
  });

  it('should not let one environment start like another', () => {
    const prefixes = [
      '/youtube-reload/',
      '/youtube-reload/preview/dev/',
      '/youtube-reload/storybook/',
      '/youtube-reload/storybook/dev/',
    ].map(storagePrefixFor);

    prefixes.forEach((prefix) => {
      expect(prefixes.filter((other) => other.startsWith(prefix))).toEqual([prefix]);
    });
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
