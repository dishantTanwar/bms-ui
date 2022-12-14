import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormField } from "semantic-ui-react";
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
    delayError: 300,
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
            message: "Phone Bill Successful",
            bill: payload,
          })
        );
        navigate("/bill-payment-success");
      })
      .catch((error) => {
        console.error("rejected", error);
        dispatch(
          billPaymentsSlice.actions.failed({
            message: "Phone Bill Failed",
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
    <div className="bill-payment-container border">
      <h1 className="center bottom-border">Phone Bill</h1>
      <Form onSubmit={handleSubmit(onSubmit)} className="bills-form">
        {/* <div> */}
        <FormField required inline error={errors.mobileNumber ? true : false}>
          <label>Phone Number</label>
          <input
            placeholder="Phone Number"
            {...register("mobileNumber", {
              required: true,
              pattern: /[1-9][0-9]{9}/,
              maxLength: 10,
              minLength: 10,
            })}
          />
          {errors?.mobileNumber?.type === "required" && (
            <p className="form-error-message">Phone Number is required</p>
          )}

          {errors?.mobileNumber?.type === "pattern" && (
            <p className="form-error-message">Please enter digits only</p>
          )}
          {(errors?.mobileNumber?.type === "minLength" ||
            errors?.mobileNumber?.type === "maxLength") && (
            <p className="form-error-message">
              Phone Number should have 10 digits
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
              validate: (value) => value > 0,
              //   message: "Amount should be greater than Zero",
            })}
          />
          {console.log("errors: ", errors)}
          {errors?.amount?.type === "required" && (
            <p className="form-error-message">Amount is required</p>
          )}
          {errors?.amount?.type === "validate" && (
            <p className="form-error-message">Amount should greate than 0</p>
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
            <p className="form-error-message">Answer is required</p>
          )}
        </FormField>

        <div className="payment-option">
          <Button
            size="large"
            color="linkedin"
            loading={isLoading}
            id="form-button-control-public"
            content="Pay"
            // primary
            type="submit"
          />
        </div>
      </Form>
    </div>
  );
}

export default MobileRecharge;
