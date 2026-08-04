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

  useEffect(() => {
    console.log("hi", originCities);
    const originId = getQuery("originId");
    const destinationId = getQuery("destinationId");
    if (originId && destinationId) reset({ originId, destinationId });
    console.log({ originId, destinationId });
  }, []);

  console.log("data:", data);

  const onSubmit = (form) => {
    console.log("first", form);

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
          render={({ field }) => (
            <Select
              {...field}
              styles={{
                control: (provided) => ({
                  ...provided,
                  border: "none",
                  boxShadow: "none",
                  width: "129px",
                  height: "40px",
                  cursor: "pointer",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "black",
                }),
                menu: (base) => ({
                  ...base,
                  width: "230px",
                  position: "absolute",
                  right: "-52px",
                }),
              }}
              options={originCities}
              placeholder="مبدا"
              components={{
                DropdownIndicator: noDropdownIndicator,
                IndicatorSeparator: noIndicatorSpread,
              }}
              onChange={(selectedOption) =>
                field.onChange(selectedOption ? selectedOption.value : null)
              }
              value={
                originCities.find((option) => option.value === field.value) ||
                null
              }
              closeMenuOnScroll={(e) => {
                return true;
              }}
            />
          )}
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
          render={({ field }) => (
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
                placeholder: (provided) => ({
                  ...provided,
                  color: "black",
                }),
                menu: (base) => ({
                  ...base,
                  width: "230px",
                  position: "absolute",
                  right: "-52px",
                }),
              }}
              options={destinationCities}
              placeholder="مقصد"
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
              closeMenuOnScroll={(e) => {
                return true;
              }}
            />
          )}
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
          render={({ field: { onChange } }) => (
            <DatePicker
              round="x2"
              accentColor="#28A745"
              onChange={(e) =>
                onChange({
                  startDate: resetToMidnight(DateToIso(e.from)),
                  endDate: resetToMidnight(DateToIso(e.to)),
                })
              }
              range
              inputClass={`${styles.input}`}
              inputAttributes={{
                placeholder: "تاریخ",
              }}
              className={`${styles.calendar}`}
            />
          )}
        />
      </div>
      <button type="submit" className={styles.button}>
        جستجو
      </button>
    </form>
  );
};

export default SearchTicket;
