import { baseApi } from "@/redux/baseApi";
import type { IRegister, IRegisterResponse, IResponse } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userRegister: builder.mutation<IResponse<IRegisterResponse>, IRegister>({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    agentRegister: builder.mutation<IResponse<IRegisterResponse>, IRegister>({
      query: (userInfo) => ({
        url: "/agent/register",
        method: "POST",
        data: userInfo,
      }),
    }),

  }),
});

export const {
  useUserRegisterMutation,
  useAgentRegisterMutation,
} = authApi;