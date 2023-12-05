import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import './globals.scss'

const inter = Rubik({
  weight: ["400", "500", "700"],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Interactive Comments Section',
  description: 'Interactive Comments Section',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
