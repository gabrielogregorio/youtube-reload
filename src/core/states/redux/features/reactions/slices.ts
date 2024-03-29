import { createSlice } from '@reduxjs/toolkit';
import { IReactionsOptions } from '@/modules/musicCards/services/ReactionsService';

export interface IReactionsFeature {
  reactions: IReactionsOptions | undefined;
}

const initialState: IReactionsFeature = {
  reactions: undefined,
};

const reactionsSlice = createSlice({
  name: 'reactions',
  initialState,
  reducers: {
    saveReaction: (state: IReactionsFeature, { payload }: { payload: IReactionsOptions }) => {
      return {
        ...state,
        reactions: payload,
      };
    },
  },
});

export const { saveReaction } = reactionsSlice.actions;

export default reactionsSlice;
