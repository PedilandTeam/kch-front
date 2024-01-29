module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                PinarLT: 'Pinar-LT',
            },
            colors: {
                blue: {
                    100: '#d2d8f2',
                    300: '#a4b0e4',
                    300: '#7788d6',
                    700: '#4a61c9',
                    900: '#1c39bb',
                },
                yellow: {
                    100: '#f6eed9',
                    300: '#efdcb1',
                    300: '#e8cd8a',
                    700: '#e0bb63',
                    900: '#d8aa3b',
                },
            },
        },
    },
    daisyui: {
        themes: [
            {
                koochaa: {
                    primary: '#1c39bb',
                    secondary: '#d8aa3c',
                    accent: '#1dcdbc',
                    neutral: '#2b3440',
                    'base-100': '#ffffff',
                    info: '#3abff8',
                    success: '#36d399',
                    warning: '#fbbd23',
                    error: '#f87272',
                },
            },
        ],
        rtl: true,
    },
    important: true,
    plugins: [require('daisyui')],
};
