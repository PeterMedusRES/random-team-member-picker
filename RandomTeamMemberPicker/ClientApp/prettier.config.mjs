/** @type {import("prettier").Config & import("prettier-plugin-tailwindcss").options} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx", "cn", "cva"],
};

export default config;
