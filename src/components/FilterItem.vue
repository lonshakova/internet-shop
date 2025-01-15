<template>
  <v-divider class="divider" width="100%"/>
  <div class="filter">
    <v-btn
      class="btn"
      icon="mdi-close"
      variant="plain"
      color="#ff3c00"
      v-if="userStore.enterUser.isAdmin"
      @click="filterStore.deleteFilter(filter.id)"
    />
    <v-list
      :width="userStore.enterUser.isAdmin ? '80%' : '100%'"
      v-model:selected="filter.selecton"
      select-strategy="leaf"
    >
      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :title="filter.name" />
        </template>
        <v-list-item
          v-for="item in filter.items"
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
</template>

<script setup>
import { defineProps } from "vue";
import { useUserStore } from "../store/userStore";
import { useFilterStore } from "../store/filterStore";

const props = defineProps({ filter: { type: Object, required: true } });
const userStore = useUserStore();
const filterStore = useFilterStore();
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  align-items: center;
}
</style>
