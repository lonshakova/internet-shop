<template>
  <div class="header-menu">
    <div class="logo-and-name" @click="$router.push('/')">
      <img src="/public/logo.png" class="logo" />
      <div class="name">The Best Shop</div>
    </div>
  </div>
  <div class="btns">
    <v-btn append-icon="mdi-cart-variant" class="icon"
      >Корзина
      <template v-slot:append>
        <v-icon color="var(--icons-color)" size="25px" />
      </template>
    </v-btn>
    <v-btn append-icon="mdi-account-outline" class="icon" @click="$router.push('/login')"
      >Войти
      <template v-slot:append>
        <v-icon color="var(--icons-color)" size="25px" />
      </template>
    </v-btn>
  </div>
</template>

<script setup></script>

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
}

.icon {
  margin: 5px 0px;
}
</style>
