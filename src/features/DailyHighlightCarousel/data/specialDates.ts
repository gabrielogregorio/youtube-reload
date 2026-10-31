/* eslint-disable no-magic-numbers */

import { MonthsNormalizedEnum } from '@/utils/date';

export interface ISpecialDate {
  title: string;
  description: string;
  emoji1: string;
  days: number[];
  emoji2: string;
}

export const specialDates: { [month in MonthsNormalizedEnum]: ISpecialDate[] } = {
  [MonthsNormalizedEnum.January]: [
    {
      title: 'New Year',
      description: 'Happy New Year!',
      days: [1, 2],
      emoji1: '🎉🎊',
      emoji2: '✨🎆',
    },
  ],

  [MonthsNormalizedEnum.February]: [],
  [MonthsNormalizedEnum.March]: [
    {
      title: 'Easter',
      description: '',
      days: [31],
      emoji1: '🐇',
      emoji2: '🐇 ',
    },
  ],
  [MonthsNormalizedEnum.April]: [],
  [MonthsNormalizedEnum.May]: [],
  [MonthsNormalizedEnum.June]: [],
  [MonthsNormalizedEnum.July]: [],
  [MonthsNormalizedEnum.August]: [],
  [MonthsNormalizedEnum.September]: [],

  [MonthsNormalizedEnum.October]: [
    {
      title: 'Halloween',
      description: '',
      days: [31],
      emoji1: '🎃🎃',
      emoji2: '🎃🎃',
    },
  ],

  [MonthsNormalizedEnum.November]: [],

  [MonthsNormalizedEnum.December]: [
    {
      title: 'Astronomy Day',
      description: '',
      days: [2],
      emoji1: '🔭',
      emoji2: '🪐',
    },
    {
      title: 'Christmas Eve',
      description: '',
      days: [24],
      emoji1: '🎅',
      emoji2: '',
    },
    {
      title: 'Christmas',
      description: 'Merry Christmas!!',
      days: [25],
      emoji1: '🎅',
      emoji2: '🎄',
    },

    {
      title: "New Year's Eve",
      description: 'A new year is coming!',
      days: [31],
      emoji1: '🎈',
      emoji2: '🎊',
    },
  ],
};
