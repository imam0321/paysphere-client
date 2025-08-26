import type { TRole } from "./auth"

export interface ITransactionResponse {
  _id: string
  fromWalletId: string
  toWalletId: string
  type: string
  amount: number
  commission: number
  currentBalance: number
  initiatedBy: InitiatedBy
  purpose: string
  createdAt: string
  updatedAt: string
}

export interface InitiatedBy {
  _id: string
  name: string
  role: TRole
}