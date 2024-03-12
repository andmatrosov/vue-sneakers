<script setup>
import { onMounted, reactive, ref, watch, provide, computed } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const items = ref([]),
  cartItems = ref([]),
  isDrawerOpen = ref(false),
  isCreatingOrder = ref(false),
  totalPrice = computed(() => cartItems.value.reduce((acc, item) => acc + item.price, 0)),
  vatPrice = computed(() => Math.round(totalPrice.value * 0.05))
const closeDrawer = () => {
  isDrawerOpen.value = false
}

const openDrawer = () => {
  isDrawerOpen.value = true
}

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const addToCart = (item) => {
  cartItems.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cartItems.value.splice(cartItems.value.indexOf(item), 1)
  item.isAdded = false
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://64463e36842f32ae.mokky.dev/orders', {
      items: cartItems.value,
      totalPrice: totalPrice.value
    })

    cartItems.value = []
    isCreatingOrder.value = false

    return data
  } catch (err) {
    console.log(err)
  }
}

const onClickAddCart = (item) => {
  if (!cartItems.value.includes(item)) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeInput = (event) => {
  filters.searchQuery = event.target.value
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      item.isFavorite = true
      const { data } = await axios.post('https://64463e36842f32ae.mokky.dev/favorites', item)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://64463e36842f32ae.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.log('Error: ', err)
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

provide('cart', {
  cartItems,
  closeDrawer,
  openDrawer,
  onClickAddCart,
  removeFromCart
})

onMounted(async () => {
  await fetchItems()
  await fetchFavorutes()
})
watch(filters, fetchItems)
watch(cartItems, () => {
  items.value = items.value.map((item) => ({ ...item, isAdded: false }))
})
</script>

<template>
  <Drawer
    v-if="isDrawerOpen"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    :is-loading="isCreatingOrder"
    @create-order="createOrder"
  />

  <div class="bg-white w-4/5 min-h-screen m-auto rounded-xl shadow-xl my-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

        <div class="flex gap-4">
          <select @change="onChangeSelect" class="py-2 px-3 border rounded-md" name="" id="">
            <option value="title" checked>По названию</option>
            <option value="price">По цене(дешевые)</option>
            <option value="-price">По цене(дорогие)</option>
          </select>

          <div class="relative">
            <img src="/svg/search.svg" class="absolute top-3.5 left-3.5" alt="" />
            <input
              @input="onChangeInput"
              class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400"
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>
      </div>

      <div class="mt-4">
        <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddCart" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
