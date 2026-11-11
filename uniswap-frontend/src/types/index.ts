export type ListingStatus = 'AVAILABLE' | 'SOLD'

export interface Category {
  id: number
  name: string
}

export interface User {
  id: number
  name: string
  email: string
}

export interface Listing {
  id: number
  title: string
  description: string
  price: number
  status: ListingStatus
  categoryId: number
  userId: number
  category?: Category
  user?: User
}
