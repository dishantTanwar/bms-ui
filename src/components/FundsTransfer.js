import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Form, FormField } from "semantic-ui-react";
import { useTransferFundsMutation } from "../backend-api/fundsTransferApi";

function FundsTransfer() {
  const user = useSelector((state) => state.auth.user);
  const beneficiary = useSelector((state) => state.beneficiary.beneficiary);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [transferFunds, { isLoading, isSuccess, data, error: responseError }] =
    useTransferFundsMutation();
  const [isSelecting, setIsSelecting] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      fromPhoneNumber: user.userName,
      password: "",
      securityAnswer: "",
      beneficiary: {
        id: 0,
        benefactorPhoneNumber: "",
        name: "",
        phoneNumber: "",
        accountNumber: 0,
        ifsc: "",
      },
      amount: 0,
    },
    mode: "onTouched",
    delayError: 500,
    // reValidateMode: "onSubmit",
  });
  const onSubmit = (body) => {
    body.beneficiary = beneficiary;
    console.log("Funds Transfer request:", body);
    if (body.securityAnswer.toLowerCase() !== user.answer.toLowerCase()) {
      console.log("Sec q&A didnt match");
      console.log("Original: ", user.answer);
      console.log("Yours: ", body.securityAnswer);
    } else {
      delete body.securityAnswer;
      transferFunds(body)
        .unwrap()
        .then((payload) => {
          console.log("Funds Transfer Success: ", payload);
          navigate("/transfer-funds/success", { state: { ...payload } });
        })
        .catch((error) => {
          console.error("Funds Transfer FAILED!!!!!!", error);
          navigate("/transfer-funds/failed", { state: { ...error } });
        });
    }
  };
  return (
    <div className="level-2 flex-col">
      <div className="bill-payment-container flex-col">
        <h1 className="center">Transfer Funds</h1>
        <div className="flex-col">
          <Form className="flex-form" onSubmit={handleSubmit(onSubmit)}>
            {/* <div> */}
            <FormField required inline error={errors.password ? true : false}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Your Password"
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                })}
              />
              {errors.password && (
                <p className="form-error-message">
                  Password should be alpha-numeric whith atleast one special
                  character
                </p>
              )}
            </FormField>
            {/* </div> */}
            <FormField required inline error={errors.amount ? true : false}>
              <label>Amount</label>
              <input
                placeholder="Amount "
                {...register("amount", {
                  required: true,
                  valueAsNumber: true,
                  min: 1,
                  //   message: "Amount should be greater than Zero",
                })}
              />
              {errors.amount && (
                <p className="form-error-message">
                  Amount should be greater than Zero
                </p>
              )}
            </FormField>
            <FormField inline>
              <label htmlFor="securityQuestion">Security Question</label>
              <input
                disabled
                // placeholder="luo"
                value={user.securityQuestion}
              />
            </FormField>
            <FormField
              required
              inline
              error={errors.securityAnswer ? true : false}
            >
              <label placeholder="Enter your Answer for Security Answer">
                Answer
              </label>
              <input {...register("securityAnswer", { required: true })} />
              {errors.securityAnswer && (
                <p className="form-error-message">
                  Please enter your answer for above mentioned security question
                </p>
              )}
            </FormField>
            <div className="flex-row">
              <FormField
                required
                inline
                error={errors.securityAnswer ? true : false}
              >
                <label>Beneficiary</label>
                &nbsp; &nbsp;
                <Link
                  to="select-beneficiary"
                  onClick={() => {
                    setIsSelecting(true);
                  }}
                >
                  <strong>Select</strong>
                </Link>
                &nbsp;
                <p>|</p>
                &nbsp;
                <Link to="/transfer-funds/add-beneficiary">
                  <strong>Add</strong>
                </Link>
                {/* <Link to="edit-beneficiary">
                <strong>Edit</strong>
              </Link> */}
              </FormField>
            </div>
            <Outlet className="outlet level-3" />
            &nbsp;
            <div className="payment-option">
              <h3 className="center">Press button below to tranfer funds</h3>
              <Button
                loading={isLoading}
                id="tf-form-button-control-public"
                content="Transfer Funds"
                primary
                type="submit"
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default FundsTransfer;
