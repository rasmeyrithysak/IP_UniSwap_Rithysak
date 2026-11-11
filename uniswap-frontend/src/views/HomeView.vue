<script setup lang="ts">
import { onMounted } from 'vue'
import { useListingsStore } from '@/stores/listings'

const store = useListingsStore()
onMounted(() => store.fetchAll())
</script>

<template>
  <main>
    <h1>Browse listings</h1>
    <ul>
      <li v-for="l in store.items" :key="l.id">
        {{ l.title }} - ${{ l.price }} ({{ l.category?.name }})
      </li>
    </ul>
  </main>
</template>
