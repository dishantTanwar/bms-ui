import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const accountsApi = createApi({
  reducerPath: "accountsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8302/",
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
    // Sign up
    signup: builder.mutation({
      query: (requestBody) => ({
        url: "/signup",
        method: "POST",
        body: requestBody,
        headers: () =>
          builder.headers.filter((h) => {
            delete h.Authorization;
            return h;
          }),
      }),
    }),
    // Get Account Details
    getAccountDetails: builder.query({
      query: (phoneNumber) => ({
        url: `/getAccountDetails/${phoneNumber}`,
        method: "GET",
      }),
    }),

    // Get Account Balance
    getAccountBalance: builder.query({
      query: (phoneNumber) => ({
        url: `/getBalance/${phoneNumber}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useGetAccountDetailsQuery,
  useGetAccountBalanceQuery,
} = accountsApi;
