<template>
  <div class="header-menu">
    <div class="logo-and-name" @click="$router.push('/'); productStore.getProducts('')">
      <img src="/public/logo.png" class="logo" />
      <div class="name">The Best Shop</div>
    </div>
  </div>
  <div class="btns">
    <v-btn
      append-icon="mdi-cart-variant"
      class="icon"
      @click="$router.push('/basket')"
      >Корзина ({{ totalAmount }})
      <template v-slot:append>
        <v-icon color="var(--icons-color)" size="25px" />
      </template>
    </v-btn>
    <v-btn
      v-if="!userStore.isEntered"
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
      <v-icon
        color="var(--icons-color)"
        size="25px"
        icon="mdi-account-outline"
      />

      <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn class="enter" v-bind="activatorProps" text="Выйти" />
        </template>

        <template v-slot:default="{ isActive }">
          <v-card>
            <v-card-title> Выход из аккаунта </v-card-title>
            <v-card-text>
              Вы действительно хотите выйти из аккаунта?
            </v-card-text>

            <v-card-actions>
              <v-btn
                text="Нет"
                variant="text"
                @click="isActive.value = false"
              />
              <v-btn
                variant="text"
                color="#ff3c00"
                text="Да"
                @click="
                  isActive.value = false;
                  userStore.goOut();
                "
              />
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/userStore";
import { useProductStore } from "../store/productStore";
import { computed, onMounted } from "vue";

const productStore = useProductStore();
const userStore = useUserStore();

const fio = computed(
  () => userStore.enterUser.name[0] + "." + userStore.enterUser.surname
);
const totalAmount = computed(function () {
  let sum = 0;
  for (let product of productStore.products) {
    sum += product.basket;
  }
  return sum;
});

onMounted(() => {
  let userId = window.localStorage.getItem("userId");
  if (userId) {
    userStore.enterUser = userStore.users.find((u) => u.id == userId);
    userStore.isEntered = true;
  }
});
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
