import {createSlice} from '@reduxjs/toolkit';

import {Guitar} from '@1770169-guitar/types';

import {NameSpace} from '../../libs/shared/types';
import {createGuitarAction, getGuitarAction, removeGuitarAction, updateGuitarAction} from '../api-actions/guitar.api-actions';

type InitialState = {
  guitar: Guitar | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  guitar: null,
  isLoading: false,
  error: null
};

export const guitarSlice = createSlice({
  name: NameSpace.Guitar,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getGuitarAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGuitarAction.fulfilled, (state, action) => {
        state.guitar = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getGuitarAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createGuitarAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGuitarAction.fulfilled, (state, action) => {
        state.guitar = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createGuitarAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateGuitarAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGuitarAction.fulfilled, (state, action) => {
        state.guitar = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateGuitarAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(removeGuitarAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeGuitarAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(removeGuitarAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
