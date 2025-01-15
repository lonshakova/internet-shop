<template>
  <div class="content">
    <div class="category-filter">
      <div class="category">
        Главная<span style="color: grey"
          >({{ productStore.sortedProducts.length }})</span
        >
      </div>
      <div class="filters-and-sort">
        <ChangeProduct v-if="userStore.enterUser.isAdmin" :product="newProduct" :btnTitle="'Добавить товар'" :isProductNew="true"/>
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
        />
      </div>
    </div>
    <div class="list" v-for="product in productStore.sortedProducts">
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script setup>
import ProductCard from "./ProductCard.vue";
import ChangeProduct from "./ChangeProduct.vue";
import { ref } from "vue";
import { useProductStore } from "../store/productStore";
import { useUserStore } from "../store/userStore";
import { useFilterStore } from "../store/filterStore";

const userStore = useUserStore();
const productStore = useProductStore();
const filterStor = useFilterStore();

const newProduct = ref({
  name: "",
  description: "",
  img: null,
  amount: 0,
  price: 0,
  sale: 0,
  basket: 0,
  id: null,
  category: [],
  characteristics: filterStor.chars.map((ch) => {
    return { name: ch.name, value: "" };
  }),
  comments: [],
});
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
