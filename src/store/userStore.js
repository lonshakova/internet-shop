import { defineStore } from "pinia";
import { useProductStore } from "./productStore";

export const useUserStore = defineStore({
  id: "users",
  state: () => ({
    isEntered: false,
    enterUser: {
      id: null,
      name: "",
      surname: "",
      email: "",
      password: "",
      isAdmin: false,
      basket: [],
      basketForBuying: [],
    },
    users: [
      {
        id: 5664,
        name: "Борис",
        surname: "Пончиков",
        email: "donat.b@boris.com",
        password: "12345678",
        isAdmin: true,
        basket: [],
        basketForBuying: [],
      },
      {
        id: 4553,
        name: "Ирина",
        surname: "Кышкыш",
        email: "irish_kish@kish.ru",
        password: "11111111",
        isAdmin: true,
        basket: [],
        basketForBuying: [],
      },
      {
        id: 3442,
        name: "Марина",
        surname: "Шишина",
        email: "nepishi@ire.com",
        password: "22222222",
        isAdmin: false,
        basket: [],
        basketForBuying: [],
      },
      {
        id: 2331,
        name: "Николай",
        surname: "Решетников",
        email: "kakoito@chel.ru",
        password: "55555555",
        isAdmin: false,
        basket: [],
        basketForBuying: [],
      },
    ],
  }),
  getters: {},
  actions: {
    async enterUser(user) {
      const productStore = useProductStore();
      let ind;
      for (ind in this.users) {
        if (
          this.users[ind].email == user.email &&
          this.users[ind].password == user.password
        ) {
          this.enterUser = this.users[ind];
          this.isEntered = true;
          productStore.clearBasket();
          window.localStorage.setItem("userId", this.users[ind].id);
          this.router.push("/");
          break;
        }
      }
    },

    async registUser(user) {
      let isError = false;
      for (let ind in this.users) {
        if (this.users[ind].email == user.email) {
          alert("Такой пользователь уже зарегестрирован!");
          isError = true;
          break;
        }
      }
      if (!isError) {
        user.id = Date.now();
        this.isEntered = true;
        this.users.push(user);
        this.enterUser = user;
        user = {
          id: null,
          name: "",
          surname: "",
          email: "",
          password: "",
          isAdmin: false,
        };
        setTimeout(() => this.router.push("/"), 1000);
      }
    },

    goOut() {
      const productStore = useProductStore();
      this.isEntered = false;
      productStore.clearBasket();
      window.localStorage.removeItem("userId");
      this.enterUser = {
        id: null,
        name: null,
        surname: null,
        email: null,
        password: null,
        isAdmin: false,
        basket: null,
        basketForBuying: null,
      }
    },
    placeOrder(totalBasket) {
      const productStore = useProductStore();
      for (let prod of this.enterUser.basketForBuying) {
        for (let p of productStore.products) {
          if (p.id == prod.id) {
            p.basket = 0;
          }
        }
        totalBasket.value = totalBasket.value.filter((p) => p.id != prod.id);
        this.enterUser.basketForBuying = [];
      }
    },
  },
});
