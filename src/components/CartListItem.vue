<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number
})

const emit = defineEmits(['onClickRemove'])
</script>

<template>
  <div
    class="flex justify-between items-center gap-3 w-full border border-slate-100 p-4 rounded-xl"
  >
    <img class="w-16 h-16" :src="imageUrl" :alt="title" />

    <div class="flex flex-col flex-1">
      <p class="text-sm mb-1">{{ title }}</p>
      <div class="flex justify-between mt-2">
        <strong class="flex-1">{{ price.toLocaleString('RU-ru') }} руб.</strong>

        <button
          @click="emit('onClickRemove')"
          class="shrink-0 opacity-50 hover:opacity-100 cursor-pointer transition"
        >
          <img src="/svg/remove.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>
