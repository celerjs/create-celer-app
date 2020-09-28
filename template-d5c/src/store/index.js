import Vue from "vue";
import Vuex from "vuex";
import { productId } from "@/config/settings";

Vue.use(Vuex);

const modulesFiles = require.context("./modules", false, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/(\.\/|\.js)/g, "");
  modules[moduleName] = modulesFiles(modulePath).default;
  modules[moduleName]["namespaced"] = true;
  return modules;
}, {});

const getters = {
  // 只放公共常用的 其他放置自己模块store
  productId: () => productId,
};

const store = new Vuex.Store({
  modules,
  getters,
});
export default store;
