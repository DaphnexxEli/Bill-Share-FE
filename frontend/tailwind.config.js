module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    plugins: [require('daisyui')],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            'white': '#ffffff',
            'Emerald': '#059669',
            'Green': '#86efac',
            'Amber': '#fef3c7',
            'Emerald2': '#022c22',
            'Nature': '#d4d4d4',
            'Stone': '#0c0a09',
            'base': '#FAEDCD',
            'semiblack': '#6b7280'
        },
        screens: {
            // 'tablet': '1024px'
        },

        fontFamily: {
            'sans': ['ui-sans-serif', 'system-ui'],
            'serif': ['ui-serif', 'Georgia'],
            'mono': ['ui-monospace', 'SFMono-Regular'],


        }
    }

};