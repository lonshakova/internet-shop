<template>
  <div class="filters">
    <div class="title">Фильтры</div>
    <div class="filter-list" v-for="filter in productStore.filters">
      <FilterItem :filter="filter"/>
    </div>
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-btn v-bind="props" :color="isHovering ? '#FF3C00' : undefined"
          >Применить</v-btn
        >
      </template>
    </v-hover>
  </div>
</template>

<script setup>
import FilterItem from "./FilterItem.vue";
import { ref } from "vue";
import { useProductStore } from "../store/productStore";

const productStore = useProductStore();

const availabilitys = ref(["В наличии", "Мало", "Нет в наличии"]);
const prices = ref([
  {
    min: 0,
    max: 1000,
    value: "до 1000",
  },
  {
    min: 1001,
    max: 2000,
    value: "1000 — 2000",
  },
  {
    min: 2001,
    max: 5000,
    value: "2000 — 5000",
  },
  {
    min: 5001,
    max: 10000,
    value: "5000 — 10000",
  },
  {
    min: 10001,
    max: 50000,
    value: "10000 — 50000",
  },
  {
    min: 50000,
    max: 100000,
    value: "от 50000",
  },
]);
let priceSelection = ref(prices.value);
let guarantees = ref(["Есть", "Нет"]);
let isGuarantee = ref("");
</script>

<style lang="scss" scoped>
.filters {
  margin: 10px;
  width: 15vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  text-transform: uppercase;
  font-size: xx-large;
  font-weight: 500;
}

.filter-list {
  width: 100%;
}
</style>
