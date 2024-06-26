import '@rainbow-me/rainbowkit/styles.css'
import { Metadata } from 'next'

import { ClientProviders } from '@/lib/providers'

export const metadata: Metadata = {
  title: 'ENS Frontend Template',
  description: 'Starter web app for web3 developers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100svh' }}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
