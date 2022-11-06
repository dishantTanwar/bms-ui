import { all, put, takeEvery } from "redux-saga/effects";
import { AUTH_GENERATE_TOKEN_REQUEST, LOGIN_REQUEST } from "./constants";
import authSlice from "./slices/authSlice";

// Sign-up
function* watchSignUpAsync(registerRequestBody) {
  yield takeEvery("signupAsync", doSignUpAsync(registerRequestBody));
}

function* doSignUpAsync(registerRequestBody) {
  console.log("inside do Signnup Async");
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerRequestBody),
  };
  try {
    console.log("try sending req");
    //   const request = yield window.fetch(SIGNUP_REQUEST, requestOptions);
    // requestOptions =
    // const request = yield window.fetch(SIGNUP_REQUEST, requestOptions);

    const request = yield window.fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    console.log("request-res: ", request);
    const response = yield request.json();

    console.log("Signup - Response", response);
    // if (response.status === 200) {
    //   console.log("CALL: signup-success action");
    //   yield put(accountsSlice.actions.signupSuccess(response));
    // } else {
    //   console.log("CALL: signup-failed action");

    //   yield put(accountsSlice.actions.signupFailed(response));
    // }
  } catch (error) {
    console.log("watch-signup-async Error: ", error);
  }
}

// Login
function* watchLoginAsync() {
  yield takeEvery("loginAsync", doLoginAsync);
}
function* doLoginAsync() {
  try {
    const request = yield window.fetch(LOGIN_REQUEST);
    const response = yield request.json();
    console.log("Signup - Response", response);
    if (response.status === 200) {
      console.log("CALL: login-success action");
      yield put(authSlice.actions.loginSuccess(response));
    } else {
      console.log("CALL: login-failed action");

      yield put(authSlice.actions.loginFailed(response));
    }
  } catch (error) {
    console.log("watch-login-async Error: ", error);
  }
}

// Generate JWT Token
function* watchGenerateTokenAsync(usernameAndPassword) {
  yield takeEvery("generateTokenAsync", doGenerateTokenAsync);
}
function* doGenerateTokenAsync(usernameAndPassword) {
  try {
    const request = yield window.fetch(AUTH_GENERATE_TOKEN_REQUEST);
    const response = yield request.json();
    console.log("Auth Generate Token - Response", response);
    if (response.status === 200) {
      console.log("CALL: signup-success action");
      yield put(authSlice.actions.generateTokenSuccess(response));
    } else {
      console.log("CALL: generateToken-failed action");

      yield put(authSlice.actions.generateTokenFailed(response));
    }
  } catch (error) {
    console.log("watch-signup-async Error: ", error);
  }
}
export default function* myRootSaga() {
  yield all([watchSignUpAsync(), watchLoginAsync(), watchGenerateTokenAsync()]);
}
