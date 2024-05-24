'use client'

import { Button, Heading, Typography } from '@ensdomains/thorin'
import { createSiweMessage, generateSiweNonce } from 'viem/siwe'
import { useAccount, useSignMessage } from 'wagmi'

import { Container, Layout } from '@/components/templates'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const { data } = useAuth()
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const nonce = generateSiweNonce()
  const message = createSiweMessage({
    // @ts-expect-error: This message isn't used unless the address is defined
    address: address,
    chainId: 1,
    domain: 'localhost',
    nonce: nonce,
    uri: 'http://localhost:3000/',
    version: '1',
    expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  })

  return (
    <Layout>
      <header />

      <Container as="main" $variant="flexVerticalCenter" $width="large">
        <Heading level="1">Sign in with Ethereum</Heading>

        <Button
          width="52"
          disabled={!address}
          onClick={async () => {
            const signature = await signMessageAsync({ message })

            await fetch('/api/auth/set', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message, signature }),
            })
          }}
        >
          Sign-in
        </Button>

        <Button
          as="a"
          href="/special-page"
          size="small"
          width="52"
          colorStyle="blueSecondary"
        >
          Visit gated page
        </Button>
      </Container>

      <footer />
    </Layout>
  )
}
