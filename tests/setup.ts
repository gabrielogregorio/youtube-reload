import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { LanguageEnum } from '@/core/i18n';
import { store } from '@/core/states/redux/store';
import { setScreen } from '@/core/states/redux/features/currentScreen/slices';
import { setLanguage } from '@/core/states/redux/features/language/slices';
import { saveReaction } from '@/core/states/redux/features/reactions/slices';
import { ScreenEnum } from '@/contracts/homeScreens';

beforeEach(() => {
  window.scrollTo = vi.fn();
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  store.dispatch(setScreen(ScreenEnum.home));
  store.dispatch(setLanguage(LanguageEnum.English));
  store.dispatch(saveReaction({}));
});
