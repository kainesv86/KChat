const colors = require("tailwindcss/colors");

module.exports = {
        content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
        theme: {
                extend: {
                        boxShadow: {
                                nier: "2px 2px 0px 1px rgba(146,142,125,1)",
                        },
                },
        },
        plugins: [],
};
