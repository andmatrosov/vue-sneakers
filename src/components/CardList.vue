<script setup>
import Card from './Card.vue'

defineProps({
  items: Array
})

const onCLickAdd = () => {
  console.log('Добавлен в корзину')
}

const onCLickFavorite = () => {
  console.log('Добавлен в избранное')
}
</script>

<template>
  <div
    v-if="items.length"
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xs:grid-cols-4 gap-10"
  >
    <Card
      v-for="item in items"
      :key="item.id"
      :image-url="item.img"
      :title="item.title"
      :price="item.price"
      :onClickAdd="onCLickAdd"
      :onClickFavorite="onCLickFavorite"
    />
  </div>
  <div v-else class="flex items-center justify-center">
    <p class="mt-20 text-gray-500">По вашему запросу ничего не найдено</p>
  </div>
</template>
