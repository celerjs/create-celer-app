import { getInfo } from "@/api/user";
import router from "@/router";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
  getUserId,
  removeUserId,
  setUserId,
} from "@/utils/accessToken";
const state = {
  accessToken: getAccessToken(),
  userId: getUserId() || "",
  username: "马可波罗",
  avatar: "/static/images/user.svg",
  userInfo: "",
};
const getters = {
  accessToken: (state) => state.accessToken,
  avatar: (state) => state.avatar,
  username: (state) => state.username,
  userId: (state) => state.userId,
  userInfo: (state) => state.userInfo,
};
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
  },
  setUserId(state, userId) {
    state.userId = userId;
  },
  setUsername(state, username) {
    state.username = username;
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
};

const actions = {
  setTokenAndId({ commit }, info) {
    commit("setAccessToken", info.token || "");
    commit("setUserId", info.userId || "");
    // 浏览器缓存
    setAccessToken(info.token);
    setUserId(info.userId);
  },
  setUserInfo({ commit }, info) {
    commit("setUsername", info.username);
    commit("setUserInfo", info);
  },
  logout({ commit }) {
    commit("setAccessToken", "");
    commit("setUserId", "");
    commit("setUsername", "");
    commit("setUserInfo", "");
    removeAccessToken();
    removeUserId();
    router.push("/login");
  },
  getInfo({ dispatch }) {
    return getInfo()
      .then((res) => {
        dispatch("setUserInfo", res);
      })
      .catch(() => {
        Vue.prototype.$baseMessage("获取登录用户信息失败", "error");
        throw new Error("获取登录用户信息失败");
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
