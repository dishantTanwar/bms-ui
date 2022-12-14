import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = { user: {} };

const accountsSlice = createSlice({
  name: "accounts",

  initialState: initialProductsState,

  reducers: {
    signupSuccess: (state, action) => {
      // Note: action.payload is an object with properties {response}.
      console.log("inside signup success reducer");
    },
    signupFailed: (state, action) => {
      console.log("inside signup failed reducer");
    },

    // likeProduct: (state, action) => {
    //   // Note: action.payload is just the id of the product to "like".
    //   const product = state.find((p) => p.id === action.payload);
    //   if (product) {
    //     product.likes++;
    //   }
    // },

    // removeProduct: (state, action) => {
    //   // Note: action.payload is just the id of the product to "remove".
    //   const productIndex = state.findIndex((p) => p.id === action.payload);
    //   if (productIndex !== -1) {
    //     state.splice(productIndex, 1);
    //   }
    // },
  },
});

export default accountsSlice;
