import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const billPaymentApi = createApi({
  reducerPath: "billPaymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8082/bill-payments/",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store,
      //   let's use that for authenticated requests
      const token = localStorage.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    mobileRecharge: builder.mutation({
      query: (body) => ({
        url: "/mobile-recharge",
        method: "POST",
        body: body,
      }),
    }),
    gasBillPayment: builder.mutation({
      query: (body) => ({
        url: "/gas",
        method: "POST",
        body: body,
      }),
    }),
    electricityBillPayment: builder.mutation({
      query: (body) => ({
        url: "/electricity",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useMobileRechargeMutation,
  useElectricityBillPaymentMutation,
  useGasBillPaymentMutation,
} = billPaymentApi;
