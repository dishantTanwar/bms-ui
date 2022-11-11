import { createAction, createSlice } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
const logout = createAction("logout");

const initialProductsState = {
  isSelected: false,
  beneficiary: {},
};

const beneficiarySlice = createSlice({
  name: "beneficiary",

  initialState: initialProductsState,

  reducers: {
    selectBeneficiary: (state, action) => {
      // Note: action.payload is an object with properties {description, price}.
      console.log("Beneficiary payload: ", action.payload);
      state.beneficiary = action.payload;
      state.isSelected = true;
    },

    unSelectBeneficiary: (state, action) => {
      // Note: action.payload is an object with properties {description, price}.
      state.beneficiary = {};
      state.isSelected = false;
    },
    addBeneficiary: (state, action) => {
      // Note: action.payload is an object with properties {description, price}.
      console.log("Beneficiary ADDED: payload: ", action.payload);
      state.beneficiary = action.payload;
      state.isSelected = true;
    },
  },
  extraReducers: {
    [authSlice.actions.logout]: (state, action) => {
      console.log("inside beneficiary slice: extra reducer");
      return initialProductsState;
    },
  },
});

export default beneficiarySlice;
