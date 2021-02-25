module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                white: {
                    pale: '#FDFEFE',
                },
                green: {
                    brand: '#55AA17',
                    pale: '#F4FBF6',
                    disabled: '#A1C4AB',
                },
                blue: {
                    gray: '#6A808F',
                },
                gray: {
                    pale: '#F7F9F9',
                    primary: '#B1BCBF',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
