<template>
  <v-app>
    <v-app-bar :elevation="2" scroll-behavior="elevate">
      <HeaderMenu />
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import HeaderMenu from "./components/HeaderMenu.vue";
</script>

<style lang="scss" scoped>
* {
  --icons-color: #ff3c00;
}
</style>
