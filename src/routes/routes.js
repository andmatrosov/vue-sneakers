import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import FavoritesView from '@/pages/FavoritesView.vue'
import ProfileView from '../pages/ProfileView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/favorites', name: 'Favorites', component: FavoritesView },
  { path: '/profile', name: 'Profile', component: ProfileView }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  base: '/vue-sneakers',
  routes
})
