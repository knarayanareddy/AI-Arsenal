/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        page: 'var(--page)',
        surface: 'var(--surface)',
        field: 'var(--field)',
        inset: 'var(--inset)',
        hover: 'var(--hover)',
        line: 'var(--line)',
        'line-soft': 'var(--line-soft)',
        'line-strong': 'var(--line-strong)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        'accent-solid': 'var(--accent-solid)',
        'accent-tint': 'var(--accent-tint)',
        'accent-ink': 'var(--accent-ink)',
      },
      borderRadius: {
        control: '8px',
        card: '10px',
      },
      fontSize: {
        micro: ['11px', '14px'],
        caption: ['12px', '16px'],
        body: ['13px', '18px'],
        headline: ['15px', '22px'],
      },
      fontFamily: {
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['"Funnel Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Funnel Display"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        hairline: '0 0 0 1px var(--line)',
        elevation: '0 4px 20px -2px rgba(0, 0, 0, 0.25)',
        glow: '0 0 20px -4px var(--accent-solid)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
