import { ref } from 'vue'
import { defineStore } from 'pinia'
import { categoryService } from '@/services/categoryService'
import type { Category } from '@/types'

export const useCategoriesStore = defineStore('categories', () => {
  const items = ref<Category[]>([])

  async function fetchAll() {
    try {
      items.value = await categoryService.getAll()
    } catch {
      items.value = []
    }
  }

  return { items, fetchAll }
})
