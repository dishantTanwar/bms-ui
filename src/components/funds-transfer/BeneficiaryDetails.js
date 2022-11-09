import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, FormField } from "semantic-ui-react";
import { useAddBeneficiaryMutation } from "../../backend-api/fundsTransferApi";
import "../../index.css";
import beneficiarySlice from "../../slices/beneficiarySlice";
import getExceptionComponent from "../exceptionalHandlerUtil";

function BeneficiaryDetails(props) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [
    addBeneficiary,
    { isLoading, isSuccess, data, error: responseError, isError },
  ] = useAddBeneficiaryMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      id: 0,
      benefactorPhoneNumber: user.userName,
      name: "",
      phoneNumber: "",
      accountNumber: 0,
      ifsc: "",
    },
    mode: "onTouched",
    delayError: 500,
    // reValidateMode: "onSubmit",
  });

  const onSubmit = (body) => {
    console.log("bill-data:", body);
    addBeneficiary(body)
      .unwrap()
      .then((payload) => {
        console.log("ADD Beneficiary SUCCESS: ", payload);
        dispatch(beneficiarySlice.actions.addBeneficiary(body));
        navigate("..", { relative: "path" });
      })
      .catch((error) => {
        console.error("ADD Beneficiary FAILED!!!!!!", error);
      });
  };

  return (
    <div className="level-2 flex-col">
      <h1 className="center">{props.operation} Beneficiary</h1>
      {isError
        ? getExceptionComponent("Add Beneficiary Failed", responseError)
        : null}
      <Form className="flex-form" onSubmit={handleSubmit(onSubmit)}>
        {/* <div> */}
        <FormField required inline error={errors.name ? true : false}>
          <label>Name</label>
          <input
            placeholder="Beneficiary Name"
            {...register("name", {
              required: true,
            })}
          />
          {errors.name && (
            <p className="form-error-message">Please enter beneficiary name</p>
          )}
        </FormField>
        {/* </div> */}
        <FormField required inline error={errors.phoneNumber ? true : false}>
          <label>Phone Number</label>
          <input
            placeholder="Phone number"
            {...register("phoneNumber", {
              required: true,
              minLength: 10,
              maxLength: 10,
            })}
          />
          {errors.phoneNumber && (
            <p className="form-error-message">
              Phone number should have 10 digits
            </p>
          )}
        </FormField>
        <FormField required inline error={errors.accountNumber ? true : false}>
          <label>Account Number</label>
          <input
            placeholder="Account number"
            {...register("accountNumber", {
              required: true,
              valueAsNumber: true,
              minLength: 10,
              maxLength: 12,
            })}
          />
          {errors.accountNumber && (
            <p className="form-error-message">
              "Amount should have be greater than or equal to 10 digits",
            </p>
          )}
        </FormField>
        <FormField required inline error={errors.ifsc ? true : false}>
          <label>IFSC</label>
          <input
            placeholder="IFSC"
            {...register("ifsc", {
              required: true,
              min: 11,
              max: 11,
              //   message: "Amount should be greater than Zero",
            })}
          />
          {errors.ifsc && (
            <p className="form-error-message">
              The IFSC is an 11 digit alpha numeric code, with the first four
              digits identifying the bank, fifth is numeric (kept 0) and the
              last six digits represent the bank branch
            </p>
          )}
        </FormField>
        <div className="payment-option flex-row">
          <Button
            loading={isLoading}
            id="form-button-control-public"
            content={props.operation}
            secondary
            type="submit"
          />
          <Link to=".." relative="path">
            <Button
              id="form-button-control-public "
              content="Cancel"
              color="grey"
              type="button"
            />
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default BeneficiaryDetails;
