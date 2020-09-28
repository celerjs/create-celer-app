/*
* docs
1. title: 菜单栏名字
2. icon: 图标名字,
3. affix: 是否固定tag
4  keepAlive: 是否缓存页面  （一般有列表有跳详情的 建议缓存，按情况具体）

* 规范
1. route.name 必须首字母大写且唯一
2. route 对应的页面必须加name属性 对应 route.name
3. 子路由的 path 必须完整路径
货单: cubes  cube
*/
import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layouts";
// 解决重复点击
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: "/login",
    component: () => import(/* webpackChunkName: "index" */ "@/views/login"),
    hidden: true,
  },
  {
    path: "/account",
    hidden: true,
    component: Layout,
    children: [
      {
        path: "/account/settings",
        name: "AccountSettings",
        component: () =>
          import(/* webpackChunkName: "account" */ "@/views/account/settings"),
        meta: { title: "个人设置" },
      },
    ],
  },
  {
    path: "/401",
    name: "401",
    component: () => import(/* webpackChunkName: "index" */ "@/views/401"),
    hidden: true,
    meta: { title: "401" },
  },
  {
    path: "/404",
    name: "404",
    component: () => import(/* webpackChunkName: "index" */ "@/views/404"),
    hidden: true,
    meta: { title: "404" },
  },
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/views/redirect"),
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Index",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/views/index"),
        meta: {
          title: "首页",
          fasIcon: "home",
          affix: true,
          keepAlive: false,
        },
      },
    ],
  },
];

export const asyncRoutes = [
  {
    path: "/test",
    component: Layout,
    hidden: false,
    redirect: "/test/comp",
    meta: {
      title: "样例",
      fasIcon: "vial",
      affix: false,
      keepAlive: false,
    },
    children: [
      {
        path: "/test/comp",
        name: "Testcomp",
        component: () =>
          import(/* webpackChunkName: "test" */ "@/views/test/comp"),
        meta: {
          title: "组件样例",
          affix: false,
          keepAlive: false,
        },
      },
      {
        path: "/test/icon",
        name: "Testicon",
        component: () =>
          import(/* webpackChunkName: "test" */ "@/views/test/icon"),
        meta: {
          title: "Icon 样例",
          affix: false,
          keepAlive: false,
        },
      },
      {
        path: "/test/tab",
        name: "Testtab",
        component: () =>
          import(/* webpackChunkName: "test" */ "@/views/test/tab"),
        meta: {
          title: "Tab 切换样例",

          affix: false,
          keepAlive: false,
        },
      },
    ],
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const allrouter = constantRoutes.concat(asyncRoutes);

const router = new VueRouter({
  mode: "history",
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: allrouter,
});

export function resetRouter() {
  router.matcher = new VueRouter({
    mode: "history",
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: allrouter,
  }).matcher;
}

export default router;
