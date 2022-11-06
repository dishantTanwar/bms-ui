import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { accountsApi } from "./backend-api/accounts";
import { authApi } from "./backend-api/authApi";
import { pokemonApi } from "./backend-api/learntRTk";
import App from "./components/App";
import "./index.css";
import accountsSlice from "./slices/accountsSlice";
import authSlice from "./slices/authSlice";

import logger from "redux-logger";
import { billPaymentApi } from "./backend-api/billPaymentsApi";
import billPaymentsSlice from "./slices/billPaymentsSlice";
// createa saga middleware
// const sagaMiddleware = createSagaMiddleware();

// setup store
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    accounts: accountsSlice.reducer,
    bills: billPaymentsSlice.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [billPaymentApi.reducerPath]: billPaymentApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(sagaMiddleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      accountsApi.middleware,
      authApi.middleware,
      billPaymentApi.middleware,
      logger,
    ]),
});

// run middleware to watch for async actions
// sagaMiddleware.run(myRootSaga);

const container = document.getElementById("root");
const root = createRoot(container);
console.log(store);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
