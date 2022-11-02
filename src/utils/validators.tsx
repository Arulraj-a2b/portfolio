/* eslint-disable */

import { IsEmptyValueType } from "../package/PackageUtils/validatorsTypes";

export const isEmpty = (value: IsEmptyValueType): boolean =>
  value === undefined || value === null || value === "";

/**
 * Checks whether the string can be converted to Integer
 * @param value form value object
 * @param key value key that needs to be checked
 */
export const isNotNumber = (value: IsEmptyValueType) => {
  if (!isEmpty(value)) {
    const parsedValue = Number(value);
    return Number.isNaN(parsedValue);
  }
  return true;
};

/**
 * Validates All countries phone number
 * @param { string | number } value phone number
 */
export const isValidPhone = (value: string | number): boolean => {
  if (typeof value === "string" || typeof value === "number") {
    const result =
      value
        .toString()
        .match(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        ) !== null;
    return result && !value.toString().includes(".");
  }
  return false;
};

export const isValidEmail = (value: string) => {
  if (typeof value === "string") {
    return (
      value
        .trim()
        .match(
          /^([a-zA-Z0-9_+\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        ) !== null
    );
  }
  return false;
};
