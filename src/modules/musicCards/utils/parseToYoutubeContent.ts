import { IMusicWithTransformation, MusicFromApiMapper } from '@/modules/musicCards/mappers/get/fromApi';

export const parseToYoutubeContent = (playList: MusicFromApiMapper[]): IMusicWithTransformation[] => {
  return playList.map((play: MusicFromApiMapper) => ({
    ...play,
    img: `https://img.youtube.com/vi/${play.id}/mqdefault.jpg`,
    imgSet: `https://img.youtube.com/vi/${play.id}/mqdefault.jpg 320w, https://img.youtube.com/vi/${play.id}/hqdefault.jpg 480w`,
    url: `https://www.youtube.com/watch?v=${play.id}`,
  }));
};
