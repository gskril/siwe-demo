import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { Address, createClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { parseSiweMessage, verifySiweMessage } from 'viem/siwe'

export type AuthApiResponse =
  | { isValid: true; address: Address; error?: undefined }
  | { isValid: false; address?: undefined; error: string }

export async function GET(
  req: NextRequest
): Promise<NextResponse<AuthApiResponse>> {
  const res = await isAuthed(new URL(req.url).hostname)

  return NextResponse.json(res, { status: res.isValid ? 200 : 401 })
}

export async function isAuthed(domain: string): Promise<AuthApiResponse> {
  const siweCookie = cookies().get('siwe')?.value
  const client = createClient({ chain: mainnet, transport: http() })

  if (!siweCookie) {
    return { isValid: false, error: 'No siwe cookie' }
  }

  try {
    const { message, signature } = JSON.parse(siweCookie)
    const isValid = await verifySiweMessage(client, {
      message,
      signature,
      domain,
    })

    if (!isValid) {
      return { isValid: false, error: 'Invalid signature' }
    }

    return { isValid, address: parseSiweMessage(message).address! }
  } catch (error) {
    return { isValid: false, error: 'Invalid signature' }
  }
}
