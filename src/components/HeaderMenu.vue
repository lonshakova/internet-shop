<template>
  <div class="header-menu">
    <div class="logo-and-name" @click="$router.push('/')">
      <img src="/public/logo.png" class="logo" />
      <div class="name">The Best Shop</div>
    </div>
  </div>
  <div class="btns">
    <v-btn append-icon="mdi-cart-variant" class="icon"
      >Корзина ({{ totalBasket }})
      <template v-slot:append>
        <v-icon color="var(--icons-color)" size="25px" />
      </template>
    </v-btn>
    <v-btn
      v-if="!productStore.isEntered"
      append-icon="mdi-account-outline"
      class="enter"
      @click="$router.push('/login')"
      >Войти
      <template v-slot:append>
        <v-icon color="var(--icons-color)" size="25px" />
      </template>
    </v-btn>
    <div class="enter-and-fio" v-else>
      <div class="fio">{{ fio }}</div>
      <v-icon color="var(--icons-color)" size="25px" icon="mdi-account-outline"/>
      <v-btn
        class="enter"
        @click="productStore.isEntered = !productStore.isEntered"
        >Выйти
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "../store/productStore";
import { computed } from "vue";

const productStore = useProductStore();

const fio = computed(
  () => productStore.nameUser[0] + "." + productStore.surnameUser
);
const totalBasket = computed(
  function() {
    let sum = 0;
    for (let i = 0; i < productStore.products.length; i++) {
      sum += productStore.products[i].basket;
    }
    return sum;
  }
);
</script>

<style lang="scss" scoped>
.header-menu {
  padding: 10px;
  width: 100vw;
  height: 100%;
  display: flex;
}

.logo-and-name {
  width: fit-content;
  display: flex;
  cursor: pointer;
}

.logo {
  height: 100%;
  background-size: cover;
}

.name {
  font-size: xx-large;
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.btns {
  display: flex;
  font-size: xx-large;
  align-items: center;
}

.enter {
  margin: 5px 0px;
}

.enter-and-fio {
  display: flex;
  width: fit-content;
  align-items: center;
}

.fio {
  display: flex;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
}
</style>
