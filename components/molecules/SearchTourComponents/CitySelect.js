"use client";
import { useState } from "react";
import Select from "react-select";

import styles from "./CitySelect.module.css";

const noIndicatorSpread = () => null;
const noDropdownIndicator = () => null;

const CitySelect = ({ field, city, label }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const showLabel = !!field.value || focusedInput === true;
  return (
    <div>
      <span
        className={`${styles.labelStyle} ${showLabel ? styles.active : ""}`}
      >
        {label}
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
        closeMenuOnScroll={(e) => {
          return true;
        }}
      />
    </div>
  );
};

export default CitySelect;
