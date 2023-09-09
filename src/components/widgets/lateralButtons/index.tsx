import { ScreenEnum } from '@/contracts/homeScreens';
import { useCurrentScreen } from '@/hooks/useCurrentScreen';
import { LogService } from '@/services/log/LogService';
import { HEIGHT_IN_PX_TO_IGNORE_HEADER, moveToTop } from '@/utils/scroll';
import { LateralButton, LateralButtonEnum } from '@/widgets/lateralButtons/buttons';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import { BsBookmarkCheckFill } from 'react-icons/bs';

interface ILateralButtonsProps {
  generateRandomPlaylist: () => void;
}

export const LateralButtons = ({ generateRandomPlaylist }: ILateralButtonsProps) => {
  const { updateCurrentScreen } = useCurrentScreen();

  return (
    <section>
      <LateralButton
        action={() => {
          LogService.addBreadcrumb({ type: 'click', level: 'info', message: 'move to top' });
          moveToTop();
        }}
        title="Ir para cima"
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
        title="ir para favoritos"
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
        title="gerar nova playlist"
        bottomPosition="bottom-[2rem]"
        variant={LateralButtonEnum.Blue}
        icon={<BiRefresh className="text-2xl" />}
      />
    </section>
  );
};
