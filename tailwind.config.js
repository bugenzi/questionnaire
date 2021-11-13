module.exports = {
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: ['./src/**/*.{html,ts}'],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            boxShadow: {
                blue: '0 4px 14px 0 rgba(19, 51, 81, 0.39)',
            },
            colors: {
                fancyBlack: '#1f2937',
                snowWhite: '#f3f4f6',
            },
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [],
};
