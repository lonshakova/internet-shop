<template>
  <div>
    <div class="product-card">
      <v-img class="product-img" :src="product.img" />
      <div class="name-and-description">
        <div class="name-and-rate">
          <div class="name">{{ product.name }}</div>
          <div class="rate">
            <v-icon icon="mdi-star" size="default" color="#FF3C00" />{{ rate }}
          </div>
        </div>
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
    <div class="comments">
      <div class="comments-header">
        <h2>Комментарии</h2>

        <v-dialog>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn class="new-comment-btn" v-bind="activatorProps" v-if="productStore.isEntered"
              >Добавить комментарий</v-btn
            >
          </template>
          <template v-slot:default="{ isActive }">
            <v-card class="new-comment">
              <div class="stars">
                <div v-for="i in 5">
                  <v-icon
                    icon="mdi-star"
                    color="#FF3C00"
                    v-if="i <= newComment.rate"
                    @click="newComment.rate = i"
                  />
                  <v-icon
                    color="#FF3C00"
                    v-if="i > newComment.rate"
                    icon="mdi-star-outline"
                    @click="newComment.rate = i"
                  />
                </div>
              </div>

              <v-file-input
                class="img-input"
                label="Вставьте картинку"
                accept="image/*"
                v-model="newComment.img"
              />
              <v-textarea
                class="text-input"
                no-resize
                rows="4"
                auto-grow
                label="Напишите комментарий"
                v-model="newComment.text"
              />
              <v-btn
                @click="
                  isActive.value = false;
                  addComment();
                "
                :readonly="newComment.rate != 0 ? false : true"
                :variant="newComment.rate != 0 ? 'elevated' : 'tonal'"
                >Добавить комментарий</v-btn
              >
            </v-card>
          </template>
        </v-dialog>
      </div>
      <div v-for="comment in product.comments">
        <v-card class="comment" elevation="12">
          <div class="nameUser">{{ comment.nameUser }}</div>
          <div class="comment-content">
            <div class="text-and-rate">
              <div class="rate">
                <v-icon
                  v-for="i in +comment.rate"
                  icon="mdi-star"
                  color="#FF3C00"
                />
                {{ comment.rate }}
              </div>
              <div class="text" v-if="comment.text">{{ comment.text }}</div>
            </div>
            <v-img class="comment-img" v-if="comment.img" :src="comment.img" />
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../store/productStore";

const productStore = useProductStore();
const route = useRoute();

const newComment = ref({
  nameUser: productStore.nameUser + " " + productStore.surnameUser,
  img: null,
  text: "",
  rate: 0,
});

const product = computed(function () {
  return productStore.products.find(function (product) {
    return product.id == route.params.id;
  });
});

const rate = computed(function () {
  let sum = 0;
  for (let comment of product.value.comments) {
    sum += +comment.rate;
  }
  return Math.round(sum / product.value.comments.length);
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

function addComment() {
  product.value.comments.push(newComment.value);
  console.log(newComment.value)
  newComment.value = {
    nameUser: productStore.nameUser + " " + productStore.surnameUser,
    img: null,
    text: "",
    rate: "0",
  };
}
</script>

<style lang="scss" scoped>
.product-card {
  margin: 2vw;
  display: flex;
  justify-content: space-between;
}

.product-img {
  max-width: 25vw;
  background-size: cover;
}

.name-and-description {
  padding: 10px 0px;
  width: 40vw;
  font-size: 2vh;
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

.new-comment-btn{
  &:hover {
    background-color: #FF3C00;
    color: white;
  }
}
.new-comment {
  padding: 20px;
  width: 25vw;
  min-height: 25vh;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.stars {
  display: flex;
  flex-direction: row;
  font-size: x-large;
}

.img-input {
  width: 23vw;
}

.text-input {
  width: 23vw;
}

.comments {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comments-header {
  width: 80vw;
  display: flex;
  justify-content: space-between;
}

.comment {
  padding: 15px;
  margin: 5px 0px;
  width: 80vw;
}

.nameUser {
  font-size: large;
  font-weight: 600;
}

.rate {
  display: flex;
  font-size: large;
}

.comment-img {
  max-width: 10vw;
  background-size: cover;
}
</style>
