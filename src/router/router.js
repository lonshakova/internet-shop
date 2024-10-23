import { createWebHistory, createRouter } from "vue-router";

import MainPage from "../pages/MainPage.vue";
import LogInPage from "../pages/LogInPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/login',
    component: LogInPage
  },
  {
    path: '/signup',
    component: SignUpPage
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;