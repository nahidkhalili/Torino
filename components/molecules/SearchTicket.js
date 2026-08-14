"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { DateToIso, flattenObject } from "../../utils/helper";
import { DatePicker } from "zaman";
import Image from "next/image";
import { useSearchTour } from "../../services/queries";
import { useRouter } from "next/navigation";
import useQuery from "../../utils/query";
import { Controller, useForm } from "react-hook-form";
import QueryString from "qs";
import styles from "./SearchTicket.module.css";
import { resetToMidnight } from "../../utils/resetToMidnight";

const noIndicatorSpread = () => null;
const noDropdownIndicator = () => null;

const SearchTicket = ({ destinationCities, originCities }) => {
  const [query, setQuery] = useState("");

  const router = useRouter();
  const { getQuery } = useQuery();

  const { data, isPending, refetch } = useSearchTour(query);

  const { handleSubmit, control, reset } = useForm();

  const [focusedInput, setFocusedInput] = useState(null);

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
            const showLabel = !!field.value || focusedInput === "origin";
            return (
              <>
                <span
                  className={`${styles.labelStyle} ${showLabel ? styles.active : ""}`}
                >
                  مبدا
                </span>

                <Select
                  {...field}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "none",
                      boxShadow: "none",
                      width: "130px",
                      height: "40px",
                      color: "black",
                      cursor: "pointer",
                    }),

                    menu: (base) => ({
                      ...base,
                      width: "230px",
                      position: "absolute",
                      right: "-52px",
                    }),
                  }}
                  options={originCities}
                  placeholder=""
                  components={{
                    DropdownIndicator: noDropdownIndicator,
                    IndicatorSeparator: noIndicatorSpread,
                  }}
                  onChange={(selectedOption) =>
                    field.onChange(selectedOption ? selectedOption.value : null)
                  }
                  value={
                    originCities.find(
                      (option) => option.value === field.value,
                    ) || null
                  }
                  onFocus={() => setFocusedInput("origin")}
                  onBlur={() => {
                    field.onBlur();
                    setFocusedInput(null);
                  }}
                  closeMenuOnScroll={(e) => {
                    return true;
                  }}
                />
              </>
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
            const showLabel = !!field.value || focusedInput === "destination";
            return (
              <>
                <span
                  className={`${styles.labelStyle} ${showLabel ? styles.active : ""}`}
                >
                  مقصد
                </span>

                <Select
                  {...field}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "none",
                      boxShadow: "none",
                      width: "130px",
                      height: "40px",
                      color: "black",
                      cursor: "pointer",
                    }),

                    menu: (base) => ({
                      ...base,
                      width: "230px",
                      position: "absolute",
                      right: "-52px",
                    }),
                  }}
                  options={destinationCities}
                  placeholder=""
                  components={{
                    DropdownIndicator: noDropdownIndicator,
                    IndicatorSeparator: noIndicatorSpread,
                  }}
                  onChange={(selectedOption) =>
                    field.onChange(selectedOption ? selectedOption.value : null)
                  }
                  value={
                    destinationCities.find(
                      (option) => option.value === field.value,
                    ) || null
                  }
                  onFocus={() => setFocusedInput("destination")}
                  onBlur={() => {
                    field.onBlur();
                    setFocusedInput(null);
                  }}
                  closeMenuOnScroll={(e) => {
                    return true;
                  }}
                />
              </>
            );
          }}
        />
      </div>
      <div className={styles.dateContainer}>
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
      </div>
      <button type="submit" className={styles.button}>
        جستجو
      </button>
    </form>
  );
};

export default SearchTicket;
