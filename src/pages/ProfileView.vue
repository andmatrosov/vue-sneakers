<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import CardList from '../components/CardList.vue'
import InfoBlock from '../components/InfoBlock.vue'

const orders = ref([])

defineProps({
  isHome: Boolean
})

const router = useRouter()

onMounted(async () => {
  const { data } = await axios.get('https://64463e36842f32ae.mokky.dev/orders')
  orders.value = data
})
</script>

<template>
  <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:mb-8">
    <h2 class="text-3xl font-bold mb-4 lg:mb-0">Мои заказы</h2>
  </div>
  <div v-if="orders.length > 0" class="flex flex-col-reverse">
    <div v-for="order in orders" :key="order.id" class="mb-8">
      <div>
        <div
          class="flex justify-start gap-4 items-center mb-4 border-b border-solid border-slate-200"
        >
          <h3 class="font-bold text-xl">Заказ #{{ order.id }}</h3>
          <p class="font-medium text-xl text-slate-500">
            {{ order.items.reduce((acc, item) => acc + item.price, 0).toLocaleString('ru-RU') }}
            руб.
          </p>
        </div>
        <CardList :items="order.items" is-profile-view />
      </div>
    </div>
  </div>
  <div v-else class="">
    <InfoBlock
      v-if="!isHome"
      title="Заказов пока нет :("
      description="Вы ещё ничего не заказывали"
      imageURL="img/emoji-poor.png"
      :btnAction="() => router.go(-1)"
    />
  </div>
</template>
