<template>
  <div>
    <v-divider />
    <div class="product-card">
      <v-checkbox v-model="productStore.basketForBuying" :value="product"></v-checkbox>
      <v-img class="img" :src="product.img" />
      <div class="name">{{ product.name }}</div>
      <div class="price-and-btn">
        <div class="price">
          <span v-if="!productStore.isEntered">{{
            product.price * product.basket
          }}</span>
          <span v-else
            >{{ Math.round(product.price * product.basket * 0.8) }}
            <del id="old-price">{{ product.price * product.basket }}</del></span
          >
        </div>
        <div class="basket-btns" v-if="product.basket > 0">
          <v-btn
            class="btn"
            v-if="product.basket != 0"
            size="small"
            rounded="0"
            icon="mdi-minus"
            @click="deleteProduct(product)"
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
import { ref, defineProps } from "vue";
import { useProductStore } from "../store/productStore";

const productStore = useProductStore();

const props = defineProps({ product: { type: Object, required: true } });

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
