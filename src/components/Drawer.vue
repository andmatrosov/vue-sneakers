<script setup>
import Header from './DrawerHead.vue'
import CartList from './CartList.vue'
import InfoBlock from './InfoBlock.vue'
import { inject } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
  isLoading: Boolean
})

const { closeDrawer } = inject('cart')
const emit = defineEmits(['createOrder'])
</script>

<template>
  <div
    @click="() => closeDrawer()"
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
  ></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <div class="flex flex-col h-full">
      <div class="flex items-center gap-5 mb-5">
        <Header />
      </div>

      <div v-if="!totalPrice" class="flex flex-col h-full justify-center items-center">
        <InfoBlock
          title="Ваша корзина пуста"
          description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
          imageURL="./svg/empty-cart.svg"
          :btnAction="closeDrawer"
        />
      </div>

      <CartList />

      <div v-if="totalPrice" class="flex flex-col gap-1 mt-7">
        <div class="flex gap-2">
          <span>Итого</span>
          <div class="flex-1 border-b border-dashed mb-1"></div>
          <b>{{ totalPrice.toLocaleString('RU-ru') }} руб</b>
        </div>
        <div class="flex gap-2">
          <span>Налог 5%</span>
          <div class="flex-1 border-b border-dashed mb-1"></div>
          <b>{{ vatPrice.toLocaleString('RU-ru') }} руб</b>
        </div>

        <button
          @click="() => emit('createOrder')"
          :disabled="totalPrice && !isLoading ? false : true"
          class="bg-lime-500 w-full mt-7 rounded-xl py-3 font-bold text-white hover:bg-lime-600 active:bg-lime-700 cursor-pointer transition disabled:bg-slate-300 disabled:cursor-auto"
          type="button"
        >
          {{ isLoading ? 'Загрузка...' : 'Оформить заказ' }}
        </button>
      </div>
    </div>
  </div>
</template>
