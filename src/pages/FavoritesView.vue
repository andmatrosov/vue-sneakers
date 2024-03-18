<template>
  <div class="flex flex-col">
    <h2 class="text-3xl font-bold mb-8">Мои избранные</h2>
    <CardList
      :items="favorites"
      @add-to-favorite="onClickFavorites"
      @add-to-cart="onClickAddCart"
    />
  </div>
</template>

<script setup>
import axios from 'axios'
import { inject, onMounted, ref } from 'vue'

import CardList from '../components/CardList.vue'

const favorites = ref([])

const { addToFavorite, cartItems, addToCart, removeFromCart } = inject('cart')

const onClickAddCart = (item) => {
  if (!cartItems.value.includes(item) && !item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onClickFavorites = (item) => {
  addToFavorite(item)
  favorites.value = favorites.value.filter((favorite) => favorite.id !== item.id)
}

onMounted(async () => {
  try {
    const { data } = await axios.get('https://64463e36842f32ae.mokky.dev/favorites')
    favorites.value = data
  } catch (err) {
    console.log('Error favorites fetch: ', err)
  }
})
</script>
