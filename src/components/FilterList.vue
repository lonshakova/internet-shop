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
import { useProductStore } from "../store/productStore";

const productStore = useProductStore();

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
