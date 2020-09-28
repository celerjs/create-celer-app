import store from "@/store";

export default {
  beforeMount() {
    window.addEventListener("resize", this.$_resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$_resizeHandler);
  },
  mounted() {
    const isMobile = this.$_isMobile();
    if (isMobile) {
      store.dispatch("settings/toggleDevice", "mobile");
      setTimeout(() => {
        store.dispatch("settings/closeSideBar");
      }, 2000);
    } else {
      store.dispatch("settings/openSideBar");
    }
  },
  methods: {
    $_isMobile() {
      const WIDTH = 992; // refer to Bootstrap's responsive design
      return document.body.getBoundingClientRect().width - 1 < WIDTH;
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile();
        store.dispatch(
          "settings/toggleDevice",
          isMobile ? "mobile" : "desktop"
        );
      }
    },
  },
};
