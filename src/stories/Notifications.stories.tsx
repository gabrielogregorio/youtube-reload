import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { Notify } from '@/features/Notify';
import { StorageService } from '@/services/StorageService';

const BellInHeader = () => (
  <div className="relative h-[28rem]">
    <div className="flex justify-end h-14 items-center">
      <Notify />
    </div>
  </div>
);

const meta: Meta<typeof BellInHeader> = {
  title: 'Notifications/Bell',
  component: BellInHeader,
  beforeEach: () => {
    StorageService.clear();
  },
};

export default meta;

export const WithUnread: StoryObj<typeof BellInHeader> = {};

export const OpenAndCloseOnTheBackdrop: StoryObj<typeof BellInHeader> = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(await canvas.findByRole('button', { name: /Open notifications/ }));

    await expect(canvas.getByRole('dialog', { name: 'Notifications' })).toBeVisible();

    await userEvent.click(canvasElement.querySelector('#notify-backdrop') as HTMLElement);

    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
  },
};

export const OpenPanel: StoryObj<typeof BellInHeader> = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(await canvas.findByRole('button', { name: /Open notifications/ }));

    await expect(canvas.getByRole('dialog', { name: 'Notifications' })).toBeVisible();
  },
};
