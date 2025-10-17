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
      invalidatesTags: ["PARCEL"],
    }),

    getMyParcel: builder.query<IResponse<IParcel[]>, void>({
      query: () => ({
        url: `/parcel/my-parcels`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    updateStatus: builder.mutation<
      IResponse<IParcel>,
      { parcelId: string; data: IStatusLog }
    >({
      query: ({ parcelId, data }) => ({
        url: `/parcel/${parcelId}/update`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    parcelTracking: builder.query<IResponse<IParcel>, string>({
      query: (trackingId) => ({
        url: `/parcel/${trackingId}/history`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    cancelParcel: builder.mutation<IResponse<IParcel>, string>({
      query: (parcelId) => ({
        url: `/parcel/${parcelId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    receiverUpcomingParcels: builder.query<IResponse<IParcel[]>, void>({
      query: () => ({
        url: "/parcel/receiver/upcoming-parcel",
        method: "GET",
      }),
      // transformResponse:(res:IResponse<IParcel[]>)=>res.data,
      providesTags: ["PARCEL"],
    }),

    confirmDelivery: builder.mutation<IResponse<IParcel[]>, string>({
      query: (parcelId) => ({
        url: `/parcel/${parcelId}/confirm-delivery`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    deliveredParcel: builder.query<IResponse<IParcel[]>, void>({
      query: () => ({
        url: `parcel/receiver/delivered`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useGetMyParcelQuery,
  useUpdateStatusMutation,
  useParcelTrackingQuery,
  useCancelParcelMutation,
  useReceiverUpcomingParcelsQuery,
  useConfirmDeliveryMutation,
  useDeliveredParcelQuery,
} = parcelApi;
