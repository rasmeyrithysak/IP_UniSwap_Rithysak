import { request } from '@/services/api'
import type { User } from '@/types'

export const authService = {
  register(name: string, email: string): Promise<User> {
    return request<User>('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
  },

  // Mock only: looks the user up by email. The real NestJS backend will verify the password.
  async login(email: string): Promise<User> {
    const users = await request<User[]>(`/users?email=${encodeURIComponent(email)}`)
    const user = users[0]
    if (!user) throw new Error('Invalid email or password')
    return user
  },
}
