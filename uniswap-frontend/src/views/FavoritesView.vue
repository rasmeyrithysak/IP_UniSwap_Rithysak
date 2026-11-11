<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useFavoritesStore } from '@/stores/favorites'

const auth = useAuthStore()
const favorites = useFavoritesStore()

function load() {
  if (auth.user) favorites.fetchMine(auth.user.id)
}

onMounted(load)
</script>

<template>
  <main>
    <h1>Favourites</h1>

    <p v-if="!auth.isLoggedIn">
      You need to <RouterLink to="/login">log in</RouterLink> to see your favourites.
    </p>

    <p v-else-if="favorites.loading">Loading favourites...</p>

    <div v-else-if="favorites.error" role="alert">
      <p>Could not load favourites: {{ favorites.error }}</p>
      <button type="button" @click="load">Retry</button>
    </div>

    <p v-else-if="favorites.items.length === 0">
      No favourites yet. <RouterLink to="/">Browse listings</RouterLink>.
    </p>

    <ul v-else>
      <li v-for="f in favorites.items" :key="f.id">
        <RouterLink :to="{ name: 'listing-detail', params: { id: f.listingId } }">
          {{ f.listing?.title }}
        </RouterLink>
        - ${{ f.listing?.price }} [{{ f.listing?.status }}]
        <button type="button" @click="favorites.remove(f.id)">Remove</button>
      </li>
    </ul>
  </main>
</template>
