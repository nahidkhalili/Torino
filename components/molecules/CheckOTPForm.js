"use client";

import { useState } from "react";
import OtpInput from "react18-input-otp";
import styles from "./OTP.module.css";

import { useCheckOtp } from "../../services/mutations";
import { setCookie } from "../../utils/cookie";
import { useModalContext } from "../../providers/contextProvider";

import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  code: yup
    .string()
    .length(6, "طول کد باید 6 رقم باشد")
    .matches(/^[0-9]+$/, "کد باید عدد باشد")
    .required("کد را وارد کنید"),
});

function CheckOTPForm({ mobile, setStep, setIsOpen }) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { isPending, mutate } = useCheckOtp();
  const { setUser, handleLogin } = useModalContext();

  const checkOtpHandler = ({ code }) => {
    if (isPending) return;
    console.log("code:", code);

    mutate(
      { mobile, code },
      {
        onSuccess: (response) => {
          setCookie("accessToken", response?.data?.accessToken, 30);
          setCookie("refreshToken", response?.data?.refreshToken, 365);
          setIsOpen(false);
          // setUser(mobile);
          handleLogin(mobile);
          setStep(1);
        },
        onError: (error) => {
          console.log("an error occured", error.message);
          setError("code", { type: "server", message: error.message });
        },
      },
    );
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>کد تایید را وارد کنید.</h4>
      <form className={styles.form} onSubmit={handleSubmit(checkOtpHandler)}>
        <label>کد تایید به شماره موبایل {mobile} ارسال شد.</label>
        <div className={styles.otpContainer}>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <OtpInput
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                numInputs={6}
                shouldAutoFocus={true}
                inputStyle={{
                  border: "1px solid silver",
                  borderRadius: "5px",
                  width: "58px",
                  height: "53px",
                  height: "45px",
                  marginRight: "5px",
                }}
              />
            )}
          />

          {errors.code && (
            <p className={styles.serverError}>{errors.code.message}</p>
          )}
        </div>
        <button className={styles.button} type="submit">
          ورود به تورینو
        </button>
      </form>
    </div>
  );
}

export default CheckOTPForm;
