<template>
  <div>
    <div class="category">
      Корзина<span style="color: grey">({{ productStore.basket.length }})</span>
    </div>
    <div class="main-content">
      <div>
        <div v-for="product in productStore.basket" class="list">
          <Basketcard :product="product" />
        </div>
      </div>
      <v-card class="total-amount" elevation="12" v-if="productStore.basket.length != 0">
        <div>
          <h3 class="title">Ваш заказ</h3>
          <div><u>Количество товаров</u>: {{ totalBasket }}</div>
          <div><u>Итого</u>: {{ totalAmount }}</div>
        </div>
        <v-btn class="btn" v-if="productStore.isEntered">Оформить заказ</v-btn>
        <div class="alt-text" v-else>Войдите для заказа</div>
      </v-card>
      <div v-else class="backup-text">
        <div>Упс, кажется тут ничего нет :(</div>
        <div>Хотите перейти на <a href="./">главную страницу?</a></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Basketcard from "../components/Basketcard.vue";
import { useProductStore } from "../store/productStore";
import { computed, readonly } from "vue";

const productStore = useProductStore();
const totalBasket = computed(function () {
  let sum = 0;
  for (let i = 0; i < productStore.basketForBuying.length; i++) {
    sum += productStore.basketForBuying[i].basket;
  }
  return sum;
});
const totalAmount = computed(function () {
  let sum = 0;
  for (let i = 0; i < productStore.basketForBuying.length; i++) {
    if (productStore.isEntered) {
      sum +=
        productStore.basketForBuying[i].basket *
        productStore.basketForBuying[i].price *
        0.8;
    } else {
      sum +=
        productStore.basketForBuying[i].basket *
        productStore.basketForBuying[i].price;
    }
  }
  return sum;
});
</script>

<style lang="scss" scoped>
.category {
  margin: 2vh 5vw;
  font-size: 4vh;
}

.main-content {
  width: 100vw;
  display: flex;
  gap: 5vw;
}

.list {
  margin-left: 5vw;
  width: 70vw;
}

.backup-text {
  align-self: center;
  font-size: xx-large;
}

.total-amount {
  padding: 2vh;
  width: 15vw;
  height: 20vh;
  font-size: larger;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: 10vh;
}

.title {
  margin-bottom: 1vh;
  text-align: center;
}

.btn {
  &:hover {
    background: #FF3C00;
    color: white;
  }
}

.alt-text {
  text-transform: uppercase;
  font-size: medium;
  align-self: center;
  color:#FF3C00;
}
</style>
