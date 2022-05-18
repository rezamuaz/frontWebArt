module.exports = {
    tailwindConfig: "./styles/tailwind.config.js",
    mode: "jit",
    content: ["./pages/**/*.jsx", "./src/**/*.jsx"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                Lato: ["Lato", "OpenSans"],
            },
            colors: {
                cblue: "#4361EE",
                cviolet: "#F72585",
            },
        },
        variants: {
            // ...
            scrollbar: ["dark"],
        },
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        require("tailwind-scrollbar-hide"),
        require("@tailwindcss/typography"),
    ],
};
