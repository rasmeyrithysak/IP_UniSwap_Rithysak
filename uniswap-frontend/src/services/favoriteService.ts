import { request } from '@/services/api'
import type { Favorite } from '@/types'

export const favoriteService = {
  getByUser(userId: number): Promise<Favorite[]> {
    return request<Favorite[]>(`/favorites?userId=${userId}&_expand=listing`)
  },

  // Mock only: the real backend derives userId from the JWT and enforces a unique (userId, listingId).
  add(userId: number, listingId: number): Promise<Favorite> {
    return request<Favorite>('/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, listingId }),
    })
  },

  remove(id: number): Promise<unknown> {
    return request<unknown>(`/favorites/${id}`, { method: 'DELETE' })
  },
}
