import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Form, FormField } from "semantic-ui-react";
import { useTransferFundsMutation } from "../backend-api/fundsTransferApi";

function FundsTransfer() {
  const user = useSelector((state) => state.auth.user);
  const beneficiary = useSelector((state) => state.beneficiary.beneficiary);

  const navigate = useNavigate();
  const location = useLocation();

  const [transferFunds, { isLoading, error: responseError }] =
    useTransferFundsMutation();
  const [isSelecting, setIsSelecting] = useState(false);
  const [showBeneficairyRequired, setShowBeneficairyRequired] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      fromPhoneNumber: user.userName,
      password: "",
      securityAnswer: "",
      beneficiary: {},
      amount: 0,
    },
    mode: "onTouched",
    delayError: 500,
    // reValidateMode: "onSubmit",
  });
  const onSubmit = (body) => {
    console.log("beneficiary is: ", beneficiary);
    if (beneficiary.id) {
      console.log("beneficiary exists");
    }
    if (!beneficiary.id) {
      setShowBeneficairyRequired(true);
      return;
    }
    body.beneficiary = beneficiary;
    console.log("Beneficiar in store:", beneficiary);

    console.log("Funds Transfer request:", body);
    if (body.securityAnswer.toLowerCase() !== user.answer.toLowerCase()) {
      console.log("Sec q&A didnt match");
      console.log("Original: ", user.answer);
      console.log("Yours: ", body.securityAnswer);
      navigate("/transfer-funds/failed", {
        state: {
          data: {
            message: "Invalid Credentials",
            status: "Wrong Security Password ",
          },
          status: 401,
        },
      });
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
    <div className="funds-transfer">
      {/* <div className="side-bar">Transfer Funds</div> */}
      <div className="funds-transfer-container flex-col">
        <h1 className="center">Transfer Funds</h1>
        <div className="flex-col">
          <Form className="flex-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="funds-transfer-section-1">
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
                    Please enter your answer for above mentioned security
                    question
                  </p>
                )}
              </FormField>
              {/* </div>
            <div className="funds-transfer-section-2"> */}

              <div className="flex-row" style={{ padding: "0 7rem 1rem 0" }}>
                <FormField required inline>
                  <label>Beneficiary</label>
                  &nbsp; &nbsp;
                  <Link
                    to="select-beneficiary"
                    onClick={() => {
                      setIsSelecting(true);
                      setShowBeneficairyRequired(false);
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
              {showBeneficairyRequired && (
                <p className="form-error-message">Beneficiary is required</p>
              )}
            </div>
            <div className="funds-transfer-section-2">
              <Outlet className="outlet level-3" />
              &nbsp;
              <div className="payment-option">
                <ButtonGroup>
                  <Button
                    loading={isLoading}
                    id="tf-form-button-control-public"
                    content="Transfer Funds"
                    primary
                    type="submit"
                    style={{
                      "border-radius": 0,
                    }}
                  />
                  <Link to="/home">
                    <Button
                      id="form-button-back-to-home "
                      content="Cancel"
                      color="grey"
                      type="button"
                      style={{
                        "margin-left": "1rem",
                        "border-radius": 0,
                      }}
                    />
                  </Link>
                </ButtonGroup>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default FundsTransfer;
