import type { TRole } from "./auth"

export interface IWalletResponse {
  _id: string
  userId: UserId
  balance: number
  currency: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface UserId {
  _id: string
  name: string
  role: TRole
}