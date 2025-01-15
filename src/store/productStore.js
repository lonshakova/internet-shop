import { defineStore } from "pinia";
import { useUserStore } from "./userStore";

export const useProductStore = defineStore({
  id: "products",
  state: () => ({
    isLowerFirst: true,
    products: [
      {
        name: "Смартфон Apple iPhone 14",
        description:
          "В этой модели установлены три основные камеры (48Мп, 12 Мп и 12 Мп) и фронтальный модуль (7 Мп), можно записывать видео в качестве 4К  с частотой 30 кадров в секунду. Основной широкоугольный объектив снабжён сапфировым защитным стеклом.",
        img: "https://2cent.ru/storage/photo/resized/xy_1500x1500/h/9ew12rpbj8gvoh6_29e7244d.jpg.webp",
        amount: 8,
        price: 62790,
        sale: 5,
        basket: 0,
        id: 1,
        category: ["Сматрфоны"],
        characteristics: [
          {
            id: 55,
            name: "Гарантия",
            value: "Нет",
          },
        ],
        comments: [
          {
            customer_id: 5664,
            product_id: 1,
            nameUser: "Борис Пончиков",
            img: [
              "https://udoba.org/sites/default/files/h5p/content/80704/images/image-64492edeab42e.jpg",
            ],
            text: "",
            rate: "5",
          },
          {
            customer_id: 4553,
            product_id: 1,
            nameUser: "Ирина Кышкова",
            img: [],
            text: "А здесь только текст",
            rate: "4",
          },
          {
            customer_id: 3442,
            product_id: 1,
            nameUser: "Марина Шишина",
            img: [],
            text: "",
            rate: "1",
          },
        ],
      },
      {
        name: "Смартфон Apple iPhone 13",
        description:
          "В этой модели 13 установлены две основные камеры (12 Мп и 12 Мп) и фронтальный модуль (12 Мп), с возможностью записи видео в качестве 4K с частотой до 60 кадров в секунду. Основной широкоугольный объектив защищён сапфировым стеклом, что обеспечивает дополнительную защиту от царапин.",
        img: "https://белоеяблоко.рф/upload/iblock/8dd/jq1tnfa8jnxig99ic7u5wfxkejqs3a6p.png",
        amount: 3,
        price: 58890,
        sale: 2,
        basket: 0,
        id: 2,
        category: ["Смартфоны"],
        characteristics: [
          {
            id: 55,
            name: "Гарантия",
            value: "Есть",
          },
        ],
        comments: [
          {
            customer_id: 5664,
            product_id: 2,
            nameUser: "Борис Пончиков",
            img: [],
            text: "А здесь только текст",
            rate: "1",
          },
          {
            customer_id: 4553,
            product_id: 2,
            nameUser: "Ирина Кышкова",
            img: [
              "https://a-a-ah-ru.s3.amazonaws.com/uploads/items/153611/319902/large_s1200.jpg",
            ],
            text: "Сегодня тут будут только куницы",
            rate: "3",
          },
          {
            customer_id: 3442,
            product_id: 2,
            nameUser: "Марина Шишина",
            img: [],
            text: "",
            rate: "2",
          },
        ],
      },
      {
        name: "Смартфон Samsung Galaxy S8",
        description:
          "В этой модели установлена основная камера с разрешением 12 Мп и фронтальный модуль на 8 Мп. Устройство поддерживает запись видео в качестве 4K с частотой 30 кадров в секунду. Основной объектив имеет диафрагму f/1.7, что позволяет делать качественные снимки даже при слабом освещении. Корпус защищён стеклом Gorilla Glass, обеспечивающим дополнительную прочность и защиту от повреждений.",
        img: "https://www.iqmac.ru/upload/iblock/e37/1.jpg",
        amount: 0,
        price: 24000,
        sale: 20,
        basket: 0,
        id: 3,
        category: ["Смартфоны"],
        characteristics: [
          {
            id: 55,
            name: "Гарантия",
            value: "",
          },
        ],
        comments: [
          {
            customer_id: 5664,
            product_id: 3,
            nameUser: "Борис Пончиков",
            img: [],
            text: "А здесь только текст",
            rate: "5",
          },
          {
            customer_id: 4553,
            product_id: 3,
            nameUser: "Ирина Кышкова",
            img: [],
            text: "",
            rate: "1",
          },
          {
            customer_id: 3442,
            product_id: 3,
            nameUser: "Марина Шишина",
            img: ["https://faunistics.com/wp-content/uploads/2020/01/1-5.jpg"],
            text: "",
            rate: "2",
          },
        ],
      },
      {
        name: "Наушники Apple AirPods Pro",
        description:
          "Наушники имеют активное шумоподавление и прозрачный режим звука для удобства. Адаптивный эквалайзер настраивает звук под ваши предпочтения. Они защищены от влаги по стандарту IPX4, что делает их подходящими для тренировок. Время работы — до 4,5 часов с активным шумоподавлением и до 24 часов с зарядным кейсом.",
        img: "https://cdn1.ozone.ru/s3/multimedia-w/6345193340.jpg",
        amount: 10,
        price: 21000,
        sale: 0,
        basket: 0,
        id: 4,
        category: ["Сопутствующие товары", "Аудиотехника", "Наушники"],
        characteristics: [
          {
            id: 55,
            name: "Гарантия",
            value: "Есть",
          },
        ],
        comments: [
          {
            customer_id: 5664,
            product_id: 4,
            nameUser: "Борис Пончиков",
            img: [
              "https://avatars.mds.yandex.net/i?id=2655e806052e59ba3a2c852dfffa6916_l-5369205-images-thumbs&n=13",
            ],
            text: "Сегодня тут будут только куницы",
            rate: "1",
          },
          {
            customer_id: 4553,
            product_id: 4,
            nameUser: "Ирина Кышкова",
            img: [],
            text: "А здесь только текст",
            rate: "2",
          },
          {
            customer_id: 3442,
            product_id: 4,
            nameUser: "Марина Шишина",
            img: [],
            text: "",
            rate: "3",
          },
        ],
      },
      {
        name: "Чехол для Huawei P50",
        description:
          "Чехол для телефона из качественного силикона с красивым и уникальным принтом плотно прилегает к кнопкам включения и регулировки громкости, повторяет линии корпуса смартфона, при этом не делает громоздким, является противоударным. Благодаря точному расположению функциональных отверстий не нужно его снимать при зарядке и прослушивании аудио. Так же поддерживается режим беспроводной зарядки.",
        img: "https://mypads.ru/image/cache/product_from_1688_654302381286/5ce646e44573d730-720x540.png",
        amount: 4,
        price: 688,
        sale: 50,
        basket: 0,
        id: 5,
        category: ["Сопутствующие товары", "Чехлы"],
        characteristics: [
          {
            id: 55,
            name: "Гарантия",
            value: "Нет",
          },
        ],
        comments: [
          {
            customer_id: 5664,
            product_id: 5,
            nameUser: "Борис Пончиков",
            img: [],
            text: "А здесь только текст",
            rate: "5",
          },
          {
            customer_id: 4553,
            product_id: 5,
            nameUser: "Ирина Кышкова",
            img: [
              "https://i.ytimg.com/vi/BODa7i57CDU/maxresdefault.jpg",
              "https://i.pinimg.com/736x/c6/3e/3d/c63e3d937d9a1367c41fb054afc3315b.jpg",
              "https://i.pinimg.com/originals/f7/a8/b7/f7a8b755b4500883e0ae0783881976a5.jpg",
            ],
            text: "Сегодня тут будут только куницы",
            rate: "4",
          },
          {
            customer_id: 3442,
            product_id: 5,
            nameUser: "Марина Шишина",
            img: [],
            text: "",
            rate: "5",
          },
        ],
      },
      {
        name: "Смартфон Huawei P50",
        description:
          "В этой модели установлены три основные камеры (48Мп, 12 Мп и 12 Мп) и фронтальный модуль (7 Мп), можно записывать видео в качестве 4К  с частотой 30 кадров в секунду. Основной широкоугольный объектив снабжён сапфировым защитным стеклом.",
        img: "https://cdn1.ozone.ru/s3/multimedia-n/6459263075.jpg",
        amount: 0,
        price: 59999,
        sale: 10,
        basket: 0,
        id: 6,
        category: ["Смартфоны"],
        characteristics: [
          {
            id: 55,
            name: "Гарантия",
            value: "Есть",
          },
        ],
        comments: [
          {
            customer_id: 5664,
            product_id: 6,
            nameUser: "Борис Пончиков",
            img: [],
            text: "",
            rate: "5",
          },
          {
            customer_id: 4553,
            product_id: 6,
            nameUser: "Ирина Кышкова",
            img: [],
            text: "",
            rate: "5",
          },
          {
            customer_id: 3442,
            product_id: 6,
            nameUser: "Марина Шишина",
            img: [
              "https://avatars.mds.yandex.net/i?id=8dd162b6c2705a7539bc699b260ce8ad_l-8231149-images-thumbs&n=13",
            ],
            text: "Сегодня тут будут только куницы",
            rate: "5",
          },
        ],
      },
    ],
  }),
  getters: {
    sortedProducts(state) {
      if (state.isLowerFirst) {
        return state.products.sort((prod1, prod2) => prod1.price - prod2.price);
      } else {
        return state.products.sort((prod1, prod2) => prod2.price - prod1.price);
      }
    },
    
  },
  actions: {
    deleteProduct(product) {
      this.products = this.products.filter((p) => p.id !== product.id);
    },
  },
});
