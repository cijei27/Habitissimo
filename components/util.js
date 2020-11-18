import $ from "jquery";
import { isArray, isUndefined, isNull, isString } from "util";

/**
 * Comprueba si un valor es vacío
 * @param {string} value - cadena a comprobar
 * @return {boolean} - true/false
 */
let isValueEmpty = value => {
  if (isString(value) && $.trim(value) == "") {
    return true;
  }
  return false;
};
/**
 * Comprueba si un valor es nulo o undefined
 * @param value - valor a comprobar
 * @return {boolean} - true/false
 */
let isValueNullUndefined = value => {
  if (isUndefined(value) || isNull(value) || isNaN(value)) {
    return true;
  }
  if ($.trim(value) == "undefined") {
    return true;
  }
  return false;
};

export { isValueEmpty, isValueNullUndefined };
