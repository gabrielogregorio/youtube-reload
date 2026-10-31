import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { LanguageEnum } from '@/core/i18n';
import { setLanguage } from '@/core/states/redux/features/language/slices';
import { store } from '@/core/states/redux/store';
import { Header } from '@/layouts/header';
import { Logo } from '@/layouts/logo';
import { Navbar } from '@/layouts/navbar';

const meta: Meta<typeof Navbar> = { title: 'Navigation/Menu', component: Navbar };

export default meta;

export const Menu: StoryObj<typeof Navbar> = {};

export const OpensAnotherScreen: StoryObj<typeof Navbar> = {
  play: async ({ canvas, userEvent }) => {
    const likes = canvas.getByRole('button', { name: 'Likes' });

    await userEvent.click(likes);

    await expect(likes).toHaveAccessibleName('Likes');
  },
};

export const Brand: StoryObj<typeof Logo> = { render: () => <Logo /> };

export const PageHeader: StoryObj<typeof Header> = { render: () => <Header /> };

export const Language: StoryObj<typeof LanguageSwitcher> = {
  render: () => <LanguageSwitcher />,
  play: async ({ canvas, userEvent }) => {
    const language = canvas.getByRole('combobox', { name: 'Language' });

    await userEvent.selectOptions(language, LanguageEnum.Portuguese);

    await expect(store.getState().features.languageFeature.language).toBe(LanguageEnum.Portuguese);

    store.dispatch(setLanguage(LanguageEnum.English));
  },
};
