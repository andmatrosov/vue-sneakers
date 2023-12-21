<script setup>
defineProps({
  imageUrl: String
})
</script>

<template>
  <div
    class="flex justify-between items-center gap-3 w-full border border-slate-100 p-4 rounded-xl"
  >
    <img class="w-16 h-16" src="/img/sneakers/1.jpg" alt="" />
    <div class="flex justify-between items-center">
      <div>
        <p class="text-sm mb-1">Мужские Кроссовки Nike Blazer Mid Suede</p>
        <strong>12 999 руб.</strong>
      </div>
      <button class="shrink-0 opacity-50 hover:opacity-100 cursor-pointer transition">
        <img src="/svg/remove.svg" alt="" />
      </button>
    </div>
  </div>
</template>
