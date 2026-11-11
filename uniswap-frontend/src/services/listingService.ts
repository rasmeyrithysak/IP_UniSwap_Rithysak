import { request } from '@/services/api'
import type { Listing } from '@/types'

const EXPAND = '_expand=category&_expand=user'

export interface NewListing {
  title: string
  description: string
  price: number
  categoryId: number
  userId: number
}

export const listingService = {
  getAll(categoryId?: number): Promise<Listing[]> {
    const filter = categoryId ? `&categoryId=${categoryId}` : ''
    return request<Listing[]>(`/listings?${EXPAND}${filter}`)
  },

  getById(id: number): Promise<Listing> {
    return request<Listing>(`/listings/${id}?${EXPAND}`)
  },

  getByUser(userId: number): Promise<Listing[]> {
    return request<Listing[]>(`/listings?${EXPAND}&userId=${userId}`)
  },

  // Mock only: the frontend sends userId. The real backend must derive the owner from the JWT.
  create(data: NewListing): Promise<Listing> {
    return request<Listing>('/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, status: 'AVAILABLE' }),
    })
  },
}
