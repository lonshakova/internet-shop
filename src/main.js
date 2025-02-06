import { createApp } from "vue";
import App from "./App.vue";

//Vue-Router
import router from "./router/router.js";

//Pinia
import { createPinia } from "pinia";
import { markRaw } from "vue";
const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
  store.router = markRaw(router);

});

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import { VTreeview } from "vuetify/labs/VTreeview";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components: {
    ...components,
    VTreeview,
  },
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

createApp(App).use(vuetify).use(pinia).use(router).mount("#app");
