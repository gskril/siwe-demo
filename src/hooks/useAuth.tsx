import { useQuery } from '@tanstack/react-query'

import { AuthApiResponse } from '@/app/api/auth/route'

export function useAuth() {
  return useQuery<AuthApiResponse>({
    queryKey: ['auth'],
    queryFn: async () => {
      const response = await fetch('/api/auth')
      return response.json()
    },
  })
}
