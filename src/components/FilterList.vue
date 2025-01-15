<template>
  <div class="filters">
    <div class="title">Фильтры</div>
    <div class="filter-list" v-for="filter in filterStore.filters">
      <FilterItem :filter="filter" />
    </div>
    <div class="filter-list" v-for="filter in filterStore.chars">
      <FilterItem :filter="filter" />
    </div>
    <div class="btns">
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-btn
            v-bind="props"
            :color="isHovering ? '#FF3C00' : undefined"
            text="Применить"
          />
        </template>
      </v-hover>
      <v-dialog max-width="28vw" v-if="userStore.enterUser.isAdmin">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" text="Добавить" />
        </template>
        <template v-slot:default="{ isActive }">
          <v-card class="new-filter-card">
            <v-text-field
              class="input"
              label="Название"
              v-model="newFilter.name"
            />
            <v-text-field
              label="Добавить значения"
              append-inner-icon="mdi-subdirectory-arrow-left"
              @click:append-inner="addItem()"
              @keyup.enter="addItem()"
              v-model="newItem"
            />
            <h3 v-if="newFilter.items.length != 0">
              Выберите изначальное значение
            </h3>
            <v-checkbox
              :value="item"
              :label="item"
              density="compact"
              append-icon="mdi-close"
              @click:append="deleteItem(item)"
              v-model="newFilter.selecton"
              v-for="item in newFilter.items"
            />
            <v-card-actions>
              <v-btn
                text="Отмена"
                @click="
                  isActive.value = false;
                  clearForm();
                "
              />
              <v-btn
                text="Готово"
                @click="
                  isActive.value = false;
                  addFilter();
                "
                color="#ff3c00"
              />
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import FilterItem from "./FilterItem.vue";
import { useFilterStore } from "../store/filterStore";
import { useUserStore } from "../store/userStore";
import { useProductStore } from "../store/productStore";
import { ref } from "vue";

const userStore = useUserStore();
const filterStore = useFilterStore();
const productStore = useProductStore();

const newFilter = ref({
  id: null,
  name: "",
  selecton: [],
  items: [],
});
let newItem = ref("");

function clearForm() {
  newFilter.value = {
    id: null,
    name: "",
    selecton: [],
    items: [],
  };
}

function addItem() {
  newFilter.value.items.push(newItem.value);
  newItem.value = "";
}

function deleteItem(item) {
  newFilter.value.items = newFilter.value.items.filter((i) => i != item);
}

function addFilter() {
  newFilter.value.id = Date.now();
  filterStore.chars.push(newFilter.value);
  for (let product of productStore.products) {
    product.characteristics.push({
      id: newFilter.value.id,
      name: newFilter.value.name,
      value:"",
    })
  }
  newFilter.value = {
    id: null,
    name: "",
    selecton: [],
    items: [],
  };
}
</script>

<style lang="scss" scoped>
.filters {
  margin: 10px;
  width: 15vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.title {
  text-transform: uppercase;
  font-size: xx-large;
  font-weight: 500;
}

.filter-list {
  width: 100%;
}

.new-filter-card {
  padding: 1vw;
}
</style>
