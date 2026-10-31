import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { envs } from '@/core/env';
import { LanguageEnum } from '@/core/i18n';
import { store } from '@/core/states/redux/store';
import { setLanguage } from '@/core/states/redux/features/language/slices';
import { ScreenEnum } from '@/contracts/homeScreens';
import { DailyHighlightCarousel } from '@/features/DailyHighlightCarousel/DailyHighlightCarousel';
import { FloatingActionButtons } from '@/features/FloatingActionButtons';
import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { Notify } from '@/features/Notify';
import { NotifyFromApiMapper } from '@/features/Notify/mappers/fromApi';
import { NotifyMapper } from '@/features/Notify/mappers';
import { useFetchAllNotify } from '@/features/Notify/hooks/useFetchAllNotify';
import { Profile } from '@/features/Profile';
import { Header } from '@/layouts/header';
import { EnvironmentName } from '@/layouts/header/EnvironmentName';
import { ApiReload } from '@/modules/musicCards/services/api/Reload';
import { StorageAccessNameEnum, StorageService } from '@/services/StorageService';
import { MockProviders } from '@/utils/mockProviders';

const renderWithProviders = (children: React.ReactNode) => render(<MockProviders>{children}</MockProviders>);

const renderAtDate = (date: Date) => {
  vi.useFakeTimers({ now: date, toFake: ['Date'] });

  return renderWithProviders(<DailyHighlightCarousel />);
};

describe('<DailyHighlightCarousel />', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should show the special date with its description', () => {
    renderAtDate(new Date(2024, 11, 25, 12));

    expect(screen.getByRole('heading', { name: 'Christmas' })).toBeInTheDocument();
    expect(screen.getByText('Merry Christmas!!')).toBeInTheDocument();
  });

  it('should show a special date without description', () => {
    const { container } = renderAtDate(new Date(2024, 9, 31, 12));

    expect(screen.getByRole('heading', { name: 'Halloween' })).toBeInTheDocument();
    expect(container.querySelector('h2 + div')).toBeNull();
  });

  it('should go around the highlights in both directions', () => {
    renderAtDate(new Date(2024, 11, 25, 12));

    fireEvent.click(screen.getByRole('button', { name: 'See previous event' }));
    expect(screen.getByRole('heading', { name: 'Welcome' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'See next event' }));
    expect(screen.getByRole('heading', { name: 'Christmas' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'See next event' }));
    fireEvent.click(screen.getByRole('button', { name: 'See next event' }));
    expect(screen.getByRole('heading', { name: 'Welcome' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'See previous event' }));
    expect(screen.queryByRole('heading', { name: 'Welcome' })).toBeNull();
  });

  it('should follow the language', () => {
    store.dispatch(setLanguage(LanguageEnum.Portuguese));

    renderAtDate(new Date(2024, 11, 25, 12));

    expect(screen.getByRole('heading', { name: 'Natal' })).toBeInTheDocument();
  });
});

describe('<FloatingActionButtons />', () => {
  it('should open the likes and generate a new playlist', () => {
    const generateRandomPlaylist = vi.fn();
    renderWithProviders(<FloatingActionButtons generateRandomPlaylist={generateRandomPlaylist} />);

    fireEvent.click(screen.getByTitle('Go to favorites'));
    expect(store.getState().features.currentScreenFeature.currentScreen).toBe(ScreenEnum.likes);

    fireEvent.click(screen.getByTitle('Generate new playlist'));
    expect(store.getState().features.currentScreenFeature.currentScreen).toBe(ScreenEnum.home);
    expect(generateRandomPlaylist).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTitle('Go to top'));
    expect(screen.getByRole('complementary', { name: 'Shortcuts menu' })).toBeInTheDocument();
  });
});

describe('<LanguageSwitcher />', () => {
  it('should change and remember the language', () => {
    renderWithProviders(<LanguageSwitcher />);
    const select = screen.getByRole('combobox', { name: 'Language' });

    fireEvent.change(select, { target: { value: LanguageEnum.Portuguese } });

    expect(screen.getByRole('combobox', { name: 'Idioma' })).toHaveValue(LanguageEnum.Portuguese);
    expect(StorageService.getItem(StorageAccessNameEnum.Language)).toBe(LanguageEnum.Portuguese);
  });
});

