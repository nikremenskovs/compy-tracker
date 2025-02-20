/** Color mode type */
export type ColorMode = "dark" | "light";

/** Templated email type */
export type EmailTemplate = (...args: any[]) => {
  subject: string;
  body: string;
};

/** Toast notification type */
export type Toast = "error" | "success";
