<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useFavoritesStore } from '@/stores/favorites'
import { useListingsStore } from '@/stores/listings'

const props = defineProps<{ id: string }>()
const store = useListingsStore()
const auth = useAuthStore()
const favorites = useFavoritesStore()

const isFavorite = computed(() => !!favorites.findByListing(Number(props.id)))

function load() {
  store.fetchOne(Number(props.id))
  if (auth.user) favorites.fetchMine(auth.user.id)
}

function onToggleFavorite() {
  if (auth.user) favorites.toggle(auth.user.id, Number(props.id))
}

onMounted(load)
watch(() => props.id, load)
</script>

<template>
  <main>
    <RouterLink to="/">&larr; Back to listings</RouterLink>

    <p v-if="store.loading">Loading listing...</p>

    <div v-else-if="store.error" role="alert">
      <p>Could not load this listing: {{ store.error }}</p>
      <button type="button" @click="load">Retry</button>
    </div>

    <article v-else-if="store.selected">
      <h1>{{ store.selected.title }}</h1>
      <p>{{ store.selected.description }}</p>
      <p>Price: ${{ store.selected.price }}</p>
      <p>Category: {{ store.selected.category?.name }}</p>
      <p>Seller: {{ store.selected.user?.name }}</p>
      <p>Status: {{ store.selected.status }}</p>

      <button v-if="auth.isLoggedIn" type="button" @click="onToggleFavorite">
        {{ isFavorite ? 'Remove from favourites' : 'Add to favourites' }}
      </button>
      <p v-else><RouterLink to="/login">Log in</RouterLink> to save this listing.</p>

      <p v-if="favorites.error" role="alert">{{ favorites.error }}</p>
    </article>
  </main>
</template>
