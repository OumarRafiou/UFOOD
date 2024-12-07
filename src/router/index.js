import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Restaurant from "@/views/Restaurant.vue";
import User from "@/views/User";
import Register from "@/views/Register.vue";
import Connexion from "@/views/Connexion.vue";
import NotFound from "@/views/NotFound.vue";
import Cookies from "js.cookie";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      const token = Cookies.get("connectionToken");
      if (!token) {
        next({ name: "Connexion" });
      } else {
        next();
      }
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/connexion",
    name: "Connexion",
    component: Connexion,
  },
  {
    path: "/restaurant/:id",
    name: "Restaurant",
    component: Restaurant,
  },
  {
    path: "/user/:currentUserID",
    name: "User",
    component: User,
    props: (route) => {
      return { currentUserID: route.params.currentUserID };
    },
    beforeEnter: (to, from, next) => {
      const token = Cookies.get("connectionToken");
      if (!token) {
        next({ name: "Connexion" });
      } else {
        next();
      }
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
    beforeEnter: (to, from, next) => {
      next({ name: "Home" });
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
