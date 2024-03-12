<script setup>
defineProps({
  title: String,
  description: String,
  imageURL: String,
  btnAction: Function
})
</script>

<template>
  <div class="flex flex-col h-full items-center text-center justify-center w-72 mx-auto">
    <img width="90" height="90" :src="imageURL" alt="Info Image" />
    <h2 class="mt-4 texe-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400">{{ description }}</p>
    <button
      @click="() => btnAction()"
      class="group/edit flex justify-center items-center gap-3 bg-lime-500 w-full mt-7 rounded-xl py-3 font-bold text-white hover:bg-lime-600 active:bg-lime-700 cursor-pointer transition disabled:bg-slate-300 disabled:cursor-auto"
      type="button"
    >
      <img
        class="rotate-180 group-hover/edit:-translate-x-1 transition ease-in-out duration-150"
        width="15"
        height="15"
        src="/svg/arrow.svg"
        alt=""
      />
      Вернуться назад
    </button>
  </div>
</template>
