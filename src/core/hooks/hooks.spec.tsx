import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { ReactNode, useRef } from 'react';
import { vi } from 'vitest';
import { LanguageEnum } from '@/core/i18n';
import { useAuthConfigure } from '@/hooks/useAuthConfigure';
import { useDocumentLanguage } from '@/hooks/useDocumentLanguage';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useStatus } from '@/hooks/useStatus';
import { useTranslation } from '@/hooks/useTranslation';
import { LogService } from '@/services/log/LogService';
import { StorageAccessNameEnum, StorageService } from '@/services/StorageService';
import { MockProviders } from '@/utils/mockProviders';

const wrapper = ({ children }: { children: ReactNode }) => <MockProviders>{children}</MockProviders>;

const OutsideClick = ({ hasCallback, onOutside }: { hasCallback: boolean; onOutside: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { clickedOutside } = useOutsideClick(ref, hasCallback ? onOutside : undefined);

  return (
    <div>
      <div ref={ref}>inside</div>
      <div>outside</div>
      <span>{clickedOutside ? 'was outside' : 'was inside'}</span>
    </div>
  );
};

describe('useOutsideClick', () => {
  it('should call the callback only for clicks outside the element', () => {
    const onOutside = vi.fn();
    render(<OutsideClick hasCallback onOutside={onOutside} />);

    fireEvent.mouseDown(screen.getByText('inside'));
    expect(onOutside).not.toHaveBeenCalled();
    expect(screen.getByText('was inside')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByText('outside'));
    expect(onOutside).toHaveBeenCalledTimes(1);
    expect(screen.getByText('was outside')).toBeInTheDocument();
  });

  it('should work without a callback', () => {
    render(<OutsideClick hasCallback={false} onOutside={vi.fn()} />);

    fireEvent.mouseDown(screen.getByText('outside'));

    expect(screen.getByText('was outside')).toBeInTheDocument();
  });

  it('should ignore clicks while the element is not on the screen', () => {
    const onOutside = vi.fn();
    renderHook(() => useOutsideClick({ current: null }, onOutside));

    fireEvent.mouseDown(document.body);

    expect(onOutside).not.toHaveBeenCalled();
  });
});

describe('useStatus', () => {
  it('should reset every field', () => {
    const { result } = renderHook(() => useStatus<string>());

    act(() => {
      result.current.setData('data');
      result.current.setError('error');
      result.current.setIsLoading(true);
    });
    expect(result.current).toMatchObject({ data: 'data', error: 'error', isLoading: true });

    act(() => {
      result.current.reset();
    });
    expect(result.current).toMatchObject({ data: null, error: '', isLoading: false });
  });
});

describe('useAuthConfigure', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create the user on the first access', () => {
    const setUser = vi.spyOn(LogService, 'setUser');

    renderHook(() => useAuthConfigure());

    const userId = StorageService.getItem(StorageAccessNameEnum.UserId);
    expect(userId).toBeDefined();
    expect(setUser).toHaveBeenCalledWith({ userId });
  });

  it('should reuse the existing user', () => {
    StorageService.setItem(StorageAccessNameEnum.UserId, 'existing');
    const setUser = vi.spyOn(LogService, 'setUser');

    renderHook(() => useAuthConfigure());

    expect(setUser).toHaveBeenCalledWith({ userId: 'existing' });
  });
});

describe('useTranslation', () => {
  it('should translate and remember the new language', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });

    expect(result.current.t('Home')).toBe('Home');

    act(() => {
      result.current.changeLanguage(LanguageEnum.Portuguese);
    });

    expect(result.current.language).toBe(LanguageEnum.Portuguese);
    expect(result.current.t('Home')).toBe('Início');
    expect(StorageService.getItem(StorageAccessNameEnum.Language)).toBe(LanguageEnum.Portuguese);
  });
});

describe('useDocumentLanguage', () => {
  const useBoth = () => {
    useDocumentLanguage();

    return useTranslation();
  };

  afterEach(() => {
    document.getElementById('skip-link')?.remove();
  });

  it('should update the html language and the static skip link', () => {
    const skipLink = document.createElement('a');
    skipLink.id = 'skip-link';
    document.body.append(skipLink);

    const { result } = renderHook(() => useBoth(), { wrapper });

    expect(document.documentElement.lang).toBe(LanguageEnum.English);
    expect(skipLink).toHaveTextContent('Skip to main content');

    act(() => {
      result.current.changeLanguage(LanguageEnum.Portuguese);
    });

    expect(document.documentElement.lang).toBe(LanguageEnum.Portuguese);
    expect(skipLink).toHaveTextContent('Pular para o conteúdo principal');
  });

  it('should work on a page without the skip link', () => {
    renderHook(() => useBoth(), { wrapper });

    expect(document.documentElement.lang).toBe(LanguageEnum.English);
  });
});
