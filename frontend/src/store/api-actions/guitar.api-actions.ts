import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {FormDataWithPayload, Guitar, PaginatedResponse, RequestOptionsType} from '../../libs/shared/types';

export const getGuitarsAction = createAsyncThunk<PaginatedResponse<Guitar>, RequestOptionsType, {
  extra: AxiosInstance;
}>('guitar/getGuitars', async (options, {extra: api}) => {
  const {data: guitars} = await api.get<PaginatedResponse<Guitar>>('/products', {params: options?.query});

  return guitars;
});

export const getGuitarAction = createAsyncThunk<Guitar, RequestOptionsType, {
  extra: AxiosInstance;
}>('guitar/getGuitar', async (options, {extra: api}) => {
  const {data: guitar} = await api.get<Guitar>(`/products/${options?.id as string}`);

  return guitar;
});

export const createGuitarAction = createAsyncThunk<Guitar, FormData, {
  extra: AxiosInstance;
}>('guitar/createGuitar', async (data, {extra: api}) => {
  const {data: guitar} = await api.post<Guitar>('/products/add', data);

  return guitar;
});

export const updateGuitarAction = createAsyncThunk<Guitar, FormDataWithPayload, {
  extra: AxiosInstance;
}>('guitar/updateGuitar', async (data, {extra: api}) => {
  const {data: guitar} = await api.put<Guitar>(`/products/${data.id}/update`, data.formData);

  return guitar;
});

export const removeGuitarAction = createAsyncThunk<void, RequestOptionsType, {
  extra: AxiosInstance;
}>('guitar/removeGuitar', async (options, {extra: api}) => {
  await api.delete(`/products/${options?.id as string}/delete`);
});

