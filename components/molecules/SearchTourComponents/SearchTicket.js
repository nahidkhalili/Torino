"use client";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { DatePicker } from "zaman";
import Image from "next/image";
import QueryString from "qs";

import { DateToIso, flattenObject } from "../../../utils/helper";
import useQuery from "../../../utils/query";
import { resetToMidnight } from "../../../utils/resetToMidnight";

import styles from "./SearchTicket.module.css";
import CitySelect from "./CitySelect";

// const noIndicatorSpread = () => null;
// const noDropdownIndicator = () => null;

const SearchTicket = ({ destinationCities, originCities }) => {
  const router = useRouter();
  const { getQuery } = useQuery();

  const { handleSubmit, control, reset } = useForm();

  // const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    const originId = getQuery("originId");
    const destinationId = getQuery("destinationId");
    if (originId && destinationId) reset({ originId, destinationId });
  }, []);

  const onSubmit = (form) => {
    const query = QueryString.stringify(flattenObject(form));
    router.push(`/?${query}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div
        className={styles.inputContainer}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Image
          src="/icons/location.png"
          width={24}
          height={24}
          alt="profile image"
        />
        <Controller
          control={control}
          name="originId"
          render={({ field }) => {
            // You should know that {field} contains the items below
            // <Select
            // name={field.name}
            // value={field.value}
            // onChange={field.onChange}
            // onBlur={field.onBlur}
            // ref={field.ref}
            // />

            return (
              <CitySelect field={field} city={originCities} label="مبدا" />
            );
          }}
        />
      </div>

      <div
        className={styles.inputContainer}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Image
          src="/icons/global-search.png"
          width={24}
          height={24}
          alt="profile image"
        />
        <Controller
          control={control}
          name="destinationId"
          render={({ field }) => {
            return (
              <CitySelect field={field} city={destinationCities} label="مقصد" />
            );
          }}
        />
      </div>
      {/* <div className={styles.dateContainer}>
        <Image
          src="/icons/cal.png"
          width={24}
          height={24}
          alt="profile image"
          style={{ marginLeft: "10px", cursor: "pointer" }}
        />
        <Controller
          control={control}
          name="date"
          render={({ field }) => {
            const showLabel = !!field.value || focusedInput === "date";
            return (
              <>
                <span
                  className={`${styles.labelStyle} ${showLabel ? styles.dateActive : ""}`}
                >
                  تاریخ
                </span>

                <DatePicker
                  round="x2"
                  accentColor="#28A745"
                  onChange={(e) =>
                    field.onChange({
                      startDate: resetToMidnight(DateToIso(e.from)),
                      endDate: resetToMidnight(DateToIso(e.to)),
                    })
                  }
                  range
                  position="center"
                  inputClass={`${styles.input}`}
                  inputAttributes={{
                    onBlur: () => setFocusedInput(null),
                    onFocus: () => setFocusedInput("date"),
                  }}
                  className={`${styles.calendar}`}
                />
              </>
            );
          }}
        />
      </div> */}
      <button type="submit" className={styles.button}>
        جستجو
      </button>
    </form>
  );
};

export default SearchTicket;
