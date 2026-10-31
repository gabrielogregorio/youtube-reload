import { ReactButton } from '@/modules/musicCards/cards/reactButton';
import { IMusicWithTransformation } from '@/modules/musicCards/mappers/get/fromApi';
import { ReactionEnum } from '@/modules/musicCards/services/ReactionsService';
import { useTranslation } from '@/hooks/useTranslation';

interface IProps {
  playlistLocal: IMusicWithTransformation;
  sendReaction: (idContent: string, reaction: ReactionEnum) => void;
  reaction: ReactionEnum;
  index: number;
}

export const Card = ({ playlistLocal, sendReaction, reaction, index }: IProps) => {
  const { t } = useTranslation();

  return (
    <li
      key={playlistLocal.url}
      className="flex flex-col group cursor-pointer bg-dark-charcoal border-dark-charcoal border rounded-xl md:hover:scale-105 transition-all duration-300 shadow-xl">
      <div>
        <a target="_blank" href={playlistLocal.url} rel="noreferrer" aria-describedby={`videoPlatform-${index}`}>
          <span id={`videoPlatform-${index}`} className="sr-only">
            {t('Watch on YouTube')}
          </span>
          <header>
            <img
              src={playlistLocal.img}
              alt=""
              role="presentation"
              draggable={false}
              className="relative object-cover w-full hover:saturate-150 transition-all duration-150 select-none h-[300px] md:h-[180px] md:w-full rounded-xl overflow-hidden block"
            />{' '}
          </header>

          <article className="flex-1 flex flex-col py-[15px] px-[20px]">
            <div className="flex-1 flex flex-col">
              <div className="overflow-hidden text-ellipsis">
                <p className="text-[0.9rem] text-left font-bold border-b-2 border-dark-charcoal text-white-ultra-light pr-1.5 transition-all duration-150 flex items-center justify-between gap-2 w-full">
                  {playlistLocal.title}
                </p>
              </div>

              <div className="flex-1">
                <div>
                  <p className="text-[0.7rem] font-medium text-white-soft">{playlistLocal.artist}</p>
                </div>
              </div>
            </div>
          </article>
        </a>

        <footer className="flex justify-between mt-2 w-full px-[20px] pb-[15px]">
          <ReactButton
            variant="red"
            sendReaction={() => sendReaction(playlistLocal.id, ReactionEnum.like)}
            isSelected={reaction === ReactionEnum.like}
            text={t('Like')}
            ariaLabel={t('Mark suggestion as "Like"')}
            title={reaction === ReactionEnum.like ? t('Remove "Like"') : t('Mark "Like"')}
          />

          <ReactButton
            variant="blue"
            sendReaction={() => sendReaction(playlistLocal.id, ReactionEnum.unlike)}
            isSelected={reaction === ReactionEnum.unlike}
            text={t('Ignore')}
            ariaLabel={t('Mark suggestion as "Ignore"')}
            title={reaction === ReactionEnum.unlike ? t('Remove "Ignore"') : t('Mark "Ignore"')}
          />
        </footer>
      </div>
    </li>
  );
};
