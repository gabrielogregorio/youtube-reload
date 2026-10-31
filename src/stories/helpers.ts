import { dataMusic } from '@/modules/musicCards/data/data.reload';
import { parseToYoutubeContent } from '@/modules/musicCards/utils/parseToYoutubeContent';

const NUMBER_OF_SONGS = 8;

export const realSongs = parseToYoutubeContent(dataMusic.slice(0, NUMBER_OF_SONGS));

export const freezeDate = (isoDate: string) => () => {
  const RealDate = globalThis.Date;
  const frozenTime = new RealDate(isoDate).getTime();

  class FrozenDate extends RealDate {
    public constructor(...args: unknown[]) {
      super(...((args.length > 0 ? args : [frozenTime]) as [number]));
    }

    public static override now() {
      return frozenTime;
    }
  }

  globalThis.Date = FrozenDate as DateConstructor;

  return () => {
    globalThis.Date = RealDate;
  };
};
