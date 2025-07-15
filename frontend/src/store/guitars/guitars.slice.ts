import {createSlice} from '@reduxjs/toolkit';

import {Guitar, NameSpace, PaginatedResponse} from '../../libs/shared/types';
import {getGuitarsAction} from '../api-actions/guitar.api-actions';

type InitialState = {
  guitars: PaginatedResponse<Guitar>;
  isLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  guitars: {
    entities: [],
    totalPages: 0,
    totalItems: 0,
    currentPage: 0,
    itemsPerPage: 7
  },
  isLoading: false,
  error: null
};

export const guitarsSlice = createSlice({
  name: NameSpace.Guitars,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getGuitarsAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGuitarsAction.fulfilled, (state, action) => {
        state.guitars = action.payload;
        state.isLoading = false;
      })
      .addCase(getGuitarsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
