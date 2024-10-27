export const locales = ["en", "pl"] as const;
export type Locale = (typeof locales)[number];