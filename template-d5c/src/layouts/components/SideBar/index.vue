<template>
  <div>
    <logo />
    <el-scrollbar class="scrollbar-container">
      <el-menu
        :background-color="variables['menu-background']"
        :text-color="variables['menu-color']"
        :active-text-color="variables['menu-color-active']"
        :default-active="activeMenu"
        :collapse="collapse"
        :collapse-transition="false"
        :default-openeds="defaultOpens"
        :unique-opened="uniqueOpened"
        mode="vertical"
      >
        <side-bar-item
          v-for="route in allroutes"
          :key="route.path"
          :base-path="route.path"
          :item="route"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import Logo from "@/layouts/components/Logo";
import SideBarItem from "./components/SideBarItem";
import { mapGetters } from "vuex";
import variables from "@/styles/variables.scss";
import { defaultOopeneds, uniqueOpened } from "@/config/settings";
export default {
  name: "SideBar",
  components: { Logo, SideBarItem },
  data() {
    return {
      uniqueOpened,
    };
  },
  computed: {
    ...mapGetters({
      collapse: "settings/collapse",
      allroutes: "permission/allroutes",
    }),
    defaultOpens() {
      if (this.collapse) {
      }
      return defaultOopeneds;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    },
  },
};
</script>
<style lang="scss" scoped>
$a: #aaa;
@mixin active {
  &:hover {
    color: $base-color-white !important;
    background-color: $base-menu-background-hover !important;
    &::before {
      content: "";
      position: absolute;
      width: 4px;
      height: 100%;
      left: 0;
      top: 0;
      background: $base-menu-left-active;
    }
  }

  &.is-active {
    color: $base-color-white !important;
    background-color: $base-menu-background-active !important;
    &::before {
      content: "";
      position: absolute;
      width: 4px;
      height: 100%;
      left: 0;
      top: 0;
      background: $base-menu-left-active;
    }
  }
}
.scrollbar-container {
  overflow-x: hidden;
  height: calc(100vh - #{$base-nav-bar-height});
  ::v-deep {
    .el-scrollbar__view {
      overflow-x: hidden;
    }

    .el-menu {
      border: 0;
    }
    .el-menu-item {
      height: 46px !important;
      overflow: hidden;
      line-height: 46px !important;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      @include active;
    }
    .nest-menu {
      .el-menu-item {
        background-color: $base-menu-children-background !important;
        color: $base-menu-color;
        @include active;
      }

      .el-submenu .el-menu-item {
        background-color: $base-menu-children-background !important;
        color: $base-menu-color;
        @include active;
      }
    }
  }
}
</style>
