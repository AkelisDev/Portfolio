/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ink: "#050506",
                surface: "#0b0d10",
                line: "#1c2128",
                accent: {
                    DEFAULT: "#22d3ee",
                    dim: "#0e7490",
                },
                signal: "#f59e0b",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            backgroundImage: {
                blueprint:
                    "linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px)",
            },
            backgroundSize: {
                grid: "44px 44px",
            },
        },
    },
    plugins: [],
}