describe('<Profile />', () => {
  it('should keep the emoji and change it on click', () => {
    renderWithProviders(<Profile className="custom" />);
    const button = screen.getByRole('button', { name: 'Change profile picture' });
    const firstEmoji = StorageService.getItem(StorageAccessNameEnum.Profile);

    expect(button).toHaveTextContent(firstEmoji as string);

    fireEvent.click(button);

    expect(button).toHaveTextContent(StorageService.getItem(StorageAccessNameEnum.Profile) as string);
  });

  it('should reuse the saved emoji', () => {
    StorageService.setItem(StorageAccessNameEnum.Profile, '🤖');

    renderWithProviders(<Profile />);

    expect(screen.getByRole('button', { name: 'Change profile picture' })).toHaveTextContent('🤖');
  });
});

describe('<EnvironmentName />', () => {
  afterEach(() => {
    envs.VITE_ENVIRONMENT = '';
  });

  it('should stay hidden in production', () => {
    envs.VITE_ENVIRONMENT = 'production';

    const { container } = render(<EnvironmentName />);

    expect(container).toHaveTextContent('');
  });

  it('should show the environment in previews', () => {
    envs.VITE_ENVIRONMENT = 'dev';
    envs.VERSION = '1.0.0';

    render(<EnvironmentName />);

    expect(screen.getByText(/dev v1.0.0/)).toBeInTheDocument();
  });
});

describe('<Header />', () => {
  it('should render the logo and the highlights', () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole('heading', { name: 'Youtube Reload' })).toBeInTheDocument();
  });
});

describe('<Notify />', () => {
  const allNotifications = NotifyMapper.fromApi([{ id: 1, title: 'New songs', date: 'Fri, 03 May 2024 13:05:00 GMT', emoji: '🎶' }]);

  const openBell = async () => {
    vi.spyOn(ApiReload, 'searchNotify').mockResolvedValue(allNotifications);
    const view = renderWithProviders(<Notify />);

    await screen.findByRole('button', { name: 'Open notifications, 1 new' });

    return view;
  };

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should list the notifications and close on an outside click', async () => {
    await openBell();

    fireEvent.click(screen.getByRole('button', { name: 'Open notifications, 1 new' }));

    expect(screen.getByRole('dialog', { name: 'Notifications' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'New songs' })).toBeInTheDocument();
    expect(screen.getByText('Friday, May 3, 2024')).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'Unread notification' })).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('should cover the page while open and close on a click over it', async () => {
    await openBell();

    expect(document.getElementById('notify-backdrop')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Open notifications, 1 new' }));

    const backdrop = document.getElementById('notify-backdrop');

    expect(backdrop).toHaveAttribute('aria-hidden', 'true');

    fireEvent.mouseDown(backdrop as HTMLElement);

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.getElementById('notify-backdrop')).toBeNull();
  });

  it('should mark everything as viewed after a few seconds', async () => {
    await openBell();
    vi.useFakeTimers();

    fireEvent.click(screen.getByRole('button', { name: 'Open notifications, 1 new' }));
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByRole('button', { name: 'Open notifications' })).toBeInTheDocument();
    expect(screen.queryByRole('status')).toBeNull();
    expect(StorageService.getItemAndParse(StorageAccessNameEnum.Notify)).toEqual([1]);
  });

  it('should cancel the pending mark when leaving the page', async () => {
    const { unmount } = await openBell();
    vi.useFakeTimers();

    fireEvent.click(screen.getByRole('button', { name: 'Open notifications, 1 new' }));
    unmount();
    vi.advanceTimersByTime(3000);

    expect(StorageService.getItemAndParse(StorageAccessNameEnum.Notify)).toEqual([]);
  });

  it('should not fail when leaving without opening it', async () => {
    const { unmount } = await openBell();

    unmount();

    expect(StorageService.getItemAndParse(StorageAccessNameEnum.Notify)).toEqual([]);
  });

  it('should keep the viewed ids already saved', async () => {
    StorageService.setItem(StorageAccessNameEnum.Notify, '[1]');
    vi.spyOn(ApiReload, 'searchNotify').mockResolvedValue(allNotifications);

    renderWithProviders(<Notify />);

    expect(await screen.findByRole('button', { name: 'Open notifications' })).toBeInTheDocument();
  });

  it('should expose the error when loading fails', async () => {
    vi.spyOn(ApiReload, 'searchNotify').mockRejectedValue(new Error('failure'));
    let hookError: string | undefined;

    const Probe = () => {
      hookError = useFetchAllNotify().error;

      return <div />;
    };

    render(<Probe />);

    await waitFor(() => {
      expect(hookError).toBe('Error on Load Data');
    });
  });

  it('should tolerate an empty notification', () => {
    expect(new NotifyFromApiMapper()).toEqual({ id: 0, title: '', date: '', emoji: '' });
  });
});
