// Import the daisyui plugin
import daisyui from 'daisyui';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [daisyui],
    daisyui: {
        themes: ['dark'], // Add this line to ensure dark mode is applied
    },
};
