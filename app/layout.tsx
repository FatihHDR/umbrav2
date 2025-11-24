import './globals.css'

export const metadata = {
	title: 'Umbrav2',
	description: 'Umbrav2 Next app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}