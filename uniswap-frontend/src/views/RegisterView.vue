<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService'
import { isEmail } from '@/utils/validators'

type Field = 'name' | 'email' | 'password' | 'confirm'

const router = useRouter()
const form = reactive<Record<Field, string>>({ name: '', email: '', password: '', confirm: '' })
const errors = reactive<Record<Field, string>>({ name: '', email: '', password: '', confirm: '' })
const submitting = ref(false)
const submitError = ref<string | null>(null)

function validate(): boolean {
  errors.name = form.name.trim().length >= 2 ? '' : 'Name must be at least 2 characters'
  errors.email = isEmail(form.email.trim()) ? '' : 'Enter a valid email address'
  errors.password = form.password.length >= 8 ? '' : 'Password must be at least 8 characters'
  errors.confirm = form.confirm === form.password ? '' : 'Passwords do not match'
  return Object.values(errors).every((m) => m === '')
}

async function onSubmit() {
  submitError.value = null
  if (!validate()) return
  submitting.value = true
  try {
    await authService.register(form.name.trim(), form.email.trim())
    await router.push({ name: 'login' })
  } catch (e) {
    submitError.value = e instanceof Error ? e.message : 'Registration failed'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main>
    <h1>Register</h1>

    <form novalidate @submit.prevent="onSubmit">
      <div>
        <label for="name">Name</label>
        <input id="name" v-model="form.name" type="text" :aria-invalid="!!errors.name" />
        <p v-if="errors.name" role="alert">{{ errors.name }}</p>
      </div>

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

      <div>
        <label for="confirm">Confirm password</label>
        <input
          id="confirm"
          v-model="form.confirm"
          type="password"
          :aria-invalid="!!errors.confirm"
        />
        <p v-if="errors.confirm" role="alert">{{ errors.confirm }}</p>
      </div>

      <p v-if="submitError" role="alert">{{ submitError }}</p>

      <button type="submit" :disabled="submitting">
        {{ submitting ? 'Creating account...' : 'Register' }}
      </button>
    </form>
  </main>
</template>
