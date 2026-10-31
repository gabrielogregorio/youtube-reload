import type { Meta, StoryObj } from '@storybook/react-vite';
import { DailyHighlightCarousel } from '@/features/DailyHighlightCarousel/DailyHighlightCarousel';
import { FloatingActionButtons } from '@/features/FloatingActionButtons';
import { fn } from 'storybook/test';
import { freezeDate } from './helpers';

const meta: Meta<typeof DailyHighlightCarousel> = { title: 'Highlights/Daily carousel', component: DailyHighlightCarousel };

export default meta;

type Story = StoryObj<typeof DailyHighlightCarousel>;

export const NewYear: Story = {
  beforeEach: freezeDate('2026-01-01T12:00:00'),
  play: async ({ canvas }) => {
    await canvas.findByRole('heading', { name: 'New Year' });
  },
};

export const Halloween: Story = {
  beforeEach: freezeDate('2026-10-31T12:00:00'),
  play: async ({ canvas }) => {
    await canvas.findByRole('heading', { name: 'Halloween' });
  },
};

export const Christmas: Story = {
  beforeEach: freezeDate('2026-12-25T12:00:00'),
  play: async ({ canvas }) => {
    await canvas.findByRole('heading', { name: 'Christmas' });
  },
};

export const OrdinaryDay: Story = { beforeEach: freezeDate('2026-06-16T12:00:00') };

export const ShortcutButtons: StoryObj<typeof FloatingActionButtons> = {
  render: () => (
    <div className="relative h-72">
      <FloatingActionButtons generateRandomPlaylist={fn()} />
    </div>
  ),
};
