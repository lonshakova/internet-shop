<template>
  <div>
    <v-dialog width="auto">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="btn"
          variant="text"
          v-bind="activatorProps"
          size="x-large"
          rounded="xl"
          color="var(--icons-color)"
          >Каталог</v-btn
        >
      </template>
      <template v-slot:default="{ isActive }">
        <v-card class="catalog-card">
          <div class="title">Каталог</div>
          <v-treeview
            class="tree"
            :items="categories"
            item.title="name"
            item-value="id"
            color="#ff3c00"
            activatable
            v-model:opened="open"
            v-model:activated="selection"
            select-strategy="single-leaf"
            @click="
              goToMain();
              isActive.value = false;
            "
          >
            <template v-slot:prepend="{ item }">
              {{ item.name }}
            </template>
          </v-treeview>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCategoryStore } from "../store/categoryStore";
import { useProductStore } from "../store/productStore";
import { useRouter } from "vue-router";

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const router = useRouter();

let open = ref([]);
let selection = ref([]);

let categories = computed(() => {
  let cats = [];
  for (let category of categoryStore.categories) {
    if (!category.parent_ids) {
      findChilds(category);
      cats.push(category);
    }
  }
  return cats;
});

function findChilds(category) {
  let children = [];
  for (let childId of category.childs_id) {
    let child = categoryStore.categories.find((c) => c.id == childId);
    if (child.childs_id) {
      findChilds(child);
    }
    children.push(child);
  }
  category.children = children;
}

function goToMain(categoryId) {
  categoryStore.path = ["Главная"];
  let cat;
  for (let item of this.open) {
    cat = categoryStore.categories.find((c) => c.id == item);
    categoryStore.path.push(cat.name);
  }
  if (this.selection[0]!=cat.id){
    cat = categoryStore.categories.find((c) => c.id == this.selection[0]);
    categoryStore.path.push(cat.name);
  }
  productStore.getProducts(this.selection[0]);
  router.push(`/category/${this.selection[0]}`);

}
</script>

<style lang="scss" scoped>
.btn {
  font-size: 4vh;
  font-weight: 700;
}

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

.tree {
  width: 20vw;
  font-size: 20px;
}
</style>

