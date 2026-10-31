/* eslint-disable no-magic-numbers */

import { fillIfNecessary } from '@/utils/normalizers';

export enum MonthsNormalizedEnum {
  January = 1,
  February = 2,
  March = 3,
  April = 4,
  May = 5,
  June = 6,
  July = 7,
  August = 8,
  September = 9,
  October = 10,
  November = 11,
  December = 12,
}
const BRAZILIAN_TIMEZONE = '-03:00';

export class DateReload {
  public static getMonthFrom1To12(): MonthsNormalizedEnum {
    return new Date().getMonth() + 1;
  }

  public static getDay() {
    return new Date().getDate();
  }

  public static createDateAsSaoPauloTimeZoneAndReturnGmt({
    year,
    month1to12,
    day,
    hours1to24,
    minutes,
    seconds,
  }: {
    year: number;
    month1to12: number;
    day: number;
    hours1to24: number;
    minutes: number;
    seconds: number;
  }) {
    const date: Date = new Date(
      `${year}-${fillIfNecessary(month1to12)}-${fillIfNecessary(day)}T${fillIfNecessary(hours1to24)}:${fillIfNecessary(
        minutes,
      )}:${fillIfNecessary(seconds)}.000${BRAZILIAN_TIMEZONE}`,
    );

    return date.toUTCString();
  }

  public static formatGmtInSaoPauloTimezone(dateGmt: string, language: string) {
    return new Date(dateGmt).toLocaleString(language, {
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'full',
    });
  }
}
