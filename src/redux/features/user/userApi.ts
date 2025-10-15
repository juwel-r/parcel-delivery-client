import { baseApi } from "@/redux/baseApi";
import type { IResponse, IUser } from "@/types";

const userApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllUsers:builder.query<IResponse<IUser[]>, void>({
            query:(params)=>({
                url:"/user",
                method:"GET",
                params
            })
        }),

        getReceivers:builder.query<{name:string, _id:string}[],void>({
            query:()=>({
                url:"user/receivers",
                method:"GET",
            }),
            transformResponse:(res:IResponse<{name:string, _id:string}[]>)=>res.data
        })
    })
})

export const {useGetAllUsersQuery, useGetReceiversQuery}=userApi