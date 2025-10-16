import { baseApi } from "@/redux/baseApi";
import type { IParcel, IResponse, IStatusLog } from "@/types";

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

    updateStatus: builder.mutation<IResponse<IParcel>,{parcelId:string, data:IStatusLog}>({
      query: ({parcelId, data}) => ({
        url: `/parcel/${parcelId}/update`,
        method: "PATCH",
        data
      }),
    }),
  }),
});

export const { useCreateParcelMutation, useGetMyParcelQuery, useUpdateStatusMutation } = parcelApi;
