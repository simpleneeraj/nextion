import '@/styles/globals.css'
import PrivateLayout from '@/layout'
import NextUIApp from '@/providers/next'

export const metadata = {
	title: 'Next App',
	description:
		'A neat boilerplate for building Electron apps, with NextJS at the renderer and pre-configured with a bunch of handy development tools.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={'dark'}>
			<body>
				<NextUIApp>
					<PrivateLayout>{children}</PrivateLayout>
				</NextUIApp>
			</body>
		</html>
	)
}
