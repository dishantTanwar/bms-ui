import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Form } from "semantic-ui-react";
import "../styles/Register.css";

import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../backend-api/accounts";
function Register() {
  const { auth, accounts } = useSelector((store) => store);
  const navigate = useNavigate();
  const [
    signup,
    { isLoading, isError, isFetching, isSuccess, error, data: user },
  ] = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data, e) => {
    console.log("submit register error: ", e);
    const signupRequestBody = {
      userName: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.emailId,
      securityQuestion: data.securityQuestion,
      answer: data.answer,
      password: data.password,
      dateOfBirth: data.dateOfBirth,
    };
    console.log(signupRequestBody);

    try {
      // const response = await signup(signupRequestBody).unwrap();
      await signup(signupRequestBody).unwrap();
    } catch (err) {
      console.error("Failed to signup: ", err);
    } finally {
      if (isSuccess) {
        navigate("/");
      }
    }
  };

  // "dateOfBirth": "1022-02-11"

  return (
    <div className="register">
      <h1 className="center">Register User</h1>
      {/* <h2>{ accounts}</h2> */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        {isSuccess ? () => <h2>LOGIN SUCCESS {user}</h2> : ""}

        {isError ? () => <div>{error}</div> : ""}

        {/* First NAme */}
        <Form.Field inline>
          <label>First Name</label>
          <input
            placeholder="First Name"
            type="text"
            {...register("firstName", { required: true, maxLength: 10 })}
          />
        </Form.Field>
        {errors.firstName && (
          <p className="text-error">Please check the First Name</p>
        )}

        {/* Last Name */}
        <Form.Field inline>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            type="text"
            {...register("lastName", { required: true, maxLength: 10 })}
          />
        </Form.Field>
        {errors.lastName && (
          <p className="text-error">Please check the Last Name</p>
        )}

        {/* Email */}

        <Form.Field inline>
          <label>Email</label>
          <input
            placeholder="Email"
            type="email"
            {...register("emailId", {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
        </Form.Field>
        {errors.emailId && <p className="text-error">Please check the Email</p>}

        {/* Password */}

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
          <p className="text-error">Password should have more than 7 letters</p>
        )}
        {/* <Form.Field inline>
          <label>Confirm Password</label>
          <input
            placeholder="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
            })}
          />
        </Form.Field>
        {errors.confirmPassword && (
          <p className="text-error">Please check the Password</p>
        )} */}
        {/* Username */}
        <Form.Field inline>
          <label>Usernam / Phone Number</label>
          <input
            placeholder="Username"
            type="text"
            {...register("userName", {
              required: true,
              pattern: /[1-9][0-9]{9}/,
            })}
          />
        </Form.Field>
        {errors.userName && (
          <p className="text-error">Username should have 10 digits</p>
        )}
        <Form.Field inline>
          <label>Security Question</label>
          <input
            placeholder="Security Question"
            type="text"
            {...register("securityQuestion", {
              required: true,
              minLength: 3,
            })}
          />
        </Form.Field>
        {errors.securityQuestion && (
          <p className="text-error">Security Question should have min 3 size</p>
        )}
        {/*  Security Answer */}

        <Form.Field inline>
          <label>Security Answer</label>
          <input
            placeholder="Security Answer"
            type="text"
            {...register("answer", {
              required: true,
              minLength: 3,
            })}
          />
        </Form.Field>
        {errors.answer && (
          <p className="text-error">Security Answer should have min 3 size</p>
        )}
        <Form.Field inline>
          <label>Date of Birth</label>
          <input
            placeholder="Date of Birth"
            type="date"
            {...register("dateOfBirth", {
              required: true,
            })}
          />
        </Form.Field>
        {errors.dateOfBirth && (
          <p className="text-error">Date of Birth is required</p>
        )}
        <Form.Button className="center" content="Register" primary />
      </Form>
    </div>
  );
}

export default Register;
