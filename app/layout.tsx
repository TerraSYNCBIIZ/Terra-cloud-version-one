import './globals.css'
import { Inter } from 'next/font/google'

// Initialize fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'TERRA Cloud | Grounds Maintenance Automation Platform',
  description: 'A comprehensive platform for in-house grounds maintenance companies to manage their employees, technology, and properties in one unified interface.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
} 