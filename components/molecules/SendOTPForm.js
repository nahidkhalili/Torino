"use client";

// import { useState } from "react";
import toast from "react-hot-toast";

import styles from "./OTP.module.css";

import { useSendOtp } from "../../services/mutations";
// import { isValidMobile } from "../../utils/validation";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  mobile: yup
    .string()
    .trim()
    .required("شماره موبایل خود را وارد کنید")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});

function SendOTPForm({ setMobile, setStep, setExpired }) {
  // const [error, setError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const { isPending, mutate } = useSendOtp();

  const sendOtpHandler = ({ mobile }) => {
    if (isPending) return;
    mutate(
      { mobile },
      {
        onSuccess: (response) => {
          setMobile(mobile);
          toast.success(response?.data?.message);
          toast(response?.data.code);
          console.log("sendOtpResponse:", response);
          setStep(2);
        },
        onError: (error) => {
          console.log("sendOtpError:", error);
        },
      },
    );
  };

  // const sendOtpHandler = (event) => {
  //   event.preventDefault();

  //   if (isPending) return;
  //   if (!isValidMobile(mobile)) return setError("شماره معتبر وارد کنید!");
  //   setError("");

  //   mutate(
  //     { mobile },
  //     {
  //       onSuccess: (data) => {
  //         toast.success(data?.data?.message);
  //         toast(data?.data?.code);
  //         console.log("hi", data);
  //         setStep(2);
  //       },
  //       onError: (error) => {
  //         console.log(error);
  //       },
  //     }
  //   );
  // };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>ورود به تورینو</h4>
      <form className={styles.form} onSubmit={handleSubmit(sendOtpHandler)}>
        <label htmlFor="mobile">شماره موبایل خود را وارد کنید</label>
        {/* <input
          className={styles.input}
          type="text"
          placeholder="۳۳۱۳****۰۹۱۲"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        /> */}

        <input
          type="tel"
          className={styles.input}
          placeholder="۳۳۱۳****۰۹۱۲"
          id="mobile"
          {...register("mobile")}
        />
        {errors.mobile && (
          <p className={styles.error}>{errors.mobile.message}</p>
        )}
        <button disabled={isPending} className={styles.button} type="submit">
          {isPending ? " در حال دریافت کد " : " ارسال کد تایید"}
        </button>
      </form>
    </div>
  );
}

export default SendOTPForm;
