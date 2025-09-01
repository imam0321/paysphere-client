import type { ComponentType } from 'react';

export type { IRegister, IRegisterResponse, ILogin, ILoginResponse, IUserResponse, IUserUpdate } from './auth';
export type { ITransactionResponse } from "./transaction"
export type { IWalletResponse, IAddMoney, IMoneyResponse } from './wallet';


export interface IMeta {
  page: number
  limit: number
  total: number,
  totalPage: number
}

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: IMeta
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}