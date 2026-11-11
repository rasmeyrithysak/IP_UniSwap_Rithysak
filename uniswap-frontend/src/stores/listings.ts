import { ref } from 'vue'
import { defineStore } from 'pinia'
import { listingService } from '@/services/listingService'
import type { Listing } from '@/types'

function toMessage(e: unknown): string {
  return e instanceof Error ? e.message : 'Something went wrong'
}

export const useListingsStore = defineStore('listings', () => {
  const items = ref<Listing[]>([])
  const selected = ref<Listing | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAll(categoryId?: number) {
    loading.value = true
    error.value = null
    try {
      items.value = await listingService.getAll(categoryId)
    } catch (e) {
      error.value = toMessage(e)
    } finally {
      loading.value = false
    }
  }

  async function fetchOne(id: number) {
    loading.value = true
    error.value = null
    selected.value = null
    try {
      selected.value = await listingService.getById(id)
    } catch (e) {
      error.value = toMessage(e)
    } finally {
      loading.value = false
    }
  }

  return { items, selected, loading, error, fetchAll, fetchOne }
})
