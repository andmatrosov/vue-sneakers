<template>
  <header
    class="flex flex-col lg:flex-row justify-between items-center border-b border-slate-300 px-11 py-8 pt-4"
  >
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/img/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-500">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>
    <ul class="flex items-center gap-10">
      <li
        class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black"
        @click="() => emit('openDrawer')"
      >
        <img src="/svg/cart.svg" alt="Cart" />
        <span>{{ totalPrice }} руб.</span>
      </li>
      <li>
        <router-link
          to="/favorites"
          class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black"
        >
          <img src="/svg/favorite.svg" alt="Favorites" />
          <span>Закладки</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/profile"
          class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black"
        >
          <img src="/svg/user.svg" alt="Profile" />
          <span>Профиль</span>
        </router-link>
      </li>
    </ul>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
const emit = defineEmits(['openDrawer'])
defineProps({
  totalPrice: Number
})
</script>
