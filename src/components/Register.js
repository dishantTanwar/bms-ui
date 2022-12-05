import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "semantic-ui-react";
import "../styles/Register.css";

import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../backend-api/accounts";
import { SECURITY_QUESTIONS, validateUserIsAdult } from "../utils";
function Register() {
  const navigate = useNavigate();
  const [signup, { isError, isSuccess, error, data: user }] =
    useSignupMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const [doesPasswordMatch, setDoesPasswordMatch] = useState(true);
  const onSubmit = async (data, e) => {
    if (data.password === data.confirmPassword) {
      delete data.confirmPassword;
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
        navigate("/home");
      }
    } else {
      console.log("passwords did not match");
      setDoesPasswordMatch(false);
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
        <Form.Field inline className="form-row">
          <label>First Name</label>
          <input
            placeholder="First Name"
            type="text"
            {...register("firstName", { required: true, maxLength: 10 })}
          />
        </Form.Field>
        {errors.firstName && (
          <p className="text-error">First Name is required</p>
        )}

        {/* Last Name */}
        <Form.Field inline className="form-row">
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            type="text"
            {...register("lastName", { required: true, maxLength: 10 })}
          />
        </Form.Field>
        {errors.lastName && <p className="text-error">Last Name is required</p>}

        {/* Email */}

        <Form.Field inline className="form-row">
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
        {errors.emailId && <p className="text-error">Email is required</p>}

        {/* Password */}

        <Form.Field inline className="form-row">
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
        {errors.password?.type === "required" && (
          <p className="text-error">Password is required</p>
        )}
        {errors.password?.type === "pattern" && (
          <p className="text-error">Password should have more than 7 letters</p>
        )}
        <Form.Field inline className="form-row">
          <label>Confirm Password</label>
          <input
            placeholder="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
              onChange: () => {
                const password = watch("password");
                const confirmPassword = watch("confirmPassword");
                if (password !== confirmPassword) {
                  setDoesPasswordMatch(false);
                } else {
                  setDoesPasswordMatch(true);
                }
              },
            })}
          />
        </Form.Field>
        {errors.confirmPassword &&
          errors.confirmPassword?.type === "pattern" && (
            <p className="text-error">
              Password should have more than 7 letters.
            </p>
          )}
        {errors.confirmPassword &&
          errors.confirmPassword?.type === "required" && (
            <p className="text-error">Confirm password is required</p>
          )}
        {!errors.confirmPassword && !doesPasswordMatch && (
          <p className="text-error">Password did not match</p>
        )}

        {/* Username */}
        <Form.Field inline>
          <label>Phone Number</label>
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
          <select
            required
            name="securityQuestion"
            placeholder="Choose Security Question"
            {...register("securityQuestion", {
              required: true,
              minLength: 3,
            })}
          >
            <option disabled>-- Choose Security Question --</option>
            {SECURITY_QUESTIONS.map((q) => (
              <option value={q.value} key={q.key}>
                {q.text}
              </option>
            ))}
          </select>
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
              validate: validateUserIsAdult,
            })}
          />
        </Form.Field>
        {errors?.dateOfBirth?.type === "required" && (
          <p className="text-error">Date of Birth is required</p>
        )}
        {errors?.dateOfBirth?.type === "validate" && (
          <p className="text-error">
            Mininum required age to register si 18 years
          </p>
        )}
        <Form.Button
          className="center margin-bottom"
          content="Register"
          type="submit"
          primary
        />
      </Form>
    </div>
  );
}

export default Register;
