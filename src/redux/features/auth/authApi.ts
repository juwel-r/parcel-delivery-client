import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        data: userData,
      }),
    }),

    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        data: userData,
      }),
    }),

    logOut: builder.mutation({
      query: (userData) => ({
        url: "/auth/logout",
        method: "POST",
        data: userData,
      }),
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/user/register",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogOutMutation,
  useUserInfoQuery,
} = authApi;
