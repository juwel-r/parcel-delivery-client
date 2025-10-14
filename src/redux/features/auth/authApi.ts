import { baseApi } from "@/redux/baseApi";
import type { IResponse, IUser, IUserRegister } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IResponse<IUser>, IUserRegister>({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        data: userData,
      }),
    }),

    login: builder.mutation<IResponse<null>, {email:string, password:string}>({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        data: userData,
      }),
    }),

    logOut: builder.mutation<IResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    userInfo: builder.query<IUser, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      transformResponse:(response:IResponse<IUser>)=>response.data
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogOutMutation,
  useUserInfoQuery,
} = authApi;
