<script setup>
import { ref, watch, provide, computed, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import axios from 'axios'
import Header from './components/Header.vue'
import HomeView from './pages/HomeView.vue'
import Drawer from './components/Drawer.vue'

/* Корзина (START) */
const cartItems = ref([]),
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

const addToCart = (item) => {
  if (!cartItems.value.includes(item)) {
    cartItems.value.push(item)
    item.isAdded = true
  }
}

const removeFromCart = (item) => {
  cartItems.value.splice(cartItems.value.indexOf(item), 1)
  item.isAdded = false
  console.log(item)
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://64463e36842f32ae.mokky.dev/orders', {
      items: cartItems.value,
      totalPrice: totalPrice.value
    })

    cartItems.value = []

    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}

onMounted(() => {
  const localCart = localStorage.getItem('cartItems')
  if (localCart) {
    cartItems.value = JSON.parse(localCart)
  }
})

watch(
  cartItems,
  () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
  },
  { deep: true }
)

provide('cart', {
  cartItems,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})
/* Корзина (END) */
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
      <!-- <router-view></router-view> -->
      <HomeView />
    </div>
  </div>
</template>

<style scoped></style>
