const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['DINOT', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: '#FFCC00',
                dark: '#1E1E1E',
                twitter: '#00acee',
            },
        },
    },
    plugins: [],
};
