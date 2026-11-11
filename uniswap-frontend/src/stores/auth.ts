import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { authService } from '@/services/authService'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => user.value !== null)

  async function login(email: string) {
    user.value = await authService.login(email)
  }

  function logout() {
    user.value = null
  }

  return { user, isLoggedIn, login, logout }
})
