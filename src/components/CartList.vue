<script setup>
import { inject } from 'vue'
import CartListItem from './CartListItem.vue'

const { cartItems, removeFromCart } = inject('cart')
</script>

<template>
  <div class="flex flex-col flex-1 gap-4 overflow-y-auto" v-auto-animate>
    <CartListItem
      v-for="item in cartItems"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :imageUrl="item.img"
      @on-click-remove="() => removeFromCart(item)"
    />
  </div>
</template>
