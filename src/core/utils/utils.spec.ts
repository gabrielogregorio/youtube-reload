import { vi } from 'vitest';
import { DateReload } from '@/utils/date';
import { fillIfNecessary } from '@/utils/normalizers';
import { HEIGHT_IN_PX_TO_IGNORE_HEADER, moveToTop } from '@/utils/scroll';
import { shuffleArray } from '@/utils/shuffleArray';

describe('fillIfNecessary', () => {
  it('should add a zero only below ten', () => {
    expect(fillIfNecessary(9)).toBe('09');
    expect(fillIfNecessary(10)).toBe('10');
  });
});

describe('shuffleArray', () => {
  it('should keep the items and not touch the original array', () => {
    const original = [1, 2, 3, 4, 5];

    const shuffled = shuffleArray(original);

    expect([...shuffled].sort((first, second) => first - second)).toEqual(original);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('moveToTop', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should scroll to the top by default', () => {
    moveToTop();
    vi.runAllTimers();

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('should keep the given distance from the top', () => {
    moveToTop(HEIGHT_IN_PX_TO_IGNORE_HEADER);
    vi.runAllTimers();

    expect(window.scrollTo).toHaveBeenCalledWith({ top: HEIGHT_IN_PX_TO_IGNORE_HEADER, behavior: 'smooth' });
  });
});

describe('DateReload', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should read the month and the day of today', () => {
    vi.useFakeTimers({ now: new Date(2024, 11, 25, 12) });

    expect(DateReload.getMonthFrom1To12()).toBe(12);
    expect(DateReload.getDay()).toBe(25);
  });

  it('should create the date in the Sao Paulo time zone', () => {
    const date = DateReload.createDateAsSaoPauloTimeZoneAndReturnGmt({
      year: 2024,
      month1to12: 5,
      day: 3,
      hours1to24: 10,
      minutes: 5,
      seconds: 0,
    });

    expect(date).toBe('Fri, 03 May 2024 13:05:00 GMT');
  });

  it('should format the date in the given language', () => {
    const date = 'Fri, 03 May 2024 13:05:00 GMT';

    expect(DateReload.formatGmtInSaoPauloTimezone(date, 'en')).toBe('Friday, May 3, 2024');
    expect(DateReload.formatGmtInSaoPauloTimezone(date, 'pt-BR')).toBe('sexta-feira, 3 de maio de 2024');
  });
});
