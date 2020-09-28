<template>
  <div class="admin-wrapper" :class="device === 'mobile' ? 'mobile' : ''">
    <div class="layout-container">
      <div
        v-if="device === 'mobile' && collapse === false"
        class="mask"
        @click="closeSideBar"
      />
      <div
        class="sidebar-container"
        :class="collapse ? 'is-collapse-sidebar' : ''"
      >
        <side-bar></side-bar>
      </div>
      <div class="main-container" :class="collapse ? 'is-collapse-main' : ''">
        <div class="fixed-header">
          <nav-bar></nav-bar>
        </div>
        <div class="app-main-container">
          <!-- <router-view></router-view> -->
          <app-main></app-main>
        </div>
      </div>
    </div>
    <back-to-top transition-name="fade"></back-to-top>
  </div>
</template>
<script>
import { BackToTop, NavBar, SideBar, AppMain } from "./components";
import Media from "./mixin/Media";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    BackToTop,
    NavBar,
    SideBar,
    AppMain,
  },
  mixins: [Media],
  computed: {
    ...mapGetters({
      collapse: "settings/collapse",
      device: "settings/device",
    }),
  },
  methods: {
    ...mapActions({
      closeSideBar: "settings/closeSideBar",
    }),
  },
};
</script>
<style lang="scss" scoped>
.layout-container {
  position: relative;
  height: 100%;
  width: 100%;
  .sidebar-container {
    transition: width 0.28s;
    background-color: $base-menu-background;
    height: 100%;
    position: fixed;
    // font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    width: $base-left-menu-width;
    &.is-collapse-sidebar {
      width: $base-left-menu-width-min;
    }
  }
  .main-container {
    min-height: 100%;
    -webkit-transition: margin-left 0.28s;
    transition: margin-left 0.28s;
    margin-left: $base-left-menu-width;
    position: relative;
    transition: margin-left 0.28s;
    .fixed-header {
      position: fixed;
      z-index: 998;
      top: 0;
      right: 0;
      height: $base-nav-bar-height;
      overflow: hidden;
      left: $base-left-menu-width;

      transition: left 0.28s;
    }
    &.is-collapse-main {
      margin-left: $base-left-menu-width-min;
      .fixed-header {
        left: $base-left-menu-width-min;
      }
    }
    .app-main-container {
      padding-top: $base-nav-bar-height;
    }
  }
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #000;
    opacity: 0.5;
  }
}
.admin-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  &.mobile {
    .sidebar-container.is-collapse-sidebar {
      width: 0;
    }
    .main-container {
      margin-left: 0 !important;
      .fixed-header {
        left: 0 !important;
      }
    }
  }
}
</style>
