import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/states/redux/store/useRedux';
import { saveReaction } from '@/core/states/redux/features/reactions/slices';
import { reactionsSelector } from '@/core/states/redux/features/reactions/selectors';
import { IReactionsOptions, ReactionsService, ReactionEnum } from '@/modules/musicCards/services/ReactionsService';
import { useOnMount } from '@/modules/musicCards/hooks/useOnMount';

export const useReactions = () => {
  const dispatch = useAppDispatch();
  const { reactions } = useAppSelector(reactionsSelector);

  const saveInitialState = (reactionsLocal: IReactionsOptions = ReactionsService.getReactions()) => {
    dispatch(saveReaction(reactionsLocal));

    ReactionsService.updateReactions(reactionsLocal);
  };

  useOnMount(() => {
    saveInitialState();
  });

  const sendReaction = useCallback(
    (idContent: string, reaction: ReactionEnum): void => {
      saveInitialState({
        ...reactions,
        [idContent]: reaction,
      });
    },
    [dispatch, reactions],
  );

  return {
    reactions: reactions as IReactionsOptions | undefined,
    sendReaction,
  };
};
