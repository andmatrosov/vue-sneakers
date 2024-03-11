<template>
  <header class="flex justify-between items-center border-b border-slate-300 px-11 py-8 pt-4">
    <div class="flex items-center gap-4">
      <img src="/img/logo.png" alt="Logo" class="w-10" />
      <div>
        <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
        <p class="text-slate-500">Магазин лучших кроссовок</p>
      </div>
    </div>
    <ul class="flex items-center gap-10">
      <li
        class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black"
        @click="() => emit('openDrawer')"
      >
        <img src="/svg/cart.svg" alt="Cart" />
        <span>1209 руб.</span>
      </li>
      <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
        <img src="/svg/favorite.svg" alt="Favorites" />
        <span>Закладки</span>
      </li>
      <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
        <img src="/svg/user.svg" alt="Profile" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>

<script setup>
const emit = defineEmits(['openDrawer'])
</script>
