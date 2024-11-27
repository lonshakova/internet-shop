<template>
  <div>
    <v-dialog>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="new-comment-btn"
          v-bind="activatorProps"
          v-if="userStore.isEntered"
          >Добавить комментарий</v-btn
        >
      </template>
      <template v-slot:default="{ isActive }">
        <div class="comment-window">
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
            <v-img :src="newComment.img"></v-img>
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
                addComment();
                isActive.value = false;
              "
              :readonly="newComment.rate != 0 ? false : true"
              :variant="newComment.rate != 0 ? 'elevated' : 'tonal'"
              >Добавить комментарий</v-btn
            >
          </v-card>
        </div>
      </template>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { useUserStore } from "../store/userStore";

const props = defineProps({ product: { type: Object, required: true } });
const userStore = useUserStore();

const newComment = ref({
  user_id: null,
  nameUser: userStore.enterUser.name + " " + userStore.enterUser.surname,
  img: [],
  text: "",
  rate: 0,
});

function addComment() {
  newComment.value.user_id = userStore.enterUser.id;
  props.product.comments.unshift(newComment.value);
  newComment.value = {
    user_id: null,
    nameUser: userStore.enterUser.name + " " + userStore.enterUser.surname,
    img: [],
    text: "",
    rate: "0",
  };
}
</script>

<style lang="scss" scoped>
.new-comment-btn {
  &:hover {
    background-color: #ff3c00;
    color: white;
  }
}

.comment-window {
  width: 100vw;
  display: flex;
  justify-content: center;
}

.new-comment {
  padding: 20px;
  width: 25vw;
  min-height: 25vh;
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

.img-input,
.text-input {
  width: 23vw;
}
</style>
