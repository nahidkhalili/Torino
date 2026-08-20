"use client";

import { useState } from "react";
import { DateToIso } from "../../../utils/helper";
import { resetToMidnight } from "../../../utils/resetToMidnight";
import styles from "./DateSelect.module.css";
import { DatePicker } from "zaman";

const DateSelect = ({ field }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const showLabel = !!field.value || focusedInput === true;
  return (
    <div>
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
          onBlur: () => setFocusedInput(false),
          onFocus: () => setFocusedInput(true),
        }}
        className={`${styles.calendar}`}
      />
    </div>
  );
};

export default DateSelect;
