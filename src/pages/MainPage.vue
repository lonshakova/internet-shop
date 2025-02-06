<template>
  <div class="main">
    <div class="main-header">
      <ProductCatalog />
      <div class="path">
        <v-breadcrumbs :items="categoryStore.path" />
      </div>
    </div>
    <div class="main-content">
      <div><FilterList /></div>
      <div><ProductList /></div>
    </div>
  </div>
</template>

<script setup>
import ProductList from "../components/ProductList.vue";
import ProductCatalog from "../components/ProductCatalog.vue";
import FilterList from "../components/FilterList.vue";
import { useCategoryStore } from "../store/categoryStore";
import { useProductStore } from "../store/productStore";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const categoryStore = useCategoryStore();
const productStore = useProductStore();
const route = useRoute();


onBeforeMount(()=>{
  productStore.getProducts(route.params.id);
})
</script>

<style lang="scss" scoped>
.main-header {
  margin: 1vh;
  display: flex;
  align-items: center;
}

.path {
  font-size: x-large;
  color: grey;
}

.main-content {
  display: flex;
  gap: 5vw;
}
</style>
