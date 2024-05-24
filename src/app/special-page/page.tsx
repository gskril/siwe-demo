import { isAuthed } from '../api/auth/route'

export default async function SpecialPage() {
  const { isValid, address } = await isAuthed('localhost')

  if (isValid) {
    return <p>Signed in as {address}</p>
  }

  return <p>Not signed in</p>
}
