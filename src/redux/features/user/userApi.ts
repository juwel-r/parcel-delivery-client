import { baseApi } from "@/redux/baseApi";
import type { IResponse, IUser, TIsActive } from "@/types";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IResponse<IUser[]>, void>({
      query: (params) => ({
        url: "/user",
        method: "GET",
        params,
      }),
      providesTags:['USER']
    }),

    getReceivers: builder.query<{ name: string; _id: string }[], void>({
      query: () => ({
        url: "user/receivers",
        method: "GET",
      }),
      transformResponse: (res: IResponse<{ name: string; _id: string }[]>) =>  res.data,
      providesTags:['USER']
    }),


    updateStatus:builder.mutation<IResponse<IUser>, {status:TIsActive, userId:string}>({
      query:({status, userId})=>({
        url:`/user/${userId}`,
        method:"PATCH",
        data:{isActive:status}
      }),
    invalidatesTags:['USER']
    })

  }),
});

export const {
  useGetAllUsersQuery,
  useGetReceiversQuery,
  useUpdateStatusMutation
} = userApi;
