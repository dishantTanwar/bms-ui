import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8400/auth/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (usernameAndPassword) => ({
        url: "/authenticate",
        method: "POST",
        body: usernameAndPassword,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
