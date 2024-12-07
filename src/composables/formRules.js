export const nameRules = [
  (value) => !!value || "This field is required.",
  (value) =>
    (value && value.length >= 3) || "Name must be at least 3 characters long.",
];

export const emailRules = [
  (value) => !!value || "This field is required.",
  (value) => {
    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
    return (
      (value && emailRegex.test(value)) ||
      "Email must be in the format a.b@c.d or a@b.c"
    );
  },
];

export const passwordRules = [
  (value) => !!value || "This field is required.",
  (value) =>
    (value && value.length >= 9) ||
    "Password must be at least 9 characters long.",
  (value) =>
    (value && /[A-Z]/.test(value)) ||
    "Password must contain at least one uppercase letter.",
  (value) =>
    (value && /\d/.test(value)) || "Password must contain at least one number.",
  (value) => (value && !/\s/.test(value)) || "Password cannot contain spaces.",
];

export const validateRuleSet = (value, ruleSet) => {
  for (let rule of ruleSet) {
    if (rule(value) != true) {
      return false;
    }
  }
  return true;
};
