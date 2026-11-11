<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useListingsStore } from '@/stores/listings'

const auth = useAuthStore()
const listings = useListingsStore()

function load() {
  if (auth.user) listings.fetchMine(auth.user.id)
}

onMounted(load)
</script>

<template>
  <main>
    <h1>My listings</h1>

    <p v-if="!auth.isLoggedIn">
      You need to <RouterLink to="/login">log in</RouterLink> to see your listings.
    </p>

    <p v-else-if="listings.loading">Loading your listings...</p>

    <div v-else-if="listings.error" role="alert">
      <p>Could not load your listings: {{ listings.error }}</p>
      <button type="button" @click="load">Retry</button>
    </div>

    <p v-else-if="listings.mine.length === 0">
      You have no listings yet. <RouterLink to="/listings/new">Create one</RouterLink>.
    </p>

    <ul v-else>
      <li v-for="l in listings.mine" :key="l.id">
        <RouterLink :to="{ name: 'listing-detail', params: { id: l.id } }">{{
          l.title
        }}</RouterLink>
        - ${{ l.price }} ({{ l.category?.name }}) [{{ l.status }}]
      </li>
    </ul>
  </main>
</template>
