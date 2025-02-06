<template>
  <div>
    <v-divider />
    <div class="product-card">
      <v-checkbox
        v-model="userStore.enterUser.basketForBuying"
        :value="product"
      />
      <v-img class="img" :src="product.img" />
      <div class="name">{{ product.name }}</div>
      <div class="price-and-btn">
        <div class="price">
          <span v-if="userStore.isEntered && product.sale != 0"
            >{{
              Math.round(
                (product.price * product.basket * (100 - product.sale)) / 100
              )
            }}
            <del id="old-price">{{ product.price * product.basket }}</del></span
          >
          <span v-else>{{ product.price * product.basket }}</span>
        </div>
        <PlusMinusBtns :product="product"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useUserStore } from "../store/userStore";
import PlusMinusBtns from "./PlusMinusBtns.vue";

const userStore = useUserStore();

const props = defineProps({ product: { type: Object, required: true } });
</script>

<style lang="scss" scoped>
.product-card {
  min-height: 20vh;
  padding: 0 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.img {
  height: 15vh;
  max-width: 15vw;
  min-width: 15vw;
  background-size: cover;
}

.name {
  padding: 10px 0px;
  width: 30vw;
  font-size: x-large;
  font-weight: 600;
}

.price-and-btn {
  gap: 10px;
  min-width: 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.price {
  font-size: large;
  font-weight: 600;
}

#old-price {
  font-size: small;
  color: grey;
  font-weight: 300;
}

.basket {
  margin: 0 10px;
  font-size: large;
  font-weight: 500;
}
</style>
