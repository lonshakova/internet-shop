<template>
  <div class="content">
    <div class="category-filter">
      <div class="category">
        Главная<span style="color: grey"
          >({{ productStore.products.length }})</span
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
              ? 'mdi-sort-ascending'
              : 'mdi-sort-descending'
          "
          :text="
            productStore.isLowerFirst ? 'Сначала дешевле' : 'Сначала дороже'
          "
          @click="productStore.isLowerFirst = !productStore.isLowerFirst"
        ></v-btn>
        <div class="filter">
          <v-select
            clearable
            label="Фильтры"
            width="20vh"
            :items="['1', '2', '3', '4', '5', '6']"
            variant="underlined"
          ></v-select>
        </div>
      </div>
    </div>
    <div class="list" v-for="product in productStore.products">
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
  width: 85vw;
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
