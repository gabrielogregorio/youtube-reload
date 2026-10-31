import { StorageAccessNameEnum, StorageService } from '@/services/StorageService';

export enum ReactionEnum {
  like = 'like',
  unlike = 'unlike',
  none = 'none',
}

export interface IReactionsOptions {
  [key: string]: ReactionEnum;
}

export const initializeAndGetReactions = (): IReactionsOptions => {
  const likes: IReactionsOptions | undefined = StorageService.getItemAndParse<IReactionsOptions>(StorageAccessNameEnum.Reactions);

  if (likes) {
    return likes;
  }
  const initializedReactions: IReactionsOptions = {};
  StorageService.setItem(StorageAccessNameEnum.Reactions, JSON.stringify(initializedReactions));
  return initializedReactions;
};

export class ReactionsService {
  public static getReactions(): IReactionsOptions {
    return initializeAndGetReactions();
  }

  public static updateReactions(reactions: IReactionsOptions) {
    StorageService.setItem(StorageAccessNameEnum.Reactions, JSON.stringify(reactions));
  }
}
