<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { isEmail } from '@/utils/validators'

type Field = 'email' | 'password'

const router = useRouter()
const auth = useAuthStore()
const form = reactive<Record<Field, string>>({ email: '', password: '' })
const errors = reactive<Record<Field, string>>({ email: '', password: '' })
const submitting = ref(false)
const submitError = ref<string | null>(null)

function validate(): boolean {
  errors.email = isEmail(form.email.trim()) ? '' : 'Enter a valid email address'
  errors.password = form.password ? '' : 'Password is required'
  return Object.values(errors).every((m) => m === '')
}

async function onSubmit() {
  submitError.value = null
  if (!validate()) return
  submitting.value = true
  try {
    await auth.login(form.email.trim())
    await router.push({ name: 'home' })
  } catch (e) {
    submitError.value = e instanceof Error ? e.message : 'Login failed'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main>
    <h1>Login</h1>

    <form novalidate @submit.prevent="onSubmit">
      <div>
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" :aria-invalid="!!errors.email" />
        <p v-if="errors.email" role="alert">{{ errors.email }}</p>
      </div>

      <div>
        <label for="password">Password</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          :aria-invalid="!!errors.password"
        />
        <p v-if="errors.password" role="alert">{{ errors.password }}</p>
      </div>

      <p v-if="submitError" role="alert">{{ submitError }}</p>

      <button type="submit" :disabled="submitting">
        {{ submitting ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </main>
</template>
