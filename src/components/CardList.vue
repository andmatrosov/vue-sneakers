<script setup>
import Card from './Card.vue'

defineProps({
  items: Array
})
const emit = defineEmits(['addToFavorite', 'addToCart'])

const onClickFavorite = (item) => {
  emit('addToFavorite', item)
}

const onCLickAdd = (item) => {
  emit('addToCart', item)
}
</script>

<template>
  <div
    v-if="items.length"
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
  >
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :article="item.article"
      :image-url="item.img"
      :title="item.title"
      :price="item.price"
      :onClickAdd="() => onCLickAdd(item)"
      :onClickFavorite="() => onClickFavorite(item)"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </div>
  <div v-else class="flex items-center justify-center">
    <p class="mt-20 text-gray-500">По вашему запросу ничего не найдено</p>
  </div>
</template>
