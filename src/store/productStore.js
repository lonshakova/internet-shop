import { defineStore } from 'pinia'

export const useProductStore = defineStore({
  id: 'products',
  state: () => ({
    nameUser: "Борис",
    surnameUser: "Пончиков",
    isEntered: true,
    isLowerFirst: true,
    isAdmin: true,
    basket: [],
    basketForBuying: [],
    availabilitysSelection: ["В наличии", "Мало"],
    filters:[{
      name: "Наличие",
      selecton:["В наличии", "Мало"],  
      items: ["В наличии", "Мало", "Нет в наличии"]
    },
    {
      name: "Цена",
      selecton:["до 1000", "1001-5000", "5001-10000","10001-50000","от 50000"],  
      items: ["до 1000", "1001-5000", "5001-10000","10001-50000","от 50000"]
    },
    {
      name: "Гарантия",
      selecton:["В наличии", "Мало"],  
      items: ["Есть", "Нет"]
    },
  ],
    products: [{
      name: "Смартфон Apple iPhone 14",
      description:
        "В этой модели установлены три основные камеры (48Мп, 12 Мп и 12 Мп) и фронтальный модуль (7 Мп), можно записывать видео в качестве 4К  с частотой 30 кадров в секунду. Основной широкоугольный объектив снабжён сапфировым защитным стеклом.",
      img: "https://2cent.ru/storage/photo/resized/xy_1500x1500/h/9ew12rpbj8gvoh6_29e7244d.jpg.webp",
      quantity: 8,
      price: 62790,
      basket: 0,
      id: 1,
      comments:[{
        nameUser:"Борис Пончиков",
        img:"https://udoba.org/sites/default/files/h5p/content/80704/images/image-64492edeab42e.jpg",
        text:"",
        rate:"5",
      },
      {
        nameUser:"Борис Пончиков",
        img:"",
        text:"А здесь только текст",
        rate:"4",
      },
      {
        nameUser:"Борис Пончиков",
        img:"",
        text:"",
        rate:"1",
      },
    ]
    },
    {
      name: "Смартфон Apple iPhone 13",
      description:
        "В этой модели 13 установлены две основные камеры (12 Мп и 12 Мп) и фронтальный модуль (12 Мп), с возможностью записи видео в качестве 4K с частотой до 60 кадров в секунду. Основной широкоугольный объектив защищён сапфировым стеклом, что обеспечивает дополнительную защиту от царапин.",
      img: "https://белоеяблоко.рф/upload/iblock/8dd/jq1tnfa8jnxig99ic7u5wfxkejqs3a6p.png",
      quantity: 3,
      price: 58890,
      basket: 0,
      id: 2,
      comments:[{
        nameUser:"Борис Пончиков",
        img:"",
        text:"А здесь только текст",
        rate:"1",
      },
      {
        nameUser:"Борис Пончиков",
        img:"https://a-a-ah-ru.s3.amazonaws.com/uploads/items/153611/319902/large_s1200.jpg",
        text:"Сегодня тут будут только куницы",
        rate:"3",
      },
      {
        nameUser:"Борис Пончиков",
        img:"",
        text:"",
        rate:"2",
      },
    ]
    },
    {
      name: "Смартфон Samsung Galaxy S8",
      description:
        "В этой модели установлена основная камера с разрешением 12 Мп и фронтальный модуль на 8 Мп. Устройство поддерживает запись видео в качестве 4K с частотой 30 кадров в секунду. Основной объектив имеет диафрагму f/1.7, что позволяет делать качественные снимки даже при слабом освещении. Корпус защищён стеклом Gorilla Glass, обеспечивающим дополнительную прочность и защиту от повреждений.",
      img: "https://www.iqmac.ru/upload/iblock/e37/1.jpg",
      quantity: 0,
      price: 24000,
      basket: 0,
      id: 3,
      comments:[{
        nameUser:"Борис Пончиков",
        img:"",
        text:"А здесь только текст",
        rate:"5",
      },
      {
        nameUser:"Борис Пончиков",
        img:"",
        text:"",
        rate:"1",
      },
      {
        nameUser:"Борис Пончиков",
        img:"https://faunistics.com/wp-content/uploads/2020/01/1-5.jpg",
        text:"",
        rate:"2",
      },
    ]
    },
    {
      name: "Наушники Apple AirPods Pro",
      description:
        "Наушники имеют активное шумоподавление и прозрачный режим звука для удобства. Адаптивный эквалайзер настраивает звук под ваши предпочтения. Они защищены от влаги по стандарту IPX4, что делает их подходящими для тренировок. Время работы — до 4,5 часов с активным шумоподавлением и до 24 часов с зарядным кейсом.",
      img: "https://cdn1.ozone.ru/s3/multimedia-w/6345193340.jpg",
      quantity: 10,
      price: 21000,
      basket: 0,
      id: 4,
      comments:[{
        nameUser:"Борис Пончиков",
        img:"https://avatars.mds.yandex.net/i?id=2655e806052e59ba3a2c852dfffa6916_l-5369205-images-thumbs&n=13",
        text:"Сегодня тут будут только куницы",
        rate:"1",
      },
      {
        nameUser:"Борис Пончиков",
        img:"",
        text:"А здесь только текст",
        rate:"2",
      },
      {
        nameUser:"Борис Пончиков",
        img:"",
        text:"",
        rate:"3",
      },
    ]
    },
    {
      name: "Чехол для Huawei P50",
      description:
        "Чехол для телефона из качественного силикона с красивым и уникальным принтом плотно прилегает к кнопкам включения и регулировки громкости, повторяет линии корпуса смартфона, при этом не делает громоздким, является противоударным. Благодаря точному расположению функциональных отверстий не нужно его снимать при зарядке и прослушивании аудио. Так же поддерживается режим беспроводной зарядки.",
      img: "https://mypads.ru/image/cache/product_from_1688_654302381286/5ce646e44573d730-720x540.png",
      quantity: 4,
      price: 688,
      basket: 0,
      id: 5,
      comments:[{
        nameUser:"Борис Пончиков",
        img:"",
        text:"А здесь только текст",
        rate:"5",
      },
      {
        nameUser:"Борис Пончиков",
        img:"https://i.ytimg.com/vi/BODa7i57CDU/maxresdefault.jpg",
        text:"Сегодня тут будут только куницы",
        rate:"4",
      },
      {
        nameUser:"Борис Пончиков",
        img:"",
        text:"",
        rate:"5",
      },
    ]
    },
    {
      name: "Смартфон Huawei P50",
      description:
        "В этой модели установлены три основные камеры (48Мп, 12 Мп и 12 Мп) и фронтальный модуль (7 Мп), можно записывать видео в качестве 4К  с частотой 30 кадров в секунду. Основной широкоугольный объектив снабжён сапфировым защитным стеклом.",
      img: "https://cdn1.ozone.ru/s3/multimedia-n/6459263075.jpg",
      quantity: 0,
      price: 59999,
      basket: 0,
      id: 6,
      comments:[{
        nameUser:"Борис Пончиков",
        img:"",
        text:"",
        rate:"5",
      },
      {
        nameUser:"Борис Пончиков",
        img:"",
        text:"",
        rate:"5",
      },
      {
        nameUser:"Борис Пончиков",
        img:"https://avatars.mds.yandex.net/i?id=8dd162b6c2705a7539bc699b260ce8ad_l-8231149-images-thumbs&n=13",
        text:"Сегодня тут будут только куницы",
        rate:"5",
      },
    ]
    }]
  }),
  getters: {
    sortedProducts(state) {
      if (state.isLowerFirst) {
        return state.products.sort((prod1, prod2) => prod1.price - prod2.price);
      }
      else {
        return state.products.sort((prod1, prod2) => prod2.price - prod1.price);
      }
    }
  }
})