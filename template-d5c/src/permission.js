/**
 * @description 路由守卫
 */
import router from "@/router";
import store from "@/store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import getPageTitle from "@/utils/pageTitle";
NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  let hasToken = store.getters["user/accessToken"];
  if (hasToken) {
    if (to.path === "/login") {
      next("/");
      NProgress.done();
    } else {
      try {
        // userInfo
        const userInfo = store.getters["user/userInfo"];
        if (!userInfo.userId) {
          await store.dispatch("user/getInfo");
        }
        next();
        NProgress.done();
      } catch (error) {
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  } else {
    if (to.path === "/login") {
      next();
      NProgress.done();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
