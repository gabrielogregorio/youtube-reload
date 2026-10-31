import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { vi } from 'vitest';
import { store } from '@/core/states/redux/store';
import { ScreenEnum } from '@/contracts/homeScreens';
import { Cards } from '@/modules/musicCards/cards';
import { useMusicApplyFilters } from '@/modules/musicCards/hooks/useMusicApplyFilters';
import { MusicFromApiMapper } from '@/modules/musicCards/mappers/get/fromApi';
import { useFetchAllMusics } from '@/modules/musicCards/hooks/useFetchAllMusics';
import { ApiReload } from '@/modules/musicCards/services/api/Reload';
import { ReactionEnum, ReactionsService } from '@/modules/musicCards/services/ReactionsService';
import { MainContainer } from '@/pages/index';
import { MockProviders } from '@/utils/mockProviders';
import { parseToYoutubeContent } from '@/modules/musicCards/utils/parseToYoutubeContent';

const firstCard = {
  id: 'id1',
  title: 'First song',
  artist: 'First artist',
  img: 'first.jpg',
  imgSet: 'first.jpg 320w',
  url: 'https://first',
};
const secondCard = {
  id: 'id2',
  title: 'Second song',
  artist: 'Second artist',
  img: 'second.jpg',
  imgSet: 'second.jpg 320w',
  url: 'https://second',
};

describe('parseToYoutubeContent', () => {
  it('should use the 320px thumbnail and offer the 480px one for wider slots', () => {
    const [card] = parseToYoutubeContent([{ id: 'abc', title: 'Song', artist: 'Artist' } as MusicFromApiMapper]);

    expect(card.img).toBe('https://img.youtube.com/vi/abc/mqdefault.jpg');
    expect(card.imgSet).toBe('https://img.youtube.com/vi/abc/mqdefault.jpg 320w, https://img.youtube.com/vi/abc/hqdefault.jpg 480w');
  });
});

