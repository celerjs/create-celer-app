<template>
  <section class="app-main">
    <keep-alive :include="cachedRoutes" :max="10">
      <router-view :key="key" />
    </keep-alive>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AppMain",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      cachedRoutes: "permission/cachedRoutes",
      device: "settings/device",
    }),
    key() {
      return this.$route.path;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.app-main {
  margin: 10px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
}
</style>
