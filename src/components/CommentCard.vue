<template>
  <div>
    <v-card class="comment" elevation="12">
      <div class="header">
        <div
          class="nameUser"
          v-if="comment.customer_id == userStore.enterUser.id"
        >
          Ваш комментарий
        </div>
        <div class="nameUser" v-else>{{ comment.nameUser }}</div>
        <v-dialog max-width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-if="userStore.enterUser.isAdmin"
              class="delete-comment"
              icon="mdi-close"
              density="compact"
              variant="plain"
              color="#FF3C00"
              v-bind="activatorProps"
            />
          </template>
          <template v-slot:default="{ isActive }">
            <v-card title="Внимание">
              <v-card-text> Вы уверены, что хотите удалить комментарий? </v-card-text>
              <v-card-actions>
                <v-btn text="Отмена" @click="isActive.value = false" />
                <v-btn
                  text="Удалить"
                  @click="
                    deleteComment(product);
                    isActive.value = false;
                  "
                />
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>
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
        <div class="comment-imgs">
          <v-dialog max-width="700">
            <template v-slot:activator="{ props: activatorProps }">
              <v-img
                v-bind="activatorProps"
                class="comment-img"
                v-if="comment.img[0]"
                :elevation="comment.img.length"
                :src="comment.img[0]"
              />
            </template>
            <template v-slot:default="{ isActive }">
              <v-carousel
                hide-delimiters
                :show-arrows="comment.img.length > 1 ? 'hover' : false"
              >
                <v-carousel-item
                  v-for="(img, i) in comment.img"
                  :key="i"
                  :src="img"
                ></v-carousel-item>
              </v-carousel>
            </template>
          </v-dialog>
          <div v-if="comment.img.length > 1">+{{ comment.img.length - 1 }}</div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useUserStore } from "../store/userStore";
import { useProductStore } from "../store/productStore";
const userStore = useUserStore();
const productStore = useProductStore();
const props = defineProps({ comment: { type: Object, required: true } });

function deleteComment() {
  let product = productStore.products.find(
    (p) => p.id == props.comment.product_id
  );
  product.comments = product.comments.filter(
    (com) => com.customer_id != props.comment.customer_id
  );
}
</script>

<style lang="scss" scoped>
.comment {
  padding: 15px;
  margin: 5px 0px;
  width: 80vw;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nameUser {
  font-size: large;
  font-weight: 600;
}

.rate {
  display: flex;
  font-size: large;
}

.comment-imgs {
  display: flex;
  gap: 10px;
  font-size: xx-large;
  align-items: center;
  color: gray;
}

.comment-img {
  max-width: 15vw;
  background-size: cover;
  cursor: pointer;
}

.delete-comment {
  align-self: flex-end;
}
</style>
