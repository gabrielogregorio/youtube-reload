import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/core/states/redux/store';
import { ILanguageFeature } from '@/core/states/redux/features/language/slices';

const selectLanguage = (state: RootState): ILanguageFeature => state.features.languageFeature;

export const languageSelector = createSelector(selectLanguage, (state) => state);
