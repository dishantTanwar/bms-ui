import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cardsApi = createApi({
  reducerPath: "cardsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8083/",
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
    addCard: builder.mutation({
      query: (body) => ({
        url: "/cards",
        method: "POST",
        body: body,
      }),
    }),
    getDebitCard: builder.query({
      query: (phoneNumber) => ({
        url: `http://localhost:8083/cards/${phoneNumber}?cardType=DEBIT`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddCardMutation } = cardsApi;
