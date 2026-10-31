import { ScreenEnum } from '@/contracts/homeScreens';
import { useCurrentScreen } from '@/hooks/useCurrentScreen';
import { useTranslation } from '@/hooks/useTranslation';
import { LogService } from '@/services/log/LogService';
import { HEIGHT_IN_PX_TO_IGNORE_HEADER, moveToTop } from '@/utils/scroll';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import { LateralButton, LateralButtonEnum } from '@/features/FloatingActionButtons/buttons';

interface IFloatingActionButtonsProps {
  generateRandomPlaylist: () => void;
}

export const FloatingActionButtons = ({ generateRandomPlaylist }: IFloatingActionButtonsProps) => {
  const { updateCurrentScreen } = useCurrentScreen();
  const { t } = useTranslation();

  return (
    <aside aria-label={t('Shortcuts menu')}>
      <LateralButton
        action={() => {
          LogService.addBreadcrumb({ type: 'click', level: 'info', message: 'move to top' });
          moveToTop();
        }}
        title={t('Go to top')}
        bottomPosition="bottom-[10rem]"
        variant={LateralButtonEnum.Dark}
        icon={<AiOutlineArrowUp className="text-2xl" />}
      />

      <LateralButton
        action={() => {
          LogService.addBreadcrumb({ type: 'click', level: 'info', message: 'open likes' });
          moveToTop();
          updateCurrentScreen(ScreenEnum.likes);
        }}
        title={t('Go to favorites')}
        bottomPosition="bottom-[6rem]"
        variant={LateralButtonEnum.Red}
        icon={<BsBookmarkCheckFill className="text-2xl" />}
      />

      <LateralButton
        action={() => {
          LogService.addBreadcrumb({ type: 'click', level: 'info', message: 'generate new playlist' });
          updateCurrentScreen(ScreenEnum.home);
          generateRandomPlaylist();
          moveToTop(HEIGHT_IN_PX_TO_IGNORE_HEADER);
        }}
        title={t('Generate new playlist')}
        bottomPosition="bottom-[2rem]"
        variant={LateralButtonEnum.Blue}
        icon={<BiRefresh className="text-2xl" />}
      />
    </aside>
  );
};
