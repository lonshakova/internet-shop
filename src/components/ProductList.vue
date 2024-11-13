<template>
  <div class="content">
    <div class="category-filter">
      <div class="category">
        Главная<span style="color: grey"
          >({{ productStore.sortedProducts.length }})</span
        >
      </div>
      <div class="filters-and-sort">
        <v-btn
          class="sort"
          variant="text"
          width="20vh"
          size="small"
          :append-icon="
            productStore.isLowerFirst
              ? 'mdi-sort-reverse-variant'
              : 'mdi-sort-variant'
          "
          :text="
            productStore.isLowerFirst ? 'Сначала дешевле' : 'Сначала дороже'
          "
          @click="productStore.isLowerFirst = !productStore.isLowerFirst"
        ></v-btn>
      </div>
    </div>
    <div class="list" v-for="product in productStore.sortedProducts">
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script setup>
import ProductCard from "./ProductCard.vue";
import { useProductStore } from "../store/productStore";

const productStore = useProductStore();
</script>

<style lang="scss" scoped>
.content {
  width: 70vw;
}

.category-filter {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.category {
  font-size: 4vh;
}

.filters-and-sort {
  display: flex;
  align-items: center;
}
</style>
