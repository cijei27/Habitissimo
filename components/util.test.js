import { isValueEmpty, isValueNullUndefined } from "./util.js";

test("probar que un valor es nulo", () => {
  let varExample = null;
  expect(isValueNullUndefined(varExample)).toBe(true);
});

test("probar que un valor es undefined", () => {
  let varExample = undefined;
  expect(isValueNullUndefined(varExample)).toBe(true);
});

test("probar que un valor es empty", () => {
  let varExample = "";
  expect(isValueEmpty(varExample)).toBe(true);
});

test("probar que funciona cuando tiene un valor", () => {
  let varExample = "2";
  expect(isValueEmpty(varExample)).toBe(false);
});
