<template>
  <div class="filters">
    <div class="title">Фильтры</div>

    <div class="filter">
      <v-divider class="divider" />
      <v-list v-model:selected="productStore.availabilitysSelection" select-strategy="leaf">
        <v-list-group value="Availability">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="Наличие"></v-list-item>
          </template>
          <v-list-item
            v-for="item in availabilitys"
            :title="item"
            :value="item"
            color="#FF3C00"
          >
            <template v-slot:prepend="{ isSelected }">
              <v-list-item-action start>
                <v-checkbox-btn :model-value="isSelected"></v-checkbox-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list-group>
      </v-list>
    </div>

    <div class="filter">
      <v-divider class="divider" />
      <v-list v-model:selected="priceSelection" select-strategy="leaf">
        <v-list-group value="Price">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="Цена"></v-list-item>
          </template>
          <div class="slider">
            <div class="fields">
              <v-text-field
                v-model="range[0]"
                density="compact"
                type="number"
                variant="outlined"
                hide-details
                single-line
              ></v-text-field>
              <v-text-field
                v-model="range[1]"
                density="compact"
                type="number"
                variant="outlined"
                hide-details
                single-line
              ></v-text-field>
            </div>
          </div>
          <v-list-item
            v-for="item in prices"
            :title="item.value"
            :value="item"
            color="#FF3C00"
          >
            <template v-slot:prepend="{ isSelected }">
              <v-list-item-action start>
                <v-checkbox-btn :model-value="isSelected"></v-checkbox-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list-group>
      </v-list>
    </div>

    <div class="filter">
      <v-divider class="divider" />
      <v-list v-model:selected="isGuarantee">
        <v-list-group value="Guarantee">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="Гарантия"/>
          </template>
          <v-list-item
            v-for="item in guarantees"
            :title="item"
            :value="item"
            color="#FF3C00"
          >
            <template v-slot:prepend="{ isSelected }">
              <v-list-item-action start>
                <v-radio :model-value="isSelected"></v-radio>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list-group>
      </v-list>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
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

const range = computed(function () {
  priceSelection.value = priceSelection.value.sort((a, b) => {
    return a.min - b.min;
  });
  if (priceSelection.value.length == 0) {
    return [0, 1];
  } else {
    let maxInd = priceSelection.value.length - 1;
    return [priceSelection.value[0].min, priceSelection.value[maxInd].max];
  }
});
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

.filter {
  width: 100%;
}

.divider {
  width: 100%;
}

.slider {
  width: 90%;
  margin-left: 10px;
}

.fields {
  display: flex;
  align-items: center;
  gap: 2vw;
}
</style>
