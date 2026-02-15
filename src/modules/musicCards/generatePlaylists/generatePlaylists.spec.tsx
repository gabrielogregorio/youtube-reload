import { fireEvent, render, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { GeneratePlaylist } from '.';

describe('<GeneratePlaylist />', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render a generate playlists', () => {
    render(
      <GeneratePlaylist
        generateRandomPlaylist={() => {
          //
        }}
      />,
    );
    expect(screen.getByRole('button', { name: 'Gerar Playlist' })).toBeDefined();
  });

  it('should render a generate playlists', () => {
    const mockGenerateRandomPlaylist: Mock = vi.fn();

    expect(mockGenerateRandomPlaylist).toBeCalledTimes(0);

    render(<GeneratePlaylist generateRandomPlaylist={mockGenerateRandomPlaylist} />);
    fireEvent.click(screen.getByRole('button', { name: 'Gerar Playlist' }));

    expect(mockGenerateRandomPlaylist).toBeCalledTimes(1);
  });
});
