import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { accountsApi } from "./backend-api/accounts";
import { authApi } from "./backend-api/authApi";
import App from "./components/App";
import "./index.css";
import accountsSlice from "./slices/accountsSlice";
import authSlice from "./slices/authSlice";

import logger from "redux-logger";
import { billPaymentApi } from "./backend-api/billPaymentsApi";
import { fundsTransferApi } from "./backend-api/fundsTransferApi";
import beneficiarySlice from "./slices/beneficiarySlice";
import billPaymentsSlice from "./slices/billPaymentsSlice";
// createa saga middleware
// const sagaMiddleware = createSagaMiddleware();

// setup store
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    accounts: accountsSlice.reducer,
    bills: billPaymentsSlice.reducer,
    beneficiary: beneficiarySlice.reducer,

    [accountsApi.reducerPath]: accountsApi.reducer,
    [billPaymentApi.reducerPath]: billPaymentApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [fundsTransferApi.reducerPath]: fundsTransferApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(sagaMiddleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      accountsApi.middleware,
      authApi.middleware,
      billPaymentApi.middleware,
      fundsTransferApi.middleware,
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
        {/* {() => {
          const userName = parseJwt(localStorage.token).sub;
          const { data, error, isLoading, isSuccess } =
            useGetAccountDetailsQuery(userName);
          const dispatch = useDispatch();
          const store = useSelector((store) => store);
          const navigate = useNavigate();

          let location = useLocation();

          // useEffect(() => {
          //   if (
          //     !["/login", "/register"].includes(location.pathname) &&
          //     !store.auth.isLoggedIn
          //   ) {
          //     navigate("/login");
          //   }
          //   // console.log("location is: ", location);
          // }, [location]);
          if (isSuccess && data.userName === userName) {
            dispatch(
              authSlice.actions.loginSuccess({
                token: localStorage.token,
                user: data,
              })
            );
          }
        }} */}
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
