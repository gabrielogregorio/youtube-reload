import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Cards } from '@/modules/musicCards/cards';
import { Card } from '@/modules/musicCards/cards/card';
import { ReactButton } from '@/modules/musicCards/cards/reactButton';
import { GeneratePlaylist } from '@/modules/musicCards/generatePlaylists';
import { ReactionEnum } from '@/modules/musicCards/services/ReactionsService';
import { realSongs } from './helpers';

const CardInList: typeof Card = (props) => (
  <ul className="w-72 list-none">
    <Card {...props} />
  </ul>
);

const meta: Meta<typeof CardInList> = {
  title: 'Music/Card',
  component: CardInList,
  args: { playlistLocal: realSongs[0], sendReaction: fn(), reaction: ReactionEnum.none, index: 0 },
};

export default meta;

type Story = StoryObj<typeof CardInList>;

export const NotRated: Story = {
  play: async ({ canvas, args, userEvent: user }) => {
    await user.click(canvas.getByRole('button', { name: /Like/ }));

    await expect(args.sendReaction).toHaveBeenCalledWith(realSongs[0].id, ReactionEnum.like);
  },
};

export const Liked: Story = { args: { reaction: ReactionEnum.like } };

export const Ignored: Story = { args: { reaction: ReactionEnum.unlike } };

export const LongTitle: Story = {
  args: {
    playlistLocal: {
      ...realSongs[1],
      title: 'A very long song title that keeps going to prove that the card holds the layout without breaking',
    },
  },
};

export const Playlist: StoryObj<typeof Cards> = {
  render: () => <Cards cards={realSongs} />,
};

export const LikeButton: StoryObj<typeof ReactButton> = {
  render: () => <ReactButton text="Like" title="Like" ariaLabel="Like" variant="blue" isSelected={false} sendReaction={fn()} />,
};

export const LikeButtonSelected: StoryObj<typeof ReactButton> = {
  render: () => <ReactButton text="Like" title="Like" ariaLabel="Like" variant="blue" isSelected sendReaction={fn()} />,
};

export const IgnoreButton: StoryObj<typeof ReactButton> = {
  render: () => <ReactButton text="Ignore" title="Ignore" ariaLabel="Ignore" variant="red" isSelected={false} sendReaction={fn()} />,
};

export const IgnoreButtonSelected: StoryObj<typeof ReactButton> = {
  render: () => <ReactButton text="Ignore" title="Ignore" ariaLabel="Ignore" variant="red" isSelected sendReaction={fn()} />,
};

const generateRandomPlaylist = fn();

export const GenerateButton: StoryObj<typeof GeneratePlaylist> = {
  render: () => <GeneratePlaylist generateRandomPlaylist={generateRandomPlaylist} />,
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Generate Playlist' }));

    await expect(generateRandomPlaylist).toHaveBeenCalledOnce();
  },
};
