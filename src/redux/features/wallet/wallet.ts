import { baseApi } from "@/redux/baseApi";
import type { IResponse, IWalletResponse } from "@/types";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleWallet: builder.query<IWalletResponse, unknown>({
      query: (id) => ({
        url: `/wallet/${id}`,
        method: "GET",
      }),
      transformResponse: (res: IResponse<IWalletResponse>) => res.data
    })

  }),
});

export const {
  useGetSingleWalletQuery
} = walletApi;