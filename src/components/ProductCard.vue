<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-card
        v-bind="props"
        :elevation="isHovering ? 12 : 1"
        class="product-card"
        @click.stop="$router.push(`/product/${product.id}`)"
      >
        <v-btn
          v-if="userStore.enterUser.isAdmin"
          class="admin-btns"
          icon="mdi-close"
          variant="plain"
          @click.stop="productStore.deleteProduct(product)"
        />
        <v-img class="img" :src="product.img" />
        <div class="name-and-description">
          <div class="name-and-rate">
            <div class="name">{{ product.name }}</div>
            <div class="rate" v-if="rate != 0">
              <v-icon icon="mdi-star" size="default" color="#FF3C00" />{{
                rate
              }}
            </div>
          </div>
          <div class="description">{{ product.description }}</div>
        </div>
        <div class="status">
          <span v-if="product.amount >= 5" style="color: #1e8449"
            >В наличии</span
          >
          <span
            v-if="product.amount < 5 && product.amount > 0"
            style="color: #ffc300"
            >Мало</span
          >
          <span v-if="product.amount == 0" style="color: #c70039"
            >Нет в наличии</span
          >
        </div>
        <div class="price-and-btn">
          <div class="price">
            <span v-if="userStore.isEntered && product.sale != 0"
              >{{ Math.round((product.price * (100 - product.sale)) / 100) }}
              <del id="old-price">{{ product.price }}</del></span
            >
            <span v-else>{{ product.price }}</span>
          </div>
          
          <PlusMinusBtns :product="product" />
        </div>
      </v-card>
    </template>
  </v-hover>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useProductStore } from "../store/productStore";
import { useUserStore } from "../store/userStore";
import PlusMinusBtns from "./PlusMinusBtns.vue";

const productStore = useProductStore();
const userStore = useUserStore();

const props = defineProps({ product: { type: Object, required: true } });
const rate = computed(function () {
  let sum = 0;

  if (props.product.comments.length == 0) {
    return 0;
  }
  for (let comment of props.product.comments) {
    sum += +comment.rate;
  }
  return Math.round(sum / props.product.comments.length);
});


</script>

<style lang="scss" scoped>
.product-card {
  margin: 1vh 0;
  min-height: 20vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.admin-btns {
  align-self: flex-start;
  justify-self: flex-start;
  width: fit-content;
  color: #ff3c00;
}

.img {
  height: 15vh;
  max-width: 15vw;
  min-width: 15vw;
  background-size: cover;
}

.name-and-description {
  padding: 10px 0px;
  width: 30vw;
}

.name-and-rate {
  width: 30vw;
  display: flex;
  align-items: center;
  font-size: x-large;
}

.name {
  font-weight: 600;
}

.status {
  min-width: 10vw;
  text-align: center;
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
