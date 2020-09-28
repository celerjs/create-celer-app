<template>
  <div class="logo-container">
    <router-link to="/">
      <img v-if="logo" class="logo" src="https://dogged.cn/logo.svg" />
      <span class="title hidden-xs-only" :title="title">
        {{ title }}
      </span>
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { logo } from "@/config/settings";
export default {
  name: "Logo",
  data() {
    return {
      title: this.$baseTitle,
    };
  },
  computed: {
    ...mapGetters({
      logo: "settings/logo",
    }),
  },
};
</script>
<style lang="scss" scoped>
@mixin container {
  position: relative;
  height: $base-nav-bar-height;
  overflow: hidden;
  line-height: $base-nav-bar-height;
  background: $base-menu-background;
  padding-left: calc((#{$base-left-menu-width-min} - 36px) / 2);
}

@mixin logo {
  display: inline-block;
  width: 36px;
  height: 36px;
  margin: 0;
  color: $base-title-color;
  vertical-align: middle;
}

@mixin title {
  display: inline-block;
  overflow: hidden;
  margin-left: 20px;
  font-size: 18px;
  font-weight: 600;
  color: $base-title-color;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}

.logo-container {
  a {
    display: flex;
    align-items: center;
    height: 100%;
  }
  @include container;

  .logo {
    @include logo;
  }

  .title {
    @include title;
    max-width: 140px;
  }
}
</style>
