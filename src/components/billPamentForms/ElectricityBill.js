import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  ButtonOr,
  Form,
  FormField,
} from "semantic-ui-react";
import { useElectricityBillPaymentMutation } from "../../backend-api/billPaymentsApi";
import "../../index.css";
import billPaymentsSlice from "../../slices/billPaymentsSlice";

function ElectricityBill() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [
    payElectricityBill,
    { isLoading, isSuccess, data, error: responseError },
  ] = useElectricityBillPaymentMutation();
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
      billType: "GAS",
      knumber: "",
      serviceProviderType: "GAS",
    },
    mode: "onTouched",
    delayError: 500,
    // reValidateMode: "onSubmit",
  });

  const onSubmit = async (body) => {
    console.log("bill-data:", body);
    payElectricityBill(body)
      .unwrap()
      .then((payload) => {
        console.log("fulfilled", payload);
        dispatch(
          billPaymentsSlice.actions.success({
            message: "Electricity Bill Payment Successful",
            bill: payload,
          })
        );
        navigate("/bill-payment-success");
      })
      .catch((error) => {
        console.error("rejected", error);
        dispatch(
          billPaymentsSlice.actions.failed({
            message: "Electricity Bill Payment Failed",
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
      {/* <p>{JSON.stringify(responseError)}</p>
      <p>{JSON.stringify(data)}</p> */}
      <h1 className="center">Electricity Bill</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* <div> */}
        <FormField required inline error={errors.knumber ? true : false}>
          <label>K-Number</label>
          <input
            placeholder="Electricity bill K-Number"
            {...register("knumber", {
              required: true,
              minLength: 12,
              maxLength: 12,
            })}
          />
          {errors.knumber && (
            <p className="form-error-message">K-Number should have 12 digits</p>
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
            <p className="form-error-message">
              Please enter your answer for above mentioned security question
            </p>
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
            <ButtonOr />
            <Button
              loading={isLoading}
              id="form-button-control-public"
              content="Credit Card"
              onClick={handleCreditCard}
              secondary
            />
          </ButtonGroup>
        </div>
      </Form>
    </div>
  );
}

export default ElectricityBill;
