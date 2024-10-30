<template>
  <div>
    <v-card class="catalog-card">
      <div class="title">
        Каталог
      </div>
      <v-list class="catalog-list">
        <v-list-group value="Smartphones">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" class="category" @click="formWay('Смартфоны')">Смартфоны</v-list-item>
          </template>
          <v-list-item
            v-for="smartphone in smartphones"
            :key="smartphone.id"
            :value="smartphone.id"
            @click="endType(smartphone)"
          >{{smartphone.title}}</v-list-item>
          <v-list-group value="RelatedProducts">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" class="category" @click="formWay('Сопутствующие товары')">Сопутствующие товары</v-list-item>
            </template>
            <v-list-item
              v-for="rel in related"
              :key="rel.id"
              :value="rel.id"
              @click="endType(rel)"
            >{{rel.title}}</v-list-item>
          </v-list-group>
        </v-list-group>
        
        <v-list-group value="Audio">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" class="category" @click="formWay('Аудиотехника')">Аудиотехника</v-list-item>
          </template>
          <v-list-item
            v-for="audio in audious"
            :key="audio.id"
            :value="audio.id"
            @click="endType(audio)"
          >{{audio.title}}</v-list-item>
  
        </v-list-group>
        
      </v-list>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";

let smartphones = ref([
  { title: "Все", value: "", id: 0 },
  { title: "Apple", value: "apple", id: 1 },
  { title: "Samsung", value: "samsung", id: 2 },
]);
let related = ref([
  { title: "Все", value: "", id: 10 },
  { title: "Наушники", value: "headphones", id: 11 },
  { title: "Чехлы", value: "cases", id: 12 },
]);
let audious = ref([
  { title: "Все", value: "", id: 20 },
  { title: "Портативные колонки", value: "speakers", id: 21 },
  { title: "Наушники", value: "headphones", id: 22 },
]);
let path = "";
let mainpath = "";
let emit = defineEmits(['addPath']);

function formWay (title){
  if (title != 'Сопутствующие товары') {
    mainpath = '' + title;
  }
  else {
    mainpath += "/" + title;
  }
}

function endType(type){
  path = mainpath + "/" + type.title;
  console.log(path);
  emit = ('click', path);
}

</script>

<style lang="scss" scoped>
.catalog-card {
  padding-top: 7vh;
  width: 30vw;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 40px;
  font-weight: 700;
  color: #c70000;

}

.catalog-list {
  width: 20vw;
}

.category{
  font-size: 2vh;
  color: #FF3C00;
}
</style>
