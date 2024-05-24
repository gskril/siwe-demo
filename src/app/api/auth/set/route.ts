import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { createClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { parseSiweMessage, verifySiweMessage } from 'viem/siwe'

export async function POST(
  req: NextRequest
): Promise<NextResponse<{ ok: boolean }>> {
  try {
    const { message, signature } = await req.json()
    const client = createClient({ chain: mainnet, transport: http() })
    const isValid = await verifySiweMessage(client, { message, signature })

    if (!isValid) {
      return NextResponse.json({ ok: false }, { status: 500 })
    }

    const { expirationTime } = parseSiweMessage(message)
    cookies().set('siwe', JSON.stringify({ message, signature }), {
      expires: expirationTime?.getTime(),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
}
