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
        <span v-if="product.quantity >= 5" style="color: #1e8449"
          >В наличии</span
        >
        <span
          v-if="product.quantity < 5 && product.quantity > 0"
          style="color: #ffc300"
          >Мало</span
        >
        <span v-if="product.quantity == 0" style="color: #c70039"
          >Нет в наличии</span
        >
      </div>
      <div class="price-and-btn">
        <div class="price">
          <span v-if="!productStore.isEntered">{{ product.price }}</span>
          <span v-else>{{ Math.round(product.price * 0.8) }} <del id="old-price">{{ product.price }}</del></span>
        </div>
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-btn
              v-bind="props"
              :color="isHovering ? '#FF3C00' : undefined"
              v-if="product.quantity > 0 && product.basket == 0"
              @click="
                product.basket++;
                product.quantity--;
              "
              >В корзину</v-btn
            >
          </template>
        </v-hover>
        <div class="basket-btns" v-if="product.basket > 0">
          <v-btn
            class="btn"
            v-if="product.quantity > 0"
            size="small"
            rounded="0"
            icon="mdi-plus"
            @click="
              product.basket++;
              product.quantity--;
            "
          />
          <span class="basket">{{ product.basket }}</span>
          <v-btn
            class="btn"
            v-if="product.basket != 0"
            size="small"
            rounded="0"
            icon="mdi-minus"
            @click="
              product.basket--;
              product.quantity++;
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { useProductStore } from "../store/productStore";

const productStore = useProductStore();

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

.name-and-description {
  padding: 10px 0px;
  width: 30vw;
}

.name {
  font-size: x-large;
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
