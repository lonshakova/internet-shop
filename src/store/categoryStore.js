import { defineStore } from "pinia";

export const useCategoryStore = defineStore({
  id: "categories",
  state: () => ({
    path: ['Главная'],
    categories:[
      {
        id:1,
        name:'Смартфоны',
        parent_ids: null,
        childs_id:[2,3,4]
      },
      {
        id:2,
        name:'Apple',
        parent_ids: [1],
        childs_id: null
      },
      {
        id:3,
        name:'Samsung',
        parent_ids: [1],
        childs_id:null
      },
      {
        id:4,
        name:'Сопутствующие товары',
        parent_ids: [1],
        childs_id:[5,6]
      },
      {
        id:5,
        name:'Наушники',
        parent_ids: [4,7],
        childs_id:null
      },
      {
        id:6,
        name:'Чехлы',
        parent_ids: [4],
        childs_id:null
      },
      {
        id:7,
        name:'Аудиотехника',
        parent_ids: null,
        childs_id:[5,8]
      },
      {
        id:8,
        name:'Портативные колонки',
        parent_ids: 7,
        childs_id:null
      },
    ]
  })
})