import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = {};

const beneficiarySlice = createSlice({
  name: "beneficiary",

  initialState: initialProductsState,

  reducers: {
    addProduct: (state, action) => {
      // Note: action.payload is an object with properties {description, price}.
      state.push({
        description: action.payload.description,
        price: action.payload.price,
        likes: 0,
      });
    },

    likeProduct: (state, action) => {
      // Note: action.payload is just the id of the product to "like".
      const product = state.find((p) => p.id === action.payload);
      if (product) {
        product.likes++;
      }
    },

    removeProduct: (state, action) => {
      // Note: action.payload is just the id of the product to "remove".
      const productIndex = state.findIndex((p) => p.id === action.payload);
      if (productIndex !== -1) {
        state.splice(productIndex, 1);
      }
    },
  },
});

export default beneficiarySlice;
