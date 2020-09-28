import Vue from "vue";
import ElementUI from "element-ui";

import "@/styles/element-variables.scss";

// Element 额外提供了一系列类名，用于在某些条件下隐藏元素
import "element-ui/lib/theme-chalk/display.css";

Vue.use(ElementUI, {
  size: "small",
});
