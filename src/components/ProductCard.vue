<template>
  <div>
    <div class="product-card">
      <v-img class="img" :src="product.img" />
      <div class="name-and-description">
        <div class="name">{{ product.name }}</div>
        <div class="description">{{ product.description }}</div>
      </div>
      <div>
        <span class="status" v-if="product.quantity > 5" style="color: #1e8449"
          >В наличии</span
        >
        <span
          class="status"
          v-if="product.quantity < 5 && product.quantity > 0"
          style="color: #FFC300"
          >Мало</span
        >
        <span class="status" v-if="product.quantity == 0" style="color: #C70039"
          >Нет в наличии</span
        >
      </div>
      <div class="price-and-btn">
        <div class="price">{{product.price}}</div>
        <v-btn>В корзину</v-btn>
      </div>
    </div>
    <v-divider />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

let product = ref({
  name: "Смартфон Apple iPhone 14",
  description:
    "В этой модели установлены три основные камеры (48Мп, 12 Мп и 12 Мп) и фронтальный модуль (7 Мп), можно записывать видео в качестве 4К  с частотой 30 кадров в секунду. Основной широкоугольный объектив снабжён сапфировым защитным стеклом.",
  img: "https://2cent.ru/storage/photo/resized/xy_1500x1500/h/9ew12rpbj8gvoh6_29e7244d.jpg.webp",
  quantity: 8,
  price: 62790,
});
</script>

<style lang="scss" scoped>
.product-card {
  height: 20vh;
  padding: 0 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.img {
  height: 15vh;
  max-width: 15vw;
  background-size: cover;
}

.name-and-description {
  width: 30vw;
}

.name {
  font-size: x-large;
}

.status {
  width: 10vw;
}
</style>
