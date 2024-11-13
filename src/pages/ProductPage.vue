<template>
  <div>
    <v-divider />
    <div class="product-card">
      <v-img class="img" :src="product.img" />
      <div class="name-and-description">
        <div class="name">{{ product.name }}</div>
        <div class="description">{{ product.description }}</div>
      </div>

      <div class="price-and-btn">
        <div class="price">
          <span v-if="!productStore.isEntered">{{ product.price }}</span>
          <span v-else
            >{{ Math.round(product.price * 0.8) }}
            <del id="old-price">{{ product.price }}</del></span
          >
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
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-btn
              v-bind="props"
              :color="isHovering ? '#FF3C00' : undefined"
              v-if="product.quantity > 0 && product.basket == 0"
              @click="addProdutToBasket(product)"
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
            @click="
              deleteProduct(product)
            "
          />
          <span class="basket">{{ product.basket }}</span>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProductStore } from "../store/productStore";

const productStore = useProductStore();
const router = useRouter();
const route = useRoute();

const product = computed(function () {
  return productStore.products.find(function (product) {
    return product.id == route.params.id;
  });
});

function addProdutToBasket(product) {
  product.basket++;
  product.quantity--;
  productStore.basket.push(product);
}

function deleteProduct(product) {
  product.basket--;
  product.quantity++;
  if (product.basket == 0) {
    productStore.basket = productStore.basket.filter((p) => p.id != product.id);
  }
}
</script>

<style lang="scss" scoped>
.product-card {
  margin: 2vw;
  display: flex;
  justify-content: space-between;
}

.img {
  max-width: 25vw;
  background-size: cover;
}

.name-and-description {
  padding: 10px 0px;
  width: 40vw;
  font-size: 2vh;
}

.name {
  font-size: 6vh;
  font-weight: 600;
}

.status {
  text-align: center;
  font-size: 2vh;
}

.price-and-btn {
  margin-top: 2vh;
  gap: 10px;
  min-width: 10vw;
  font-size: 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.price {
  font-size: 3vh;
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
