<script setup>
import { reactive, watch, inject, ref, onMounted, provide } from 'vue'
import axios from 'axios'
import CardList from '../components/CardList.vue'

const { cartItems, addToCart, removeFromCart, addToFavorite } = inject('cart')

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeInput = (event) => {
  filters.searchQuery = event.target.value
}

const onClickAddCart = (item) => {
  if (!cartItems.value.includes(item) && !item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const fetchFavorutes = async () => {
  try {
    const { data: favorites } = await axios.get(`https://64463e36842f32ae.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.article === item.article)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (err) {
    console.log('Error: ', err)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://64463e36842f32ae.mokky.dev/items`, { params })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false
    }))
  } catch (err) {
    console.log('Error: ', err)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cartItems')
  cartItems.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorutes()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cartItems.value.some((cartItem) => cartItem.article === item.article)
  }))
})

watch(
  cartItems,
  () => {
    items.value = items.value.map((item) => ({
      ...item,
      isAdded: cartItems.value.some((cartItem) => cartItem.article === item.article)
    }))
  },
  { deep: true }
)

watch(filters, fetchItems)
</script>

<template>
  <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:mb-8">
    <h2 class="text-3xl font-bold mb-4 lg:mb-0">Все кроссовки</h2>

    <div class="flex gap-4 flex-col md:flex-row w-full md:w-auto">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md" name="" id="">
        <option value="title" checked>По названию</option>
        <option value="price">По цене(дешевые)</option>
        <option value="-price">По цене(дорогие)</option>
      </select>

      <div class="relative">
        <img src="/svg/search.svg" class="absolute top-3.5 left-3.5" alt="" />
        <input
          @input="onChangeInput"
          class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400 w-full"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>

  <div class="mt-4">
    <CardList
      :items="items"
      @add-to-favorite="addToFavorite"
      @add-to-cart="onClickAddCart"
      is-home
    />
  </div>
</template>
