<template>
  <div class="list">
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue';
</script>

<style lang="scss" scoped>
.list {
  width: 85vw;
}

</style>