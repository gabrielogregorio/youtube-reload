import { useEffect } from 'react';
import { GeneratePlaylist } from '@/modules/musicCards/generatePlaylists';
import { FloatingActionButtons } from '@/features/FloatingActionButtons';
import { useMusicApplyFilters } from '@/modules/musicCards/hooks/useMusicApplyFilters';
import { Cards } from '@/modules/musicCards/cards';
import { Header } from '@/layouts/header';
import { useTranslation } from '@/hooks/useTranslation';

const LIMIT_ITEMS = 25;

export const HomePage = () => {
  const { filtered, applyFilters, musics } = useMusicApplyFilters({
    random: true,
    limit: LIMIT_ITEMS,
  });
  const { t } = useTranslation();

  useEffect(() => {
    applyFilters();
  }, [musics?.length]);

  return (
    <div>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] bg-emergency focus:bg-emergency focus:text-white focus:px-4 focus:py-2 focus:rounded font-heading">
        {t('Skip to main content')}
      </a>

      <main id="main">
        <Header />

        <Cards cards={filtered} />

        <section className="w-full flex justify-center items-center mt-16" aria-label={t('Actions')}>
          <GeneratePlaylist generateRandomPlaylist={applyFilters} />
        </section>
      </main>

      <FloatingActionButtons generateRandomPlaylist={applyFilters} />
    </div>
  );
};
