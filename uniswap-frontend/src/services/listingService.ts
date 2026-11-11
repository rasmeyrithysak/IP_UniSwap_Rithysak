import { request } from '@/services/api'
import type { Listing } from '@/types'

const EXPAND = '_expand=category&_expand=user'

export const listingService = {
  getAll(categoryId?: number): Promise<Listing[]> {
    const filter = categoryId ? `&categoryId=${categoryId}` : ''
    return request<Listing[]>(`/listings?${EXPAND}${filter}`)
  },

  getById(id: number): Promise<Listing> {
    return request<Listing>(`/listings/${id}?${EXPAND}`)
  },
}
