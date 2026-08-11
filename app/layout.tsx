import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'EnLight – Learn Smarter',
  description: 'Your personalized learning platform to track courses, lessons, and progress.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FF4D2E',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="85%" cy="20%" r="48" fill="none" stroke="white" strokeWidth="1.5" />
              <circle cx="85%" cy="20%" r="30" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="85%" cy="20%" r="14" fill="none" stroke="white" strokeWidth="1" />
              <line x1="0" y1="75%" x2="100%" y2="75%" stroke="white" strokeWidth="0.75" />
              <line x1="0" y1="85%" x2="100%" y2="85%" stroke="white" strokeWidth="0.5" />
              <line x1="10%" y1="0" x2="10%" y2="100%" stroke="white" strokeWidth="0.5" />
              <line x1="20%" y1="0" x2="20%" y2="100%" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="relative">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
