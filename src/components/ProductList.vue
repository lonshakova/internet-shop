<template>
  <div class="list" v-for="product in products">
    <ProductCard :product="product"/>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductCard from './ProductCard.vue';

let products = ref([{
  name: "Смартфон Apple iPhone 14",
  description:
    "В этой модели установлены три основные камеры (48Мп, 12 Мп и 12 Мп) и фронтальный модуль (7 Мп), можно записывать видео в качестве 4К  с частотой 30 кадров в секунду. Основной широкоугольный объектив снабжён сапфировым защитным стеклом.",
  img: "https://2cent.ru/storage/photo/resized/xy_1500x1500/h/9ew12rpbj8gvoh6_29e7244d.jpg.webp",
  quantity: 8,
  price: 62790,
},
{
  name: "Смартфон Apple iPhone 13",
  description:
    "В этой модели установлены три основные камеры (48Мп, 12 Мп и 12 Мп) и фронтальный модуль (7 Мп), можно записывать видео в качестве 4К  с частотой 30 кадров в секунду. Основной широкоугольный объектив снабжён сапфировым защитным стеклом.",
  img: "https://белоеяблоко.рф/upload/iblock/8dd/jq1tnfa8jnxig99ic7u5wfxkejqs3a6p.png",
  quantity: 3,
  price: 62790,
},
{
  name: "Смартфон Samsung Galaxy S8",
  description:
    "В этой модели установлены три основные камеры (48Мп, 12 Мп и 12 Мп) и фронтальный модуль (7 Мп), можно записывать видео в качестве 4К  с частотой 30 кадров в секунду. Основной широкоугольный объектив снабжён сапфировым защитным стеклом.",
  img: "https://www.iqmac.ru/upload/iblock/e37/1.jpg",
  quantity: 0,
  price: 62790,
},
{
  name: "Смартфон Apple iPhone 14",
  description:
    "В этой модели установлены три основные камеры (48Мп, 12 Мп и 12 Мп) и фронтальный модуль (7 Мп), можно записывать видео в качестве 4К  с частотой 30 кадров в секунду. Основной широкоугольный объектив снабжён сапфировым защитным стеклом.",
  img: "https://2cent.ru/storage/photo/resized/xy_1500x1500/h/9ew12rpbj8gvoh6_29e7244d.jpg.webp",
  quantity: 8,
  price: 62790,
},
{
  name: "Смартфон Apple iPhone 14",
  description:
    "В этой модели установлены три основные камеры (48Мп, 12 Мп и 12 Мп) и фронтальный модуль (7 Мп), можно записывать видео в качестве 4К  с частотой 30 кадров в секунду. Основной широкоугольный объектив снабжён сапфировым защитным стеклом.",
  img: "https://2cent.ru/storage/photo/resized/xy_1500x1500/h/9ew12rpbj8gvoh6_29e7244d.jpg.webp",
  quantity: 8,
  price: 62790,
},
{
  name: "Смартфон Apple iPhone 14",
  description:
    "В этой модели установлены три основные камеры (48Мп, 12 Мп и 12 Мп) и фронтальный модуль (7 Мп), можно записывать видео в качестве 4К  с частотой 30 кадров в секунду. Основной широкоугольный объектив снабжён сапфировым защитным стеклом.",
  img: "https://2cent.ru/storage/photo/resized/xy_1500x1500/h/9ew12rpbj8gvoh6_29e7244d.jpg.webp",
  quantity: 8,
  price: 62790,
}])

</script>

<style lang="scss" scoped>
.list {
  width: 85vw;
}

</style>