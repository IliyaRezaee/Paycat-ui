import { useState } from "react";
import { TransactionType, dateFormats } from "../types";
import moment from "moment";

function useLocalStorage() {
  const key = "transactions";
  const storage = window.localStorage.getItem(key);
  let initialValue: TransactionType[] =
    storage !== null ? JSON.parse(storage) : [];

  if (initialValue.length > 0) {
    // TODO: validate initialValue
    initialValue = initialValue.map((t) => {
      t.date = moment(t.date);
      return t;
    });
  }

  const setLocalStorage = (value: TransactionType[]): any => {
    const object = value.map((t: TransactionType) => {
      return {
        text: t.text,
        price: t.price,
        tag: t.tag,
        date: t.date.format(dateFormats.CALENDAR_INPUT),
      };
      // NOTE: dates must be saved with CALENDAR_INPUT format otherwise moment
      // considers it as an invalid date
    });

    window.localStorage.setItem(key, JSON.stringify(object));
  };

  return { initialValue, setLocalStorage };
}

export default useLocalStorage;
