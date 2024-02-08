/** @type {import('tailwindcss').Config} */
export default {
  mod: "jit",
  content: ["index.html", "src/main.ts"],
  theme: {
    extend: { brightness: ["hover"] },
  },
  plugins: [],
};
