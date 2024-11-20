<template>
  <div class="filter">
      <v-divider class="divider" />
      <v-list
        v-model:selected="filter.selecton"
        select-strategy="leaf"
      >
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="filter.name"></v-list-item>
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
const props = defineProps({ filter: { type: Object, required: true } });
</script>

<style lang="scss" scoped>
.filter {
  width: 100%;
}

.divider {
  width: 100%;
}
</style>