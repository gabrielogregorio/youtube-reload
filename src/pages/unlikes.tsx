import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { LateralButtons } from '@/widgets/lateralButtons';
import { useMusicApplyFilters } from '@/hooks/useMusicApplyFilters';
import { Cards } from '@/widgets/cards';

export const UnlikesPage = (): ReactElement => {
  const { filtered, applyFilters, data } = useMusicApplyFilters({
    random: true,
    onlyUnlikes: true,
  });

  useEffect(() => {
    applyFilters();
  }, [data?.length]);

  return (
    <div>
      <Cards cards={filtered} />

      <LateralButtons generateRandomPlaylist={applyFilters} />
    </div>
  );
};
