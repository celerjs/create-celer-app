import defaultSettings from "@/config/settings";
const { logo, skeleton } = defaultSettings;
const state = {
  logo,
  collapse: false,
  skeleton,
  device: "desktop",
};
const getters = {
  collapse: (state) => state.collapse,
  device: (state) => state.device,
  logo: (state) => state.logo,
  skeleton: (state) => state.skeleton,
};
const mutations = {
  changeCollapse: (state) => {
    state.collapse = !state.collapse;
  },
  closeSideBar: (state) => {
    state.collapse = true;
  },
  openSideBar: (state) => {
    state.collapse = false;
  },
  toggleDevice: (state, device) => {
    state.device = device;
  },
};
const actions = {
  changeCollapse({ commit }) {
    commit("changeCollapse");
  },
  closeSideBar({ commit }) {
    commit("closeSideBar");
  },
  openSideBar({ commit }) {
    commit("openSideBar");
  },
  toggleDevice({ commit }, device) {
    commit("toggleDevice", device);
  },
};
export default { state, getters, mutations, actions };
