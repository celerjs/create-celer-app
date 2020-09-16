<template>
  <div class="layout-wrapper">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>

    <div v-if="layout === 'horizontal'" class="horizontal">
      <app-main />
    </div>
    <div v-if="layout === 'vertical'" class="vertical">
      <app-main />
    </div>
    <a-back-top v-if="backtop" />
  </div>
</template>
<script>
import AppMain from "./components/AppMain";
import { backtop, layout } from "@/config/settings";
export default {
  components: { AppMain },
  data() {
    return {
      backtop,
      layout,
    };
  },
};
</script>
