import { useEffect } from 'react';
import { GeneratePlaylist } from '@/modules/musicCards/generatePlaylists';
import { FloatingActionButtons } from '@/features/FloatingActionButtons';
import { useMusicApplyFilters } from '@/modules/musicCards/hooks/useMusicApplyFilters';
import { Cards } from '@/modules/musicCards/cards';

const LIMIT_ITEMS = 25;

export const HomePage = () => {
  const { filtered, applyFilters, musics } = useMusicApplyFilters({
    random: true,
    limit: LIMIT_ITEMS,
  });

  useEffect(() => {
    applyFilters();
  }, [musics?.length]);

  return (
    <div>
      <Cards cards={filtered} />

      <section className="w-full flex justify-center items-center mt-16">
        <GeneratePlaylist generateRandomPlaylist={applyFilters} />
      </section>

      <FloatingActionButtons generateRandomPlaylist={applyFilters} />
    </div>
  );
};
