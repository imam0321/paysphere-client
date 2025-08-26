export type { IRegister, IRegisterResponse, ILogin, ILoginResponse, IUserResponse } from './auth';
export type { ITransactionResponse } from "./transaction"
export type { IWalletResponse } from './wallet';


export interface IMeta {
  page: number
  limit: number
  totalPage: number
  totalDocument: number
}

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: IMeta
}