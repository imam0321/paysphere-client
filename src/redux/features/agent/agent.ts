import { baseApi } from "@/redux/baseApi";
import type { IResponse, IUserResponse } from "@/types";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllAgent: builder.query<IResponse<IUserResponse[]>, unknown>({
      query: (params) => ({
        url: "/agent",
        method: "GET",
        params
      }),
      providesTags: ["AGENT"],
    })

  }),
});

export const {
  useGetAllAgentQuery
} = agentApi;