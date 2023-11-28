<script setup>
import MyHello from './components/MyHello.vue'
</script>

<template>
  <MyHello title="Кроссовки Puma" :price="9500" is-added>
    <button>BTN</button>
  </MyHello>
  <MyHello is-added />
  <MyHello :price="9500" is-added />
</template>

<style scoped></style>
