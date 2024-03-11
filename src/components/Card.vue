<script setup>
defineProps({
  id: Number,
  article: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function
})
</script>

<template>
  <div
    class="relative bg-white border border-slate-200 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 transition duration-150 ease-out hover:shadow-xl"
  >
    <button @click="onClickFavorite" class="absolute left-6 top-6">
      <img :src="isFavorite ? 'svg/heart-liked.svg' : 'svg/heart-unliked.svg'" alt="Liked" />
    </button>
    <img :src="imageUrl" alt="" />
    <p class="mt-2 mb-4">{{ title }}</p>

    <div class="flex justify-between">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{ price?.toLocaleString('RU-ru') }} руб.</b>
      </div>
      <button @click="onClickAdd">
        <img :src="isAdded ? 'svg/checked.svg' : 'svg/plus.svg'" alt="" />
      </button>
    </div>
  </div>
</template>
