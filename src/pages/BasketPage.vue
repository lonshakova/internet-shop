<template>
  <div>
    <div class="category">
      Корзина<span style="color: grey"
        >({{ totalBasket.length }})</span
      >
    </div>
    <div class="main-content">
      <div>
        <div v-for="product in totalBasket" class="list">
          <BasketCard :product="product" />
        </div>
      </div>
      <v-card
        class="total-amount"
        elevation="12"
        v-if="totalBasket.length != 0"
      >
        <div>
          <h3 class="title">Ваш заказ</h3>
          <div><u>Количество товаров</u>: {{ totalAmount }}</div>
          <div><u>Итого</u>: {{ totalCost }}</div>
        </div>
        <v-btn class="btn" v-if="userStore.isEntered">Оформить заказ</v-btn>
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
import BasketCard from "../components/BasketCard.vue";
import { useUserStore } from "../store/userStore";
import { computed } from "vue";

const userStore = useUserStore();

const totalBasket = computed(function() {
  if (userStore.isEntered) {
    return userStore.basket;
  }
  else {
    return JSON.parse(localStorage.getItem("basket")) || [];
  }
});

const totalAmount = computed(function () {
  let sum = 0;
  for (let i = 0; i < userStore.enterUser.basketForBuying.length; i++) {
    sum += userStore.enterUser.basketForBuying[i].basket;
  }
  return sum;
});

const totalCost = computed(function () {
  let sum = 0;
  for (let i = 0; i < userStore.enterUser.basketForBuying.length; i++) {
    if (userStore.isEntered && userStore.enterUser.basketForBuying[i].sale!=0) {
      sum += Math.round
        (userStore.enterUser.basketForBuying[i].basket *
          userStore.enterUser.basketForBuying[i].price *
          (100-userStore.enterUser.basketForBuying[i].sale) /
          100
      );
    } else {
      sum +=
        userStore.enterUser.basketForBuying[i].basket *
        userStore.enterUser.basketForBuying[i].price;
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
    background: #ff3c00;
    color: white;
  }
}

.alt-text {
  text-transform: uppercase;
  font-size: medium;
  align-self: center;
  color: #ff3c00;
}
</style>
