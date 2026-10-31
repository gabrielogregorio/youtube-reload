import { randomPhrase } from '@/features/DailyHighlightCarousel/data/randomPhrase';
import { ISpecialDate, specialDates } from '@/features/DailyHighlightCarousel/data/specialDates';
import { useOnMount } from '@/modules/musicCards/hooks/useOnMount';
import { DateReload } from '@/utils/date';
import { shuffleArray } from '@/utils/shuffleArray';
import { useState } from 'react';

const defaultSpecialDay: ISpecialDate = {
  title: 'Welcome',
  description: 'Here you can discover lost songs (or not)',
  days: [],
  emoji1: '🕵',
  emoji2: '',
};

export const useGetDailyHighlights = () => {
  const [dailyHighlights, setDailyHighlights] = useState<ISpecialDate[]>([]);
  const [dailyHighlightSelected, setDailyHighlightSelected] = useState(0);

  useOnMount(() => {
    const actualMonth = DateReload.getMonthFrom1To12();
    const actualDay = DateReload.getDay();

    const listSpecialDates = specialDates[actualMonth].filter((specialDay) => {
      return specialDay.days.includes(actualDay);
    });

    const phrases = shuffleArray(randomPhrase)[0];

    listSpecialDates.push({
      title: phrases.author,
      description: phrases.description,
      emoji1: '🍀',
      emoji2: '',
      days: [],
    });

    listSpecialDates.push(defaultSpecialDay);

    setDailyHighlights(listSpecialDates);
  });

  const nextDailyHighlight = () => {
    setDailyHighlightSelected((prev) => {
      if (prev + 1 >= dailyHighlights.length) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevDailyHighlight = () => {
    setDailyHighlightSelected((prev) => {
      if (prev - 1 < 0) {
        return dailyHighlights.length - 1;
      }
      return prev - 1;
    });
  };

  return {
    dailyHighlight: dailyHighlights[dailyHighlightSelected] as ISpecialDate | undefined,
    nextDailyHighlight,
    prevDailyHighlight,
    dailyHighlights,
  };
};
