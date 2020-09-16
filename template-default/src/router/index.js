import { createRouter, createWebHistory } from "vue-router";
// import {  routerMode } from "@/config/settings";
import Empty from "@/layouts/Empty";
import Default from "@/layouts/Default";

const routes = [
  {
    path: "/",
    component: Default,
    children: [
      {
        path: "",
        name: "Index",
        component: () => import("@/views/Home.vue"),
        meta: {
          title: "首页",
        },
      },
    ],
  },

  {
    path: "/login",
    component: Empty,
    redirect: "",
    children: [
      {
        path: "",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        meta: {
          title: "首页",
        },
      },
    ],
  },
  {
    path: "/about",
    component: Default,
    children: [
      {
        path: "",
        name: "About",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: {
          title: "About",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
