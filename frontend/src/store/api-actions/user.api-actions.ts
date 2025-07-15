import {isAxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {redirectToRoute} from '../action';
import {AppDispatch} from '../store';
import {setAccessToken, setRefreshToken} from '../../services';
import {ApiRoute, AuthUser, CreateUser, ErrorRequest, Token, User} from '../../libs/shared/types';

export const registerAction = createAsyncThunk<User & Token, CreateUser, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
  rejectValue: ErrorRequest | string;
}>('user/register', async (data, {dispatch, rejectWithValue, extra: api}) => {
  try {
    const {data: user} = await api.post<User & Token>(ApiRoute.Register, data);
    setAccessToken(user.accessToken);
    setRefreshToken(user.refreshToken);
    dispatch(redirectToRoute({route: 'products'}));

    return user;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequest);
    }
    return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
  }
});

export const authAction = createAsyncThunk<User & Token, AuthUser, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
  rejectValue: ErrorRequest | string;
}>('user/auth', async (data, {dispatch, rejectWithValue, extra: api}) => {
  try {
    const {data: user} = await api.post<User & Token>(ApiRoute.Login, data);
    setAccessToken(user.accessToken);
    setRefreshToken(user.refreshToken);
    dispatch(redirectToRoute({route: 'products'}));

    return user;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequest);
    }
    return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
  }
});

export const checkAuthAction = createAsyncThunk<User, void, {
  extra: AxiosInstance;
  rejectValue: ErrorRequest | string;
}>('user/checkAuth', async (_, {rejectWithValue, extra: api}) => {
  try {
    const {data} = await api.post<User>(ApiRoute.AuthCheck);

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as ErrorRequest);
    }
    return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
  }
});
