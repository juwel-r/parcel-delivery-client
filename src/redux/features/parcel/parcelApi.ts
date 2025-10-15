import { baseApi } from "@/redux/baseApi";
import type { IParcel, IResponse } from "@/types";

const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createParcel: builder.mutation<IResponse<IParcel>, Partial<IParcel>>({
      query: (parcelData) => ({
        url: "/parcel/create",
        method: "POST",
        data: parcelData,
      }),
    }),

    getMyParcel: builder.query<IResponse<IParcel[]>, void>({
      query: () => ({
        url: `/parcel/my-parcels`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateParcelMutation, useGetMyParcelQuery } = parcelApi;
