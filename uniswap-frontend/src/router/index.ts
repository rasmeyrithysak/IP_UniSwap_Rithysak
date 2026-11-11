import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
    {
      path: '/listings/new',
      name: 'listing-create',
      component: () => import('@/views/CreateListingView.vue'),
    },
    {
      path: '/listings/:id',
      name: 'listing-detail',
      component: () => import('@/views/ListingDetailView.vue'),
      props: true,
    },
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
    { path: '/register', name: 'register', component: () => import('@/views/RegisterView.vue') },
    {
      path: '/my-listings',
      name: 'my-listings',
      component: () => import('@/views/MyListingsView.vue'),
    },
    { path: '/favorites', name: 'favorites', component: () => import('@/views/FavoritesView.vue') },
  ],
})

export default router
