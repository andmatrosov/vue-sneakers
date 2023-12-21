<script setup>
import Header from './DrawerHead.vue'
import CartList from './CartList.vue'
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <div class="flex flex-col h-full">
      <div class="flex items-center gap-5 mb-5">
        <Header />
      </div>
      <CartList />

      <div class="flex flex-col gap-1 mt-7">
        <div class="flex gap-2">
          <span>Итого</span>
          <div class="flex-1 border-b border-dashed mb-1"></div>
          <b>12 999 руб</b>
        </div>
        <div class="flex gap-2">
          <span>Налог 5%</span>
          <div class="flex-1 border-b border-dashed mb-1"></div>
          <b>12 999 руб</b>
        </div>

        <button
          disabled
          class="bg-lime-500 w-full mt-7 rounded-xl py-3 font-bold text-white hover:bg-lime-600 active:bg-lime-700 cursor-pointer transition disabled:bg-slate-300 disabled:cursor-auto"
          type="button"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>
