<template>
  <div class="main">
    <div class="main-header">
      <v-dialog width="auto">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            class="btn"
            variant="text"
            v-bind="activatorProps"
            size="x-large"
            rounded="xl"
            color="var(--icons-color)"
            >Каталог</v-btn
          >
        </template>
        <template v-slot:default="{ isCatalogVisible }">
          <ProductCatalog />
        </template>
      </v-dialog>
      <div class="path">Главная/</div>
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

import { ref } from "vue";
import { useProductStore } from "../store/productStore";

const productStore = useProductStore();

let isCatalogVisible = ref(false);
let path = ref("");
const handleEmit = (path) => {
  console.log(path);
};
</script>

<style lang="scss" scoped>
.main {

}

.main-header {
  margin: 1vh;
  display: flex;
  align-items: center;
}

.btn {
  font-size: 4vh;
  font-weight: 700;
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
