type ValidationRule = (v: string) => boolean | string;

export const validationRules: Record<string, ValidationRule[]> = {
  requiredRule: [(v) => !!v || "Required field"],
  minTwoRule: [(v) => !v || v?.length >= 2 || "Minimum length is 2 characters"],
  maxTwentyRule: [(v) => v?.length <= 20 || "Maximum length is 20 characters"],
  hasSpaceRule: [(v) => (!!v && /\s/.test(v)) || "Please enter your full name"],
  noSpecialCharactersRule: [
    (v) =>
      !v ||
      (/^(?!.*\.\s)(?!.*\s\s)[a-zA-Z0-9\s]*$/.test(v) && !v.includes(".")) ||
      "Special characters are not allowed",
  ],
};
