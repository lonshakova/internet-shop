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
            <div class="rate">
              <v-icon icon="mdi-star" size="default" color="#FF3C00" />{{
                rate
              }}
            </div>
          </div>
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
            <span v-if="!userStore.isEntered">{{ product.price }}</span>
            <span v-else
              >{{ Math.round(product.price * 0.8) }}
              <del id="old-price">{{ product.price }}</del></span
            >
          </div>
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-btn
                v-bind="props"
                :color="isHovering ? '#FF3C00' : undefined"
                v-if="product.quantity > 0 && product.basket == 0"
                @click.stop="addProdutToBasket(product)"
                >В корзину</v-btn
              >
            </template>
          </v-hover>
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
              v-if="product.quantity > 0"
              size="small"
              rounded="0"
              icon="mdi-plus"
              @click.stop="
                product.basket++;
                product.quantity--;
              "
            />
          </div>
        </div>
      </v-card>
    </template>
  </v-hover>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useProductStore } from "../store/productStore";
import { useUserStore } from "../store/userStore";

const productStore = useProductStore();
const userStore = useUserStore();

const props = defineProps({ product: { type: Object, required: true } });
const rate = computed(function () {
  let sum = 0;
  for (let comment of props.product.comments) {
    sum += +comment.rate;
  }
  return Math.round(sum / props.product.comments.length);
});

function addProdutToBasket(product) {
  product.basket++;
  product.quantity--;
  productStore.basket.push(product);
}

function deleteProduct(product) {
  product.basket--;
  product.quantity++;
  console.log(productStore.basket);
  if (product.basket == 0) {
    productStore.basket = productStore.basket.filter((p) => p.id != product.id);
  }
}
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
