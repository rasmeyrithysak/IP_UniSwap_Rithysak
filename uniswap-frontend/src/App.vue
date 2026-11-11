<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Browse</RouterLink>
      <RouterLink to="/listings/new">Sell</RouterLink>
      <RouterLink to="/my-listings">My listings</RouterLink>
      <RouterLink to="/favorites">Favourites</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
  padding: 1rem;
}
</style>
