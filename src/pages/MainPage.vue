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
    <ProductList />
  </div>
</template>

<script setup>
import ProductList from "../components/ProductList.vue";
import ProductCatalog from "../components/ProductCatalog.vue";

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-header {
  margin: 1vh;

  display: flex;
  align-self: flex-start;
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


</style>
