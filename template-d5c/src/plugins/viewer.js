import Viewer from "@/components/Viewer";
export default {
  install(Vue) {
    function viewer(data = {}) {
      const { close, onSwitch, ...restProps } = data;
      const ViewerConstructor = Vue.extend(Viewer);
      const instance = new ViewerConstructor({
        el: document.createElement("div"),
        propsData: {
          ...restProps,
        },
      });
      if (close) {
        instance.$on("close", close);
      }
      if (onSwitch) {
        instance.$on("onSwitch", onSwitch);
      }
      document.querySelector("body").appendChild(instance.$el);
    }
    Vue.prototype.$viewer = viewer;
    return confirm;
  },
};
