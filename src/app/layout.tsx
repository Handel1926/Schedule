import './globals.css'
import type { Metadata } from 'next'
import Header from '@/component/header/header'



export const metadata: Metadata = {
  title: 'Schedule',
  description: 'Set reminder, add todos and save notes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
