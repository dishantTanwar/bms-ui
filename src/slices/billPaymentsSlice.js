import { createAction, createSlice } from "@reduxjs/toolkit";

const logout = createAction("logout");
const initialState = {
  isSuccess: false,
  bill: {
    id: "",
    username: "",
    timestamp: "",
    billNumber: "",
    billType: "",
    transactionId: undefined,
    cardType: "",
    cardNumber: "",
  },
  message: "",
  error: "",
};
const billPaymentsSlice = createSlice({
  name: "billPaymentsSlice",
  initialState: initialState,
  reducers: {
    success: (state, action) => {
      console.log("success bill-payment state action:", action);
      console.group();
      console.log("bill: ", action.payload.bill);
      console.log("message: ", action.payload.message);
      console.groupCollapsed();

      state.bill = action.payload.bill;
      state.isSuccess = true;
      state.message = action.payload.message;
    },
    failed: (state, { payload }) => {
      state.isSuccess = false;
      state.message = payload.message;
      state.error = payload.error;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(logout, () => {
      console.log("inside AccountSlice extra reducers lgout");
      return initialState;
    }),
});

export default billPaymentsSlice;
