module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        boxShadow: {
            DEFAULT: '0 0 20px rgba(0, 0, 0, 0.1)',
            'l-t-r': '0 -10px 35px rgba(0, 0, 0, 0.1)',
            'l-b-r': '0 10px 35px rgba(0, 0, 0, 0.1)',
        },
        extend: {
            screens: {
                'md-plus': '890px',
            },
            colors: {
                white: {
                    DEFAULT: '#FDFEFE',
                    pale: '#FDFEFE',
                },
                green: {
                    bright: '#8EC665',
                    PROJECT_NAME: '#55AA17',
                    pale: '#F4FBF6',
                    disabled: '#A1C4AB',
                    light: '#AAD48B',
                    washed: '#C4E1AF',
                },
                blue: {
                    gray: {
                        DEFAULT: '#6A808F',
                        medium: '#A4B6BA',
                    },
                    google: '#4285F4',
                    disabled: '#A1BEC4',
                    pale: '#F3FBFD',
                    dark: '#40595F',
                },
                gray: {
                    DEFAULT: '#B1BCBF',
                    pale: '#F7F9F9',
                    light: { DEFAULT: '#CBD5D8', outline: '#DFE4E6' },
                    dark: '#343A44',
                },
                red: {
                    error: { DEFAULT: '#FF613F', pale: '#FFC8BC' },
                },
                yellow: {
                    goldenrod: '#e6ffc6',
                },
            },
            fontSize: {
                15: ['15px', '23px'],
            },
        },
        keyframes: {
            'slide-up': {
                '0%': { transform: 'translateY(100%)' },
                '100%': { transform: 'translateY(0%)' },
            },
            'slide-up-fade-out': {
                '0%': { transform: 'translateY(100%)', opacity: '0%' },
                '70%': { opacity: '0%' },
                '100%': { transform: 'translateY(0%)', opacity: '100%' },
            },
            'ping-pong': {
                '0%': { right: '90%' },
                '100%': { right: '0%' },
            },
        },
        animation: {
            'slide-up': 'slide-up 2s ease-in-out',
            'slide-up-fade-out': 'slide-up-fade-out 1s ease-out',
            'ping-pong': 'ping-pong 3s infinite alternate linear',
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
