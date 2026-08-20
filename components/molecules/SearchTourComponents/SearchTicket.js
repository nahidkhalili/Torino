"use client";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Image from "next/image";
import QueryString from "qs";

import { flattenObject } from "../../../utils/helper";
import useQuery from "../../../utils/query";

import styles from "./SearchTicket.module.css";
import CitySelect from "./CitySelect";
import DateSelect from "./DateSelect";

const SearchTicket = ({ destinationCities, originCities }) => {
  const router = useRouter();
  const { getQuery } = useQuery();

  const { handleSubmit, control, reset } = useForm();

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
          render={({ field }) => (
            <CitySelect field={field} city={originCities} label="مبدا" />
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
          render={({ field }) => {
            return (
              <CitySelect field={field} city={destinationCities} label="مقصد" />
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
          render={({ field }) => <DateSelect field={field} />}
        />
      </div>
      <button type="submit" className={styles.button}>
        جستجو
      </button>
    </form>
  );
};

export default SearchTicket;
