<template>
  <div>
    <div class="product-card">
      <v-img class="product-img" :src="product.img" />
      <div class="name-and-description">
        <div class="name-and-rate">
          <div class="name">{{ product.name }}</div>
          <div class="rate" v-if="rate != 0">
            <v-icon icon="mdi-star" size="default" color="#FF3C00" />{{ rate }}
          </div>
        </div>
        <div class="description">{{ product.description }}</div>
        <div class="characteristics">
          <h3>Характеристики</h3>
          <div v-for="char in product.characteristics">
            {{ char.name }}:&nbsp{{ char.value }}
          </div>
        </div>
      </div>
      <div class="admin-btns" v-if="userStore.enterUser.isAdmin">
        <ChangeProduct :product="product" :btnTitle="'Редактировать'" :isProductNew="false"/>
        <v-dialog max-width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn class="admin-btn" text="Удалить" v-bind="activatorProps" />
          </template>
          <template v-slot:default="{ isActive }">
            <v-card title="Внимание">
              <v-card-text> Вы уверены, что хотите удалить товар? </v-card-text>
              <v-card-actions>
                <v-btn text="Отмена" @click="isActive.value = false" />
                <v-btn
                  text="Удалить"
                  color="#ff3c00"
                  @click="
                    productStore.deleteProduct(product);
                    $router.push(`/`);
                    isActive.value = false;
                  "
                />
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
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
        
        <PlusMinusBtns :product="product" />
      </div>
    </div>
    <div class="comments">
      <div class="comments-header">
        <h2>Комментарии</h2>
        <v-dialog max-width="500" v-if="yourComment">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn text="Удалить комментарий" v-bind="activatorProps" />
          </template>
          <template v-slot:default="{ isActive }">
            <v-card title="Внимание">
              <v-card-text>
                Вы уверены, что хотите удалить комментарий?
              </v-card-text>
              <v-card-actions>
                <v-btn text="Отмена" @click="isActive.value = false" />
                <v-btn
                  color="#ff3c00"
                  text="Удалить"
                  @click="
                    deleteComment();
                    isActive.value = false;
                  "
                />
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>

        <NewComment v-else :product="product" />
      </div>
      <div v-for="comment in product.comments">
        <CommentCard :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script setup>
import NewComment from "../components/NewComment.vue";
import ChangeProduct from "../components/ChangeProduct.vue";
import CommentCard from "../components/CommentCard.vue";
import PlusMinusBtns from "../components/PlusMinusBtns.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../store/productStore";
import { useUserStore } from "../store/userStore";

const productStore = useProductStore();
const userStore = useUserStore();
const route = useRoute();

const product = computed(function () {
  return productStore.products.find(function (product) {
    return product.id == route.params.id;
  });
});

const rate = computed(function () {
  let sum = 0;
  if (product.value.comments.length == 0) {
    return 0;
  }
  for (let comment of product.value.comments) {
    sum += +comment.rate;
  }
  return Math.round(sum / product.value.comments.length);
});

const yourComment = computed(function () {
  for (let comment of product.value.comments) {
    if (comment.customer_id == userStore.enterUser.id) {
      return true;
    }
  }
  return false;
});

function deleteComment() {
  product.value.comments = product.value.comments.filter(
    (comment) => comment.customer_id !== userStore.enterUser.id
  );
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

.admin-btns {
  margin: 3vh 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.admin-btn {
  &:hover {
    color: #ffffff;
    background-color: #ff3c00;
  }
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
</style>
