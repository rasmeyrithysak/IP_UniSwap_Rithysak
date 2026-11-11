<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useListingsStore } from '@/stores/listings'
import { useCategoriesStore } from '@/stores/categories'

const listings = useListingsStore()
const categories = useCategoriesStore()

// UI-only state: lives in the component, not the store
const categoryId = ref<number | undefined>(undefined)

function load() {
  listings.fetchAll(categoryId.value)
}

onMounted(() => {
  categories.fetchAll()
  load()
})
watch(categoryId, load)
</script>

<template>
  <main>
    <h1>Browse listings</h1>

    <label>
      Category
      <select v-model="categoryId">
        <option :value="undefined">All</option>
        <option v-for="c in categories.items" :key="c.id" :value="c.id">{{ c.name }}</option>
      </select>
    </label>

    <p v-if="listings.loading">Loading listings...</p>

    <div v-else-if="listings.error" role="alert">
      <p>Could not load listings: {{ listings.error }}</p>
      <button type="button" @click="load">Retry</button>
    </div>

    <p v-else-if="listings.items.length === 0">No listings found.</p>

    <ul v-else>
      <li v-for="l in listings.items" :key="l.id">
        <RouterLink :to="{ name: 'listing-detail', params: { id: l.id } }">{{
          l.title
        }}</RouterLink>
        - ${{ l.price }} ({{ l.category?.name }}) [{{ l.status }}]
      </li>
    </ul>
  </main>
</template>
