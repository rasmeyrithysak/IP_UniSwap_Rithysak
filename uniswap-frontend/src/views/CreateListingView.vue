<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCategoriesStore } from '@/stores/categories'
import { useListingsStore } from '@/stores/listings'

type Field = 'title' | 'description' | 'price' | 'categoryId'

const router = useRouter()
const auth = useAuthStore()
const categories = useCategoriesStore()
const listings = useListingsStore()

const form = reactive({ title: '', description: '', price: '', categoryId: '' })
const errors = reactive<Record<Field, string>>({
  title: '',
  description: '',
  price: '',
  categoryId: '',
})
const submitting = ref(false)
const submitError = ref<string | null>(null)

onMounted(() => categories.fetchAll())

function validate(): boolean {
  const price = Number(form.price)
  errors.title = form.title.trim().length >= 3 ? '' : 'Title must be at least 3 characters'
  errors.description =
    form.description.trim().length >= 10 ? '' : 'Description must be at least 10 characters'
  errors.price = form.price !== '' && price > 0 ? '' : 'Price must be greater than 0'
  errors.categoryId = form.categoryId ? '' : 'Choose a category'
  return Object.values(errors).every((m) => m === '')
}

async function onSubmit() {
  submitError.value = null
  if (!auth.user || !validate()) return
  submitting.value = true
  try {
    const created = await listings.create({
      title: form.title.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      categoryId: Number(form.categoryId),
      userId: auth.user.id,
    })
    await router.push({ name: 'listing-detail', params: { id: created.id } })
  } catch (e) {
    submitError.value = e instanceof Error ? e.message : 'Could not create listing'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main>
    <h1>Create listing</h1>

    <p v-if="!auth.isLoggedIn">
      You need to <RouterLink to="/login">log in</RouterLink> to sell an item.
    </p>

    <form v-else novalidate @submit.prevent="onSubmit">
      <div>
        <label for="title">Title</label>
        <input id="title" v-model="form.title" type="text" :aria-invalid="!!errors.title" />
        <p v-if="errors.title" role="alert">{{ errors.title }}</p>
      </div>

      <div>
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="4"
          :aria-invalid="!!errors.description"
        ></textarea>
        <p v-if="errors.description" role="alert">{{ errors.description }}</p>
      </div>

      <div>
        <label for="price">Price ($)</label>
        <input
          id="price"
          v-model="form.price"
          type="number"
          min="0"
          step="0.01"
          :aria-invalid="!!errors.price"
        />
        <p v-if="errors.price" role="alert">{{ errors.price }}</p>
      </div>

      <div>
        <label for="category">Category</label>
        <select id="category" v-model="form.categoryId" :aria-invalid="!!errors.categoryId">
          <option value="">Select a category</option>
          <option v-for="c in categories.items" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
        <p v-if="errors.categoryId" role="alert">{{ errors.categoryId }}</p>
      </div>

      <p v-if="submitError" role="alert">{{ submitError }}</p>

      <button type="submit" :disabled="submitting">
        {{ submitting ? 'Saving...' : 'Create listing' }}
      </button>
    </form>
  </main>
</template>
