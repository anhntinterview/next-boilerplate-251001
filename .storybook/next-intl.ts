import en from "../src/message/en.json";

const messagesByLocale: Record<string, unknown> = { en, "fr-CA": en };

const nextIntl = {
  defaultLocale: "en",
  messagesByLocale,
};

export default nextIntl;
