<template>
  <div>
    <div class="category">
      Корзина<span style="color: grey">({{ basketList.length }})</span>
    </div>
    <div class="main-content">
      <div>
        <div v-for="product in basketList" class="list">
          <BasketCard :product="product" />
        </div>
      </div>
      <v-card class="total-amount" elevation="12" v-if="basketList.length != 0">
        <div>
          <h3 class="title">Ваш заказ</h3>
          <div><u>Количество товаров</u>: {{ totalAmount }}</div>
          <div><u>Итого</u>: {{ totalCost }}</div>
        </div>
        <v-dialog max-width="500" v-if="userStore.isEntered">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              class="btn"
              text="Оформить заказ"
              @click="userStore.placeOrder(totalBasket)"
              :readonly="totalAmount == 0"
              :variant="totalAmount == 0 ? 'flat' : 'elevated'"
            />
          </template>
          <template v-slot:default="{ isActive }">
            <v-card title="Спасибо за заказ!">
              <v-card-text>
                На вашу почту было отправлено письмо с подтверждением заказа.
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text="Ok"
                  @click="isActive.value = false"
                  color="#FF3C00"
                />
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
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
import { useProductStore } from "../store/productStore";
import { ref, computed, onBeforeMount } from "vue";

const userStore = useUserStore();
const productStore = useProductStore();

let totalBasket = ref([]);
let basketList = computed(() => {
  if (userStore.isEntered) {
    return totalBasket.value;
  } else {
    return totalBasket.value.filter((p) => p.basket > 0);
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
    if (
      userStore.isEntered &&
      userStore.enterUser.basketForBuying[i].sale != 0
    ) {
      sum += Math.round(
        (userStore.enterUser.basketForBuying[i].basket *
          userStore.enterUser.basketForBuying[i].price *
          (100 - userStore.enterUser.basketForBuying[i].sale)) /
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

function placeOrder() {
  for (let prod of userStore.enterUser.basketForBuying) {
    for (let p of productStore.products) {
      if (p.id == prod.id) {
        p.basket = 0;
      }
    }
    totalBasket.value = totalBasket.value.filter((p) => p.id != prod.id);
    userStore.enterUser.basketForBuying = [];
  }
}

onBeforeMount(() => {
  if (userStore.isEntered) {
    totalBasket.value = userStore.enterUser.basket;
  } else {
    let bas = JSON.parse(localStorage.getItem("basket")) || [];
    for (let prod of bas) {
      console.log(prod);
      if (productStore.products.find((p) => p.id == prod.id)) {
        totalBasket.value.push(
          productStore.products.find((p) => p.id == prod.id)
        );
      }
    }
  }
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
