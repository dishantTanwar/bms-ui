import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Grid, Header, Message } from "semantic-ui-react";
import { useLoginMutation } from "../backend-api/authApi";

import { MANUTD_LOGO } from "../constants";
import authSlice from "../slices/authSlice";
import "../styles/Login.css";
import getExceptionComponent from "./exceptionalHandlerUtil";

function Login(props) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const dispatch = useDispatch();
  let tempErrors = "";
  const [login, { isSuccess, isLoading, isError, error: loginErrors, status }] =
    useLoginMutation();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.user && auth.isLoggedIn) {
      // navigate("/home");
    }
  });
  const onSubmit = async (data) => {
    console.log(data);
    const usernameAndPassword = {
      userName: data.username,
      password: data.password,
    };
    // Login request
    // power ranger father of nation

    try {
      const { data, originalStatus, error } = await login(
        usernameAndPassword
      ).unwrap();

      console.log("original status", originalStatus);
      console.log("data is", data);
    } catch (error) {
      console.error("error while LOGIN", error.data);
      tempErrors = error;

      if (error.originalStatus === 200) {
        // Login success
        console.log("login success token is: ", tempErrors.data);
        localStorage.token = tempErrors.data;
        console.log("try to fetch user details");

        console.log("dispatching login action");
        const GET_USER_DETAILS = `http://localhost:8302/getAccountDetails/${usernameAndPassword.userName}`;

        const response = await fetch(GET_USER_DETAILS, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.token,
            "Content-Type": "application/json",
          },
        });

        response.json().then((data) => {
          console.log("response from simple fetch", data);
          dispatch(
            authSlice.actions.loginSuccess({
              token: localStorage.token,
              user: data,
            })
          );
          navigate("/home");
        });
      }
      if (error.message === "INVALID_CREDENTIALS") {
        console.log("token is: ", error.data);
        console.log(`dishant ${error} is my name`);
        tempErrors = error.message;
      }
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column>
        <Header
          as="h2"
          // textAlign="center"
          image={MANUTD_LOGO}
          content="Login"
          style={{ marginBottom: "32px" }}
        />

        <div className="login-form">
          {/* <h1>Login</h1> */}
          {loginErrors
            ? getExceptionComponent("Login Failed", loginErrors)
            : null}
          {isSuccess ? (
            <Message positive>
              <Message.Header>Login SUCCESSFUL</Message.Header>
            </Message>
          ) : null}
          {isLoading ? <p>Loading...</p> : null}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Field inline>
              <label>Username</label>
              <input
                placeholder="username"
                type="text"
                {...register("username", {
                  required: true,
                  pattern: /^[1-9][0-9]{9}/,
                })}
              />
            </Form.Field>
            {errors.username && (
              <p className="text-error">Username should have 10 digits</p>
            )}
            <Form.Field inline>
              <label>Password</label>
              <input
                placeholder="Password"
                type="password"
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                })}
              />
            </Form.Field>
            {errors.password && (
              <p className="text-error">
                Password should be alpha-numeric whith atleast one special
                character
              </p>
            )}
            <Button type="submit" color="blue" loading={isLoading}>
              Login
            </Button>
          </Form>
          <p className="center">
            Don't have an account? <Link to={"/register"}>&nbsp;Signup</Link>
          </p>
        </div>
      </Grid.Column>
    </Grid>
  );
}
export default Login;
