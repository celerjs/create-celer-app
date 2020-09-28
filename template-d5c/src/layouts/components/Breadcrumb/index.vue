<template>
  <el-breadcrumb class="breadcrumb-container" separator=">">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span
        v-if="item.redirect === 'noRedirect' || index === levelList.length - 1"
        class="no-redirect"
      >
        <fas-icon v-if="item.meta.fasIcon" :icon="['fas', item.meta.fasIcon]" />
        {{ item.meta.title }}
      </span>
      <span v-else style="cursor: pointer" @click.prevent="handleLink(item)">
        <fas-icon v-if="item.meta.fasIcon" :icon="['fas', item.meta.fasIcon]" />
        {{ item.meta.title }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { compile } from "path-to-regexp";

export default {
  name: "Breadcrumb",
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];

      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isIndex(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === "Index".toLocaleLowerCase();
    },
    pathCompile(path) {
      const { params } = this.$route;
      const toPath = compile(path);
      return toPath(params);
    },
    handleLink(item) {
      console.log("handleLink -> item", compile(item.path));
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  display: inline-block;
  font-size: $base-font-size-default;
  line-height: $base-nav-bar-height;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;

  .no-redirect {
    color: $base-color-gray;
    cursor: text;
  }
}
</style>
