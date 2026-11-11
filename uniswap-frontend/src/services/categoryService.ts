import { request } from '@/services/api'
import type { Category } from '@/types'

export const categoryService = {
  getAll(): Promise<Category[]> {
    return request<Category[]>('/categories')
  },
}
