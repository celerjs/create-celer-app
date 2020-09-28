<template>
  <el-submenu
    ref="subMenu"
    :index="handlePath(item.path)"
    :popper-append-to-body="false"
  >
    <template slot="title">
      <fas-icon
        v-if="item.meta && item.meta.fasIcon"
        :icon="['fas', item.meta.fasIcon]"
        class="nav-icon fas-icon"
      />
      <svg-icon
        v-if="item.meta && item.meta.svgIcon"
        :icon-class="item.meta.svgIcon"
        class="nav-icon svg-icon"
      />
      <span>{{ item.meta.title }}</span>
    </template>
    <slot></slot>
  </el-submenu>
</template>

<script>
import { isExternal } from "@/utils/validate";
import path from "path";

export default {
  name: "Submenu",
  props: {
    routeChildren: {
      type: Object,
      default() {
        return null;
      },
    },
    item: {
      type: Object,
      default() {
        return null;
      },
    },
    fullPath: {
      type: String,
      default: "",
    },
  },
  methods: {
    handlePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.fullPath)) {
        return this.fullPath;
      }
      return path.resolve(this.fullPath, routePath);
    },
  },
};
</script>
