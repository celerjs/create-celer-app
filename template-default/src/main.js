import app from "./App";

import router from "./router";
import store from "./store";

// 全局
import "./plugins";

app.use(store).use(router).mount("#app");
