"use client";
import { useState } from "react";
import Select from "react-select";

import styles from "./CitySelect.module.css";

const noIndicatorSpread = () => null;
const noDropdownIndicator = () => null;

const CitySelect = ({ field, city, label }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  // console.log("it is me:");
  // console.log(
  //   "field:",
  //   field.value,
  //   typeof field.value,
  //   "city value:",
  //   city[0]?.value,
  //   typeof city[0]?.value,
  // );
  const showLabel = !!field.value || focusedInput === true;
  return (
    <div>
      <span
        className={`${styles.labelStyle} ${showLabel ? styles.active : ""}`}
      >
        {label}
      </span>
      {/* You should know that {field} contains the items below
                   <Select
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                    /> */}
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
        options={city}
        placeholder=""
        components={{
          DropdownIndicator: noDropdownIndicator,
          IndicatorSeparator: noIndicatorSpread,
        }}
        onChange={(selectedOption) =>
          field.onChange(selectedOption ? selectedOption.value : null)
        }
        value={city.find((option) => option.value === field.value) || null}
        onFocus={() => setFocusedInput(true)}
        onBlur={() => {
          field.onBlur();
          setFocusedInput(false);
        }}
      />
    </div>
  );
};

export default CitySelect;
