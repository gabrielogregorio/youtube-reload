import { fireEvent, render, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { MockProviders } from '@/utils/mockProviders';
import { GeneratePlaylist } from '.';

describe('<GeneratePlaylist />', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render a generate playlists', () => {
    render(
      <MockProviders>
        <GeneratePlaylist generateRandomPlaylist={vi.fn()} />
      </MockProviders>,
    );
    expect(screen.getByRole('button', { name: 'Generate Playlist' })).toBeDefined();
  });

  it('should call generateRandomPlaylist on click', () => {
    const mockGenerateRandomPlaylist: Mock = vi.fn();

    expect(mockGenerateRandomPlaylist).toHaveBeenCalledTimes(0);

    render(
      <MockProviders>
        <GeneratePlaylist generateRandomPlaylist={mockGenerateRandomPlaylist} />
      </MockProviders>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Generate Playlist' }));

    expect(mockGenerateRandomPlaylist).toHaveBeenCalledTimes(1);
  });
});
