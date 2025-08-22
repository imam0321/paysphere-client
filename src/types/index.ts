
export type { IRegister, IRegisterResponse } from './auth';


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