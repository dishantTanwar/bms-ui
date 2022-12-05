import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Form, FormField } from "semantic-ui-react";
import { useMobileRechargeMutation } from "../../backend-api/billPaymentsApi";
import "../../index.css";
import billPaymentsSlice from "../../slices/billPaymentsSlice";

function MobileRecharge() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [
    doMobileRecharge,
    { isLoading, isSuccess, data, error: mobileRechargeError },
  ] = useMobileRechargeMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: user.userName,
      amount: 0,
      securityQuestion: user.securityQuestion,
      securityAnswer: "",
      cardType: "DEBIT",
      billType: "MOBILE_RECHARGE",
      mobileNumber: "",
      serviceProviderType: "MOBILE_RECHARGE",
    },
    mode: "onTouched",
    delayError: 500,
    // reValidateMode: "onSubmit",
  });

  const onSubmit = async (body) => {
    console.log("bill-data:", body);
    doMobileRecharge(body)
      .unwrap()
      .then((payload) => {
        console.log("fulfilled", payload);
        dispatch(
          billPaymentsSlice.actions.success({
            message: "Mobile Recharge Successful",
            bill: payload,
          })
        );
        navigate("/bill-payment-success");
      })
      .catch((error) => {
        console.error("rejected", error);
        dispatch(
          billPaymentsSlice.actions.failed({
            message: "Mobile Recharge Failed",
            error: error,
          })
        );
        navigate("/bill-payment-failed");
      });
  };
  const handleCreditCard = () => {
    navigate("/credit-card");
  };
  return (
    <div className="bill-payment-container">
      <h1 className="center bottom-border">Mobile Recharge</h1>
      <Form onSubmit={handleSubmit(onSubmit)} className="bills-form">
        {/* <div> */}
        <FormField required inline error={errors.mobileNumber ? true : false}>
          <label>Mobile Number</label>
          <input
            placeholder="mobile number to recharge"
            {...register("mobileNumber", {
              required: true,
              minLength: 10,
              maxLength: 10,
            })}
          />
          {errors.mobileNumber && (
            <p className="form-error-message">
              Please enter the mobile number you want to recharge
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
              //   min: 1,
              //   message: "Amount should be greater than Zero",
            })}
          />
          {errors.amount && (
            <p className="form-error-message">
              Amount should be greater than Zero
            </p>
          )}
        </FormField>
        <FormField
          required
          inline
          error={errors.securityQuestion ? true : false}
        >
          <label htmlFor="securityQuestion">Security Question</label>
          <input
            disabled
            // placeholder="luo"
            value={user.securityAnswer}
            {...register("securityQuestion", { required: true })}
          />
          {errors.securityQuestion && (
            <p className="form-error-message">This is required</p>
          )}
        </FormField>

        <FormField required inline error={errors.securityAnswer ? true : false}>
          <label placeholder="Enter your Answer for Security Answer">
            Answer
          </label>
          <input {...register("securityAnswer", { required: true })} />
          {errors.securityAnswer && (
            <p className="form-error-message">This is required</p>
          )}
        </FormField>

        <div className="payment-option">
          <h3 className="center">Payment Method</h3>
          <ButtonGroup size="large">
            <Button
              loading={isLoading}
              id="form-button-control-public"
              content="Debit Card"
              primary
              type="submit"
            />
            {/* <ButtonOr />
            <Button
              loading={isLoading}
              id="form-button-control-public"
              content="Credit Card"
              onClick={handleCreditCard}
              secondary
            /> */}
          </ButtonGroup>
        </div>
      </Form>
    </div>
  );
}

export default MobileRecharge;
