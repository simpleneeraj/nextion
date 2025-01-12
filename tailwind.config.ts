import { nextui } from '@nextui-org/react'

export const content = [
	'./renderer/app/**/*.{js,ts,jsx,tsx,mdx}',
	'./renderer/src/**/*.{js,ts,jsx,tsx,mdx}',
	'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
]
export const theme = {
	extend: {},
}
export const darkMode = 'class'
export const plugins = [nextui()]
