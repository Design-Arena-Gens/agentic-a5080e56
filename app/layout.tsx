import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Morrie's Wig Shop - Groovy Wigs Since the 70s",
  description: "Far out wigs and accessories",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
