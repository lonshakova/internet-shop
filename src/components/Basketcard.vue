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
        <div class="basket-btns" v-if="product.basket > 0">
          <v-btn
              class="btn"
              v-if="product.basket > 0"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from "vue";
import { useProductStore } from "../store/productStore";
import { useUserStore } from "../store/userStore";

const productStore = useProductStore();
const userStore = useUserStore();

const props = defineProps({ product: { type: Object, required: true } });

onMounted(function () {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  let productInBasket = basket.find((p) => p.id == props.product.id);
  if (productInBasket) {
    props.product.basket = productInBasket.basket;
    console.log(props.product.basket)
  }
});

function deleteProduct(product) {
  props.product.basket--;
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
