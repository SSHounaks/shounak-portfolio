import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Inter, Sora } from 'next/font/google'
import { baseMetadata, jsonLdPerson } from '@/lib/metadata'
import { JsonLd } from '@/components/json-ld'

// Initialize fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const sora = Sora({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-sora' })

export const metadata: Metadata = {
  ...baseMetadata(),
  title: 'Shounak Bhalerao | Portfolio',
  description: 'Full Stack Developer & Cybersecurity Expert — 5.5 years designing and shipping production-grade systems at scale.',
  generator: 'opencode.ai',
  icons: {
    icon: '/gits_ico.png',
    apple: '/gits_ico.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background" style={{ colorScheme: 'dark' }}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${sora.variable} bg-background text-on-background font-body-md overflow-x-hidden selection:bg-primary selection:text-on-primary min-h-screen`}>
        <JsonLd data={jsonLdPerson()} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
