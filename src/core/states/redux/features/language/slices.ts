import { createSlice } from '@reduxjs/toolkit';
import { LanguageEnum } from '@/core/i18n';
import { LanguageService } from '@/services/LanguageService';

export interface ILanguageFeature {
  language: LanguageEnum;
}

const initialState: ILanguageFeature = {
  language: LanguageService.getInitialLanguage(),
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, { payload }: { payload: LanguageEnum }) => {
      return {
        ...state,
        language: payload,
      };
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice;
