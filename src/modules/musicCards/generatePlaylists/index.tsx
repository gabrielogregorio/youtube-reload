import { useTranslation } from '@/hooks/useTranslation';
import { HEIGHT_IN_PX_TO_IGNORE_HEADER, moveToTop } from '@/utils/scroll';

interface IGeneratePlaylistProps {
  generateRandomPlaylist: () => void;
}

export const GeneratePlaylist = ({ generateRandomPlaylist }: IGeneratePlaylistProps) => {
  const { t } = useTranslation();

  return (
    <button
      className="display-block m-auto text-white-ultra-light bg-blue-deep px-8 py-4 rounded-xl cursor-pointer duration-[0.2s] text-[1.2rem] hover:bg-blue-navy select-none"
      type="button"
      onClick={() => {
        generateRandomPlaylist();
        moveToTop(HEIGHT_IN_PX_TO_IGNORE_HEADER);
      }}>
      {t('Generate Playlist')}
    </button>
  );
};