describe('<Cards />', () => {
  const renderCards = () =>
    render(
      <MockProviders>
        <Cards cards={[firstCard, secondCard]} />
      </MockProviders>,
    );

  it('should load a thumbnail of the shown size, only when it gets close to the screen', () => {
    const { container } = renderCards();
    const thumbnail = container.querySelector('img');

    expect(thumbnail).toHaveAttribute('srcset', 'first.jpg 320w');
    expect(thumbnail).toHaveAttribute('sizes', '(min-width: 768px) 320px, 100vw');
    expect(thumbnail).toHaveAttribute('loading', 'lazy');
    expect(thumbnail).toHaveAttribute('decoding', 'async');
  });

  it('should describe the link by the visible text', () => {
    renderCards();

    const link = screen.getByRole('link', { name: /First song/ });

    expect(link).toHaveAccessibleName(expect.stringContaining('First artist'));
    expect(link).toHaveAccessibleDescription('Watch on YouTube');
  });

  it('should save a like and remove it with an empty reaction list', () => {
    renderCards();
    const card = within(screen.getAllByRole('listitem')[0]);
    const likeButton = card.getByRole('button', { name: 'Mark suggestion as "Like"' });

    expect(likeButton).toHaveAttribute('title', 'Mark "Like"');
    expect(likeButton).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(likeButton);

    expect(likeButton).toHaveAttribute('title', 'Remove "Like"');
    expect(likeButton).toHaveAttribute('aria-pressed', 'true');
    expect(ReactionsService.getReactions()).toEqual({ id1: ReactionEnum.like });
  });

  it('should replace the like with ignore', () => {
    renderCards();
    const card = within(screen.getAllByRole('listitem')[0]);
    const ignoreButton = card.getByRole('button', { name: 'Mark suggestion as "Ignore"' });

    fireEvent.click(card.getByRole('button', { name: 'Mark suggestion as "Like"' }));
    expect(ignoreButton).toHaveAttribute('title', 'Mark "Ignore"');

    fireEvent.click(ignoreButton);

    expect(ignoreButton).toHaveAttribute('title', 'Remove "Ignore"');
    expect(ReactionsService.getReactions()).toEqual({ id1: ReactionEnum.unlike });
  });

  it('should load the reactions saved before', () => {
    ReactionsService.updateReactions({ id2: ReactionEnum.like });

    renderCards();

    const card = within(screen.getAllByRole('listitem')[1]);
    expect(card.getByRole('button', { name: 'Mark suggestion as "Like"' })).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('useMusicApplyFilters', () => {
  const songs = [firstCard, secondCard].map(({ id, title, artist }) => ({ id, title, artist }));

  const FilteredList = (props: Parameters<typeof useMusicApplyFilters>[0]) => {
    const { filtered, applyFilters } = useMusicApplyFilters(props);

    return (
      <div>
        <button type="button" onClick={applyFilters}>
          apply
        </button>
        <span>{filtered.map((item) => item.url).join(',')}</span>
      </div>
    );
  };

  const applyAfterLoading = async (props: Parameters<typeof useMusicApplyFilters>[0]) => {
    vi.spyOn(ApiReload, 'search').mockResolvedValue(songs);
    render(
      <MockProviders>
        <FilteredList {...props} />
      </MockProviders>,
    );

    await waitFor(() => {
      expect(ApiReload.search).toHaveBeenCalled();
    });
    await Promise.resolve();
    fireEvent.click(screen.getByRole('button', { name: 'apply' }));
  };

  beforeEach(() => {
    ReactionsService.updateReactions({ id1: ReactionEnum.like, id2: ReactionEnum.unlike });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should do nothing until the songs arrive', () => {
    vi.spyOn(ApiReload, 'search').mockReturnValue(new Promise(() => {}));
    render(
      <MockProviders>
        <FilteredList />
      </MockProviders>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'apply' }));

    expect(screen.queryByText(/youtube/)).toBeNull();
  });

  it('should return everything by default', async () => {
    await applyAfterLoading({});

    expect(await screen.findByText(/watch\?v=id1,.*watch\?v=id2/)).toBeInTheDocument();
  });

  it('should respect the limit and shuffle on request', async () => {
    await applyAfterLoading({ random: true, limit: 1 });

    expect(await screen.findByText(/^https:\S+id[12]$/)).toBeInTheDocument();
  });

  it('should keep only the likes', async () => {
    await applyAfterLoading({ likeFilter: 'onlyLike' });

    expect(await screen.findByText(/^\S+v=id1$/)).toBeInTheDocument();
  });

  it('should keep only the unlikes', async () => {
    await applyAfterLoading({ likeFilter: 'onlyUnlike' });

    expect(await screen.findByText(/^\S+v=id2$/)).toBeInTheDocument();
  });
});

describe('useFetchAllMusics', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should expose the error when loading fails', async () => {
    vi.spyOn(ApiReload, 'search').mockRejectedValue(new Error('failure'));
    let hookError = '';

    const Probe = () => {
      hookError = useFetchAllMusics().error;

      return <div />;
    };

    render(<Probe />);

    await waitFor(() => {
      expect(hookError).toBe('Error on Load Data');
    });
  });

  it('should tolerate an empty song', () => {
    expect(new MusicFromApiMapper()).toEqual({ artist: '', id: '', title: '' });
  });
});

describe('<MainContainer />', () => {
  const renderApp = async () => {
    render(
      <MockProviders>
        <MainContainer />
      </MockProviders>,
    );

    await screen.findAllByRole('button', { name: 'Mark suggestion as "Like"' });
  };

  it('should open the home with a limited playlist', async () => {
    await renderApp();

    expect(screen.getAllByRole('button', { name: 'Mark suggestion as "Like"' })).toHaveLength(25);
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toBeInTheDocument();
  });

  it('should show only what was liked on the likes screen', async () => {
    await renderApp();
    fireEvent.click(screen.getAllByRole('button', { name: 'Mark suggestion as "Like"' })[0]);

    fireEvent.click(screen.getByRole('button', { name: 'Likes' }));

    await waitFor(() => {
      expect(screen.getAllByRole('button', { name: 'Mark suggestion as "Like"' })).toHaveLength(1);
    });
    expect(store.getState().features.currentScreenFeature.currentScreen).toBe(ScreenEnum.likes);
  });

  it('should show only what was ignored on the unlikes screen', async () => {
    await renderApp();
    fireEvent.click(screen.getAllByRole('button', { name: 'Mark suggestion as "Ignore"' })[0]);

    fireEvent.click(screen.getByRole('button', { name: 'UnLikes' }));

    await waitFor(() => {
      expect(screen.getAllByRole('button', { name: 'Mark suggestion as "Ignore"' })).toHaveLength(1);
    });
  });
});
