import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
    // prepareHeaders: (headers, { getState }) => {
    //   // By default, if we have a token in the store,
    //   //   let's use that for authenticated requests
    //   const token = getState.auth.token;
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => ({
        url: `/pokemon/${name}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;
