import { ReactButton } from '@/modules/musicCards/cards/reactButton';
import { IMusicWithTransformation } from '@/modules/musicCards/mappers/get/fromApi';
import { ReactionEnum } from '@/modules/musicCards/services/ReactionsService';

interface IProps {
  playlistLocal: IMusicWithTransformation;
  sendReaction: (idContent: string, reaction: ReactionEnum) => void;
  reaction: ReactionEnum;
  index: number;
}

export const Card = ({ playlistLocal, sendReaction, reaction, index }: IProps) => {
  return (
    <li
      key={playlistLocal.url}
      className="flex flex-col group cursor-pointer bg-dark-charcoal border-dark-charcoal border rounded-xl md:hover:scale-105 transition-all duration-300 shadow-xl">
      <div>
        <a
          target="_blank"
          href={playlistLocal.url}
          rel="noreferrer"
          aria-labelledby={`videoIntroduction-${index} videoTitle-${index} videoFrom-${index} videoArtist-${index}`}
          aria-describedby={`videoPlatform-${index}`}>
          <div className="sr-only">
            <span id={`videoIntroduction-${index}`}>Ver</span>
            <span id={`videoTitle-${index}`}>{playlistLocal.title}</span>
            <span id={`videoFrom-${index}`}>De</span>
            <span id={`videoArtist-${index}`}>{playlistLocal.artist}</span>
            <span id={`videoPlatform-${index}`}>no YouTube</span>
          </div>
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
            text="Gostei"
            ariaLabel='Marcar sugestão como "Gostei"'
            title={reaction === ReactionEnum.like ? 'Remover "Gostei"' : 'Marcar "Gostei"'}
          />

          <ReactButton
            variant="blue"
            sendReaction={() => sendReaction(playlistLocal.id, ReactionEnum.unlike)}
            isSelected={reaction === ReactionEnum.unlike}
            text="ignorar"
            ariaLabel='Marcar sugestão como "Não gostei"'
            title={reaction === ReactionEnum.unlike ? 'Remover "Não gostei"' : 'Marcar "Não gostei'}
          />
        </footer>
      </div>
    </li>
  );
};
