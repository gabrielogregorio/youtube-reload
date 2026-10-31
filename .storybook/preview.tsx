import { useEffect, type ReactNode } from 'react';
import { Preview } from '@storybook/react-vite';
import { LanguageEnum } from '../src/core/i18n';
import { setLanguage } from '../src/core/states/redux/features/language/slices';
import { store } from '../src/core/states/redux/store';
import { MockProviders } from '../src/core/utils/mockProviders';
import '../src/assets/tailwindConfig.css';

interface ILanguageFromToolbarProps {
  language: LanguageEnum;
  children: ReactNode;
}

const LanguageFromToolbar = ({ language, children }: ILanguageFromToolbarProps) => {
  useEffect(() => {
    store.dispatch(setLanguage(language));
    document.documentElement.lang = language;
  }, [language]);

  return children;
};

const preview: Preview = {
  tags: ['autodocs'],

  // Before the first render, otherwise a flow can start in the browser language.
  beforeEach: ({ globals }) => {
    store.dispatch(setLanguage(globals.language));
  },

  globalTypes: {
    language: {
      description: 'Interface language',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: [
          { value: LanguageEnum.English, title: 'English' },
          { value: LanguageEnum.Portuguese, title: 'Português (Brasil)' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: { language: LanguageEnum.English },

  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    options: {
      storySort: { order: ['Welcome', 'Foundations', 'Music', 'Notifications', 'Navigation', 'Highlights', 'Pages'] },
    },
  },

  decorators: [
    (Story, { globals, parameters }) => (
      <MockProviders>
        <LanguageFromToolbar language={globals.language}>
          <div className={parameters.fullPage ? 'bg-dark-slate text-white' : 'bg-dark-slate text-white p-6'}>
            <Story />
          </div>
        </LanguageFromToolbar>
      </MockProviders>
    ),
  ],
};

export default preview;
