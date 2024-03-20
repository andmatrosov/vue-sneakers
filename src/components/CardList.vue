<script setup>
import Card from './Card.vue'
import InfoBlock from './InfoBlock.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  items: Array,
  isProfileView: Boolean,
  isHome: Boolean
})
const emit = defineEmits(['addToFavorite', 'addToCart'])

const onClickFavorite = (item) => {
  emit('addToFavorite', item)
}

const onCLickAdd = (item) => {
  emit('addToCart', item)
}

const onCLickBack = () => {
  router.go(-1)
}
</script>

<template>
  <div
    v-if="items.length"
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
    v-auto-animate
  >
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :article="item.article"
      :image-url="item.img"
      :title="item.title"
      :price="item.price"
      :onClickAdd="isProfileView ? null : () => onCLickAdd(item)"
      :onClickFavorite="isProfileView ? null : () => onClickFavorite(item)"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </div>
  <div v-else class="flex items-center justify-center">
    <InfoBlock
      v-if="!isHome"
      title="Закладок нет :("
      description="Вы ещё ничего не добавляли в закладки"
      imageURL="img/emoji-sad.png"
      :btnAction="() => onCLickBack()"
    />
    <p v-else>По вашему запросу ничего не найдено</p>
  </div>
</template>
