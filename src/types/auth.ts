export interface IRegister {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export type TRole = "user" | "agent" | "admin"
export type TActive = "active" | "blocked"

export interface TransactionId {
  _id: string
  fromWalletId: string
  type: string
}

export interface WalletId {
  _id: string
  balance: number
}

export interface IRegisterResponse {
  _id: string;
  name: string;
  email: string;
  role: TRole;
  phone: string;
  feeRate?: number;
  commissionRate?: number;
  isActive: TActive;
  isApproved: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  transactionId: TransactionId[];
  createdAt: string;
  updatedAt: string;
  walletId: WalletId;
}

