import { ref } from 'vue'
import { defineStore } from 'pinia'
import { favoriteService } from '@/services/favoriteService'
import type { Favorite } from '@/types'

function toMessage(e: unknown): string {
  return e instanceof Error ? e.message : 'Something went wrong'
}

export const useFavoritesStore = defineStore('favorites', () => {
  const items = ref<Favorite[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchMine(userId: number) {
    loading.value = true
    error.value = null
    try {
      items.value = await favoriteService.getByUser(userId)
    } catch (e) {
      error.value = toMessage(e)
    } finally {
      loading.value = false
    }
  }

  function findByListing(listingId: number): Favorite | undefined {
    return items.value.find((f) => f.listingId === listingId)
  }

  async function add(userId: number, listingId: number) {
    error.value = null
    if (findByListing(listingId)) return
    try {
      const created = await favoriteService.add(userId, listingId)
      items.value.push(created)
    } catch (e) {
      error.value = toMessage(e)
    }
  }

  async function remove(id: number) {
    error.value = null
    try {
      await favoriteService.remove(id)
      items.value = items.value.filter((f) => f.id !== id)
    } catch (e) {
      error.value = toMessage(e)
    }
  }

  async function toggle(userId: number, listingId: number) {
    const existing = findByListing(listingId)
    if (existing) await remove(existing.id)
    else await add(userId, listingId)
  }

  return { items, loading, error, fetchMine, findByListing, add, remove, toggle }
})
