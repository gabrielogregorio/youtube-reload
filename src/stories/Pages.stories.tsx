import type { Meta, StoryObj } from '@storybook/react-vite';
import { MainContainer } from '@/pages/index';
import { expect } from 'storybook/test';

const meta: Meta<typeof MainContainer> = {
  title: 'Pages/Site',
  component: MainContainer,
  parameters: { fullPage: true },
};

export default meta;

type Story = StoryObj<typeof MainContainer>;

export const Home: Story = {
  play: async ({ canvas }) => {
    await expect(await canvas.findAllByRole('button', { name: /Like/ })).not.toHaveLength(0);
  },
};

export const Phone: Story = { globals: { viewport: { value: 'mobile2' } } };

export const Tablet: Story = { globals: { viewport: { value: 'tablet' } } };
