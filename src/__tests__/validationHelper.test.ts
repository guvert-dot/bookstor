import {
  isValidEmail,
  isValidPrice,
  isValidTitle,
} from "../helpers/validationHelper";

describe("Validation Helper", () => {
  test("should validate email correctly", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("invalid-email")).toBe(false);
  });

  test("should validate price correctly", () => {
    expect(isValidPrice(10)).toBe(true);
    expect(isValidPrice(-5)).toBe(false);
  });

  test("should validate title correctly", () => {
    expect(isValidTitle("Book Title")).toBe(true);
    expect(isValidTitle("AB")).toBe(false);
  });
});
