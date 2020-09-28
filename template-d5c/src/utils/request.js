import Vue from "vue";
import axios from "axios";
import { debounce, productId } from "@/config/settings";
import store from "@/store";

import router from "@/router";

let loadingInstance;

// 判断当前url是否需要加loading

const needLoading = (config) => {
  let status = false;
  debounce.forEach((item) => {
    if (config.url.includes(item)) {
      status = true;
    }
  });
  return status;
};

const noPermissionCode = 401;
const successCode = 200;
const requestTimeout = 5000;

const handleCode = (code, msg) => {
  switch (code) {
    case noPermissionCode:
      router.push({ path: "/401" }).catch(() => {});
      break;
    default:
      Vue.prototype.$baseMessage(msg || `后端接口 ${code} 异常`, "error");
      break;
  }
};

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: requestTimeout,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    // 添加统一头部
    config.headers.product_id = productId;

    store.getters["user/accessToken"] &&
      (config.headers.token = store.getters["user/userInfo"].token);

    store.getters["user/userId"] &&
      (config.headers.user_id = store.getters["user/userId"]);

    store.getters["user/userInfo"].companyId &&
      (config.headers.cpy_id = store.getters["user/userInfo"].companyId);

    store.getters["user/userInfo"].userType &&
      (config.headers.user_type = store.getters["user/userInfo"].userType);

    store.getters["user/userInfo"].companyType &&
      (config.headers.cpy_type = store.getters["user/userInfo"].companyType);

    store.getters["user/userInfo"].dataType &&
      (config.headers.dt_type = store.getters["user/userInfo"].dataType);

    config.headers.op_code = config.headers.op_code || "";
    config.headers.op_ncode = config.headers.op_ncode || "";

    if (needLoading(config)) {
      loadingInstance = Vue.prototype.$baseLoading();
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (loadingInstance) loadingInstance.close();

    const { data, config } = response;
    const { a, msg } = data;

    // 是否操作正常
    if (+a === successCode) {
      return data;
    } else {
      handleCode(a, msg);
      return Promise.reject(
        "请求异常拦截:" + JSON.stringify({ url: config.url, a, msg }) || "Error"
      );
    }
  },
  (error) => {
    if (loadingInstance) loadingInstance.close();
    const { response, message } = error;
    if (error.response && error.response.data) {
      const { status, data } = response;
      handleCode(status, data.msg || message);
      return Promise.reject(error);
    } else {
      let { message } = error;
      if (message === "Network Error") {
        message = "后端接口连接异常";
      }
      if (message.includes("timeout")) {
        message = "后端接口请求超时";
      }
      if (message.includes("Request failed with status code")) {
        const code = message.substr(message.length - 3);
        message = "后端接口 aa" + code + " 异常";
      }
      Vue.prototype.$baseMessage(message || `后端接口未知异常`, "error");
      return Promise.reject(error);
    }
  }
);

export default instance;
