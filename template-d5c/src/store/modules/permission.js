import { asyncRoutes, constantRoutes } from "@/router";
const allroutes = constantRoutes.concat(asyncRoutes);
const cachedRoutes = [];
allroutes.forEach((route) => {
  if (route?.meta?.keepAlive) {
    cachedRoutes.push(route.name);
  }
});
const state = {
  allroutes,
  cachedRoutes,
};
const getters = {
  allroutes: (state) => state.allroutes,
  cachedRoutes: (state) => state.cachedRoutes,
};
const mutations = {
  setAllroutes(state, allroutes) {
    state.allroutes = allroutes;
  },
  syncCachedRoutes(state) {
    const arr = [];
    state.allroutes.forEach((route) => {
      if (route?.meta?.keepAlive) {
        arr.push(route.name);
      }
    });
    state.cachedRoutes = arr;
  },
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
