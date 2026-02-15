import { useEffect } from 'react';
import { FloatingActionButtons } from '@/features/FloatingActionButtons';
import { Cards } from '@/modules/musicCards/cards';
import { useMusicApplyFilters } from '@/modules/musicCards/hooks/useMusicApplyFilters';
import { Header } from '@/layouts/header';

export const UnLikesPage = () => {
  const { filtered, applyFilters, musics } = useMusicApplyFilters({
    random: true,
    likeFilter: 'onlyUnlike',
  });

  useEffect(() => {
    applyFilters();
  }, [musics?.length]);

  return (
    <div>
      <main id="main">
        <Header />

        <Cards cards={filtered} />
      </main>

      <FloatingActionButtons generateRandomPlaylist={applyFilters} />
    </div>
  );
};
