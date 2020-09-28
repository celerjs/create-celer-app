import Vue from "vue";
Vue.config.productionTip = false;
import App from "./App.vue";
import store from "./store";
import router from "./router";
// 全局插件
import "./plugins";

// 全局函数
import init from "./init";
Vue.use(init);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
