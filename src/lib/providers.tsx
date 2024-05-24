'use client'

import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { WagmiProvider } from 'wagmi'

import StyledComponentsRegistry from '@/lib/sc-registry'
import { wagmiConfig } from '@/lib/web3'

const queryClient = new QueryClient()

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <StyledComponentsRegistry>
          <ThemeProvider theme={lightTheme}>
            <ThorinGlobalStyles />
            <RainbowKitProvider>{children}</RainbowKitProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
