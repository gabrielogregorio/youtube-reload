import { useState } from 'react';
import { generateRandomPlaylist, applyOffsetAndLimit } from '@/modules/musicCards/hooks/utils';
import { useFetchAllMusics } from '@/modules/musicCards/hooks/useFetchAllMusics';
import { useReactions } from '@/modules/musicCards/hooks/useReactions';
import { MusicFromApiMapper } from '@/modules/musicCards/mappers/get/fromApi';
import { ReactionEnum } from '@/modules/musicCards/services/ReactionsService';
import { parseToYoutubeContent } from '@/modules/musicCards/utils/parseToYoutubeContent';

const LIMIT_FILTER = 500;

interface IUseMusicApplyFiltersInputType {
  random?: boolean;
  offset?: number;
  limit?: number;
  likeFilter?: 'none' | 'onlyLike' | 'onlyUnlike';
}

export const useMusicApplyFilters = ({
  random = false,
  offset = 0,
  limit = LIMIT_FILTER,
  likeFilter = 'none',
}: IUseMusicApplyFiltersInputType) => {
  const { musics } = useFetchAllMusics();
  const { reactions } = useReactions();
  const [filter, setFilter] = useState<MusicFromApiMapper[]>([]);

  const applyFilters = () => {
    if (!musics) {
      return;
    }

    let filtered = [...musics];

    if (random) {
      filtered = generateRandomPlaylist(filtered);
    }

    filtered = filtered.filter((item) => {
      let showItem = true;
      if (likeFilter === 'onlyLike') {
        showItem = reactions?.[item.id] === ReactionEnum.like;
      }

      if (likeFilter === 'onlyUnlike') {
        showItem = reactions?.[item.id] === ReactionEnum.unlike;
      }

      return showItem;
    });

    filtered = applyOffsetAndLimit(offset, limit, filtered);

    setFilter(filtered);
  };

  return {
    filtered: parseToYoutubeContent(filter),
    applyFilters,
    musics,
  };
};
