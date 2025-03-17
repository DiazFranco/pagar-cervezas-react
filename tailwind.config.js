const flowbite = require("flowbite-react/tailwind");

module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./node_modules/flowbite/**/*.{js,ts,jsx,tsx}", 
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
      flowbite.content(),
    ],
    theme: {
      extend: {},
    },
    plugins: [
        flowbite.plugin(),
    ],
  };
  