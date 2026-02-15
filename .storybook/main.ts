import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mts|mtsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-onboarding',
    '@storybook/addon-docs'
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  }
};
export default config;
