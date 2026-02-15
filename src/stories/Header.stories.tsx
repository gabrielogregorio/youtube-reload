//@ts-ignore
import { Meta, StoryObj } from '@storybook/react';
//@ts-ignore
import { fn } from 'storybook/test';
import { Header } from './Header.jsx';

const meta = {
  title: 'Example/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
    user: {
      name: 'Jane Doe',
    },
  },
};

// @ts-ignore
export const LoggedOut: Story = {};
