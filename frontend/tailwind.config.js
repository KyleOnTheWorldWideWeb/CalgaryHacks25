module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@headlessui/react/**/*.js", // ✅ Ensure Headless UI is scanned
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
