<template>
  <div>
    <v-divider />
    <div class="product-card">
      <v-img class="img" :src="product.img" />
      <div class="name-and-description">
        <div class="name">{{ product.name }}</div>
        <div class="description">{{ product.description }}</div>
      </div>
      <div class="status">
        <span v-if="product.quantity > 5" style="color: #1e8449"
          >В наличии</span
        >
        <span
          v-if="product.quantity < 5 && product.quantity > 0"
          style="color: #FFC300"
          >Мало</span
        >
        <span v-if="product.quantity == 0" style="color: #C70039"
          >Нет в наличии</span
        >
      </div>
      <div class="price-and-btn">
        <div class="price">{{product.price}}</div>
        <v-btn>В корзину</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({product: {type: Object, required: true}});
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

.name-and-description {
  padding: 10px 0px;
  width: 30vw;
}

.name {
  font-size: x-large;
}

.status {
  min-width: 10vw;
  text-align: center;
}
</style>
