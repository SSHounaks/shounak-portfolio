import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Inter, JetBrains_Mono, Sora } from 'next/font/google'
import { baseMetadata, jsonLdPerson } from '@/lib/metadata'
import { JsonLd } from '@/components/json-ld'

// Initialize fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const sora = Sora({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-sora' })
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

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
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} dark bg-background`}
      style={{ colorScheme: 'dark' }}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-on-background font-body-md overflow-x-hidden selection:bg-primary selection:text-on-primary min-h-screen">
        <JsonLd data={jsonLdPerson()} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
