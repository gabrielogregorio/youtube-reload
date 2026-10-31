import { useGetDailyHighlights } from '@/features/DailyHighlightCarousel/hooks/useGetDailyHighlights';
import { useTranslation } from '@/hooks/useTranslation';
import { MdOutlineNavigateNext } from 'react-icons/md';

export const DailyHighlightCarousel = () => {
  const { dailyHighlight, nextDailyHighlight, prevDailyHighlight } = useGetDailyHighlights();
  const { t } = useTranslation();

  if (!dailyHighlight) {
    return <div />;
  }

  return (
    <section className="flex items-center justify-center" aria-label={t('Daily quote')}>
      <div className="max-w-md w-full">
        <div
          className="text-sm flex border border-dark-charcoal shadow-md rounded-md w-full hover:scale-105 transition-all duration-150 min-h-[6rem] animate-fadeIn"
          title={t('Commemorative date')}>
          <button
            type="button"
            aria-label={t('See previous event')}
            onClick={() => prevDailyHighlight()}
            className="flex items-center justify-center cursor-pointer hover:bg-dark-charcoal px-2 transition-all duration-150 ">
            <MdOutlineNavigateNext className=" text-2xl rotate-180" />
          </button>

          <div className="flex-1 flex-col md:flex-row flex items-center w-full mx-2 px-3 py-3 cursor-pointer min-h-[130px]">
            <div className="text-2xl select-none">{dailyHighlight.emoji1}</div>

            <div className="flex-1 flex flex-col justify-center ml-3">
              <h2 className="select-none text-base font-bold text-white bg-inherit">{t(dailyHighlight.title)}</h2>
              {dailyHighlight.description ? (
                <div className="select-none text-base text-white bg-inherit">{t(dailyHighlight.description)}</div>
              ) : undefined}
            </div>
          </div>

          <button
            type="button"
            aria-label={t('See next event')}
            onClick={() => nextDailyHighlight()}
            className="flex items-center justify-center cursor-pointer hover:bg-dark-charcoal px-2 transition-all duration-150 ">
            <MdOutlineNavigateNext className=" text-2xl" />
          </button>
        </div>
      </div>
    </section>
  );
};
