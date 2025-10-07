/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^react",
    "<THIRD_PARTY_MODULES>",
    "^(@/auth0|@/components|@/app|@/lib|@/icons|@/i18n|@/mocks|@/hooks|@/features|@/services)(/.*)$",
    "@/types",
    "^[.]",
  ],
  tailwindStylesheet: "./src/app/globals.css",
  tailwindFunctions: ["clsx", "cn", "cva"],
};

export default config;
