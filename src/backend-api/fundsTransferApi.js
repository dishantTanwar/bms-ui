import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const fundsTransferApi = createApi({
  reducerPath: "fundsTransferApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
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
    getTransactions: builder.query({
      query: (userName) => ({
        url: `/transactions/${userName}`,
        method: "GET",
      }),
    }),
    getBeneficiaries: builder.query({
      query: (userName) => ({
        url: `/beneficiaries/${userName}`,
        method: "GET",
      }),
    }),
    addBeneficiary: builder.mutation({
      query: (body) => ({
        url: `/beneficiaries/`,
        method: "POST",
        body: body,
      }),
    }),
    transferFunds: builder.mutation({
      query: (body) => ({
        url: `/funds-transfer`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useAddBeneficiaryMutation,
  useGetTransactionsQuery,
  useGetBeneficiariesQuery,
  useTransferFundsMutation,
} = fundsTransferApi;
