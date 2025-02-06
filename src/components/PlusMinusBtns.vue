<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-btn
        v-bind="props"
        :color="isHovering ? '#FF3C00' : undefined"
        v-if="product.amount > 0 && product.basket == 0"
        @click.stop="addProdutToBasket(product)"
        >В корзину</v-btn
      >
    </template>
  </v-hover>
  <div class="basket-btns" v-if="product.basket > 0">
    <v-btn
      class="btn"
      v-if="product.basket != 0"
      size="small"
      rounded="0"
      icon="mdi-minus"
      @click.stop="deleteProduct(product)"
    />
    <span class="basket">{{ product.basket }}</span>
    <v-btn
      class="btn"
      v-if="product.amount > 0"
      size="small"
      rounded="0"
      icon="mdi-plus"
      @click.stop="addProdutToBasket(product)"
    />
  </div>
</template>

<script setup>
import { defineProps, onBeforeMount } from "vue";
import { useUserStore } from "../store/userStore";

const userStore = useUserStore();

const props = defineProps({ product: { type: Object, required: true } });

function addProdutToBasket(product) {
  product.basket++;
  product.amount--;
  if (userStore.isEntered) {
    if (product.basket == 1) {
      userStore.enterUser.basket.push(product);
    }
  } else {
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    if (basket.length) {
      let productFromStorage = basket.find((prod) => prod.id == product.id);
      if (productFromStorage) {
        productFromStorage.basket++;
        productFromStorage.amount--;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem("basket", JSON.stringify(basket));
  }
}

function deleteProduct(product) {
  product.basket--;
  product.amount++;
  if (userStore.isEntered) {
    if (product.basket == 0) {
      userStore.enterUser.basket = userStore.enterUser.basket.filter(
        (p) => p.id != product.id
      );
    }
  } else {
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    let productFromStorage = basket.find((prod) => prod.id == product.id);
    productFromStorage.basket--;
    productFromStorage.amount++;
    if (productFromStorage.basket == 0) {
      basket = basket.filter((p) => p.id != product.id);
    }
    localStorage.setItem("basket", JSON.stringify(basket));
  }
}

onBeforeMount(function () {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  let productInBasket = basket.find((p) => p.id == props.product.id);
  if (productInBasket) {
    props.product.basket = productInBasket.basket;
    props.product.amount = productInBasket.amount;
  }
});
</script>

<style lang="scss" scoped>
.basket-btns {
  min-width: 10vw;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
