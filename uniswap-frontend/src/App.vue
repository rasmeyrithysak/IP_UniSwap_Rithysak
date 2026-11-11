<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

async function onLogout() {
  auth.logout()
  await router.push({ name: 'home' })
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Browse</RouterLink>
      <RouterLink to="/listings/new">Sell</RouterLink>
      <RouterLink to="/my-listings">My listings</RouterLink>
      <RouterLink to="/favorites">Favourites</RouterLink>

      <template v-if="auth.isLoggedIn">
        <span>Hi, {{ auth.user?.name }}</span>
        <button type="button" @click="onLogout">Logout</button>
      </template>
      <template v-else>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </template>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
}
</style>
