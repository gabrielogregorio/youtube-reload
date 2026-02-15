import { useReactions } from '@/modules/musicCards/hooks/useReactions';
import { ReactionEnum } from '@/modules/musicCards/services/ReactionsService';
import { IMusicWithTransformation } from '@/modules/musicCards/mappers/get/fromApi';
import { Card } from '@/modules/musicCards/cards/card';

interface ICardsProps {
  cards: IMusicWithTransformation[];
}

export const Cards = ({ cards }: ICardsProps) => {
  const { reactions, sendReaction } = useReactions();

  return (
    <div className="animate-fadeIn min-h-screen mt-20">
      <section className="mx-auto md:max-w-[700px] lg:max-w-[1000px] w-full" aria-label="Sugestões">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cards.map((card: IMusicWithTransformation, index) => {
            return (
              <Card
                index={index}
                reaction={reactions?.[card.id] || ReactionEnum.none}
                key={card.url}
                playlistLocal={card}
                sendReaction={sendReaction}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
};
