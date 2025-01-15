import { defineStore } from "pinia";

export const useFilterStore = defineStore({
  id: "filters",
  state: () => ({
    filters: [
      {
        id: 43,
        name: "Наличие",
        selecton: ["В наличии", "Мало"],
        items: ["В наличии", "Мало", "Нет в наличии"],
      },
      {
        id: 67,
        name: "Цена",
        selecton: [
          "до 1000",
          "1001-5000",
          "5001-10000",
          "10001-50000",
          "от 50000",
        ],
        items: [
          "до 1000",
          "1001-5000",
          "5001-10000",
          "10001-50000",
          "от 50000",
        ],
      },
    ],
    chars: [
      {
        id: 55,
        name: "Гарантия",
        selecton: [],
        items: ["Есть", "Нет"],
      },
    ]
  }),
  actions: {

    deleteFilter(filterId) {
      this.chars = this.chars.filter((ch) => ch.id != filterId)
      this.filters = this.filters.filter((f) => f.id != filterId)
    },
  },
});