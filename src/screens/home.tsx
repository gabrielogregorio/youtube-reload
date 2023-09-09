import { useEffect } from 'react';
import { GeneratePlaylist } from '@/widgets/generatePlaylists';
import { LateralButtons } from '@/widgets/lateralButtons';
import { useMusicApplyFilters } from '@/hooks/useMusicApplyFilters';
import { Cards } from '@/widgets/cards';

const LIMIT_ITEMS = 25;

export const HomePage = () => {
  const { filtered, applyFilters, data } = useMusicApplyFilters({
    random: true,
    limit: LIMIT_ITEMS,
    ignoreLikes: false,
    ignoreUnLikes: false,
  });

  useEffect(() => {
    applyFilters();
  }, [data?.length]);

  return (
    <div>
      <Cards cards={filtered} />

      <section className="w-full flex justify-center items-center mt-16">
        <GeneratePlaylist generateRandomPlaylist={applyFilters} />
      </section>

      <LateralButtons generateRandomPlaylist={applyFilters} />
    </div>
  );
};