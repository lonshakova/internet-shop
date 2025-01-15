<template>
  <div>
    <v-dialog max-width="33vw">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn class="btn" v-bind="activatorProps" :text="btnTitle" />
      </template>
      <template v-slot:default="{ isActive }">
        <v-card class="change-card">
          <v-text-field
            class="input"
            label="Название товара"
            v-model="copyProduct.name"
          />
          <v-textarea
            class="input"
            label="Описание"
            v-model="copyProduct.description"
          />
          <v-file-input
            class="input"
            label="Фото"
            chips
            v-model="copyProduct.img"
            accept="image/*"
          />
          <div class="price-and-sale">
            <v-text-field
              class="input-price"
              label="Цена"
              v-model="copyProduct.price"
            />
            <v-text-field
              class="input-price"
              label="Скидка"
              v-model="copyProduct.sale"
            />
          </div>
          <v-text-field
            class="input"
            label="Количество"
            v-model="copyProduct.amount"
          />
          <v-combobox
            class="input"
            chips
            multiple
            v-model="copyProduct.category"
            label="Категории"
            :items="[
              'Смартфоны',
              'Сопутствующие товары',
              'Аудиотехника',
              'Наушники',
              'Чехлы',
            ]"
          />
          <div class="chars" v-for="(char, i) in filterStore.chars">
            {{ char.name }}
            <v-radio-group
              class="chars"
              v-model="characteristics[i].value"
              inline
            >
              <v-radio v-for="item in char.items" :label="item" :value="item" />
            </v-radio-group>
          </div>
          <div class="btns">
            <v-btn
              variant="text"
              @click="
                isActive.value = false;
                deleteChanges();
              "
              text="Отмена"
            />
            <v-btn
              variant="text"
              color="#ff3c00"
              @click="
                isActive.value = false;
                isProductNew ? addProduct() : applyChanges();
              "
              text="Готово"
            />
          </div>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { useFilterStore } from "../store/filterStore";
import { useProductStore } from "../store/productStore";

const productStore = useProductStore();
const filterStore = useFilterStore();
const props = defineProps({
  product: { type: Object, required: true },
  btnTitle: { type: String, required: true },
  isProductNew: { type: Boolean, required: true },
});
let copyProduct = ref({
  id: props.product.id,
  name: props.product.name,
  description: props.product.description,
  img: props.product.img,
  amount: props.product.amount,
  price: props.product.price,
  sale: props.product.sale,
  comments: [],
  category: props.product.category,
});

let characteristics = ref(
  props.product.characteristics.map((obj) => ({ ...obj }))
);


function deleteChanges() {
  copyProduct.value = {
    name: props.product.name,
    description: props.product.description,
    img: props.product.img,
    amount: props.product.amount,
    basket: props.product.basket,
    price: props.product.price,
    sale: props.product.sale,
    category: props.product.category,
  };
  characteristics.value = props.product.characteristics.map((obj) => ({
    ...obj,
  }));
}

function addProduct() {
  console.log(productStore.products);
  copyProduct.value.id = Date.now();
  copyProduct.value.img = URL.createObjectURL(copyProduct.value.img);
  copyProduct.value.characteristics = characteristics.value.map((obj) => ({
    ...obj,
  }));
  productStore.products.push(copyProduct.value);
}

function applyChanges() {
  props.product.name = copyProduct.value.name;
  props.product.description = copyProduct.value.description;
  props.product.img = URL.createObjectURL(copyProduct.value.img);
  props.product.amount = copyProduct.value.amount;
  props.product.price = copyProduct.value.price;
  props.product.sale = copyProduct.value.sale;
  props.product.characteristics = characteristics.value.map((obj) => ({
    ...obj,
  }));
  props.product.category = copyProduct.value.category.value;
}
</script>

<style lang="scss" scoped>
.btn {
  align-self: flex-end;
  &:hover {
    color: #ffffff;
    background-color: #ff3c00;
  }
}

.change-card {
  padding: 1.5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.input {
  width: 30vw;
}

.price-and-sale {
  width: 30vw;
  display: flex;
  justify-content: space-between;
}

.input-price {
  max-width: 14vw;
}

.chars {
  align-self: start;
}

.btns {
  align-self: end;
}
</style>
