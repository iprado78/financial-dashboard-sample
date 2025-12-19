/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}', './routes/**/*.{ts,tsx}'],
	prefix: '',
	theme: {
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				success: {
					DEFAULT: '#10b981', // green-500
					light: '#d1fae5',   // green-100
					dark: '#065f46'     // green-800
				},
				error: {
					DEFAULT: '#ef4444', // red-500
					light: '#fee2e2',   // red-100
					dark: '#991b1b'     // red-800
				},
				warning: {
					DEFAULT: '#f59e0b', // amber-500
					light: '#fef3c7',   // amber-100
					dark: '#92400e'     // amber-800
				},
				info: {
					DEFAULT: '#3b82f6', // blue-500
					light: '#dbeafe',   // blue-100
					dark: '#1e40af'     // blue-800
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				DEFAULT: '0.375rem' // 6px - matches rounded-md, good for buttons
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				shine: {
					from: { backgroundPosition: '0 0' },
					to: { backgroundPosition: '-200% 0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				shine: 'shine 0.5s ease-out'
			}
		}
	},
	plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')]
}
