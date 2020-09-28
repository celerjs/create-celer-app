<template>
  <div class="nav-bar-container">
    <el-row :gutter="15">
      <el-col :xs="16" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="left-panel">
          <i
            :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            :title="collapse ? '展开' : '收起'"
            class="fold-unfold"
            @click="handleCollapse"
          ></i>
          <breadcrumb />
        </div>
      </el-col>
      <el-col :xs="8" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="right-panel">
          <avatar></avatar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { Avatar, Breadcrumb } from "@/layouts/components";

export default {
  name: "NavBar",
  components: {
    Avatar,
    Breadcrumb,
  },
  data() {
    return {
      pulse: false,
    };
  },
  computed: {
    ...mapGetters({
      collapse: "settings/collapse",
      device: "settings/device",
    }),
  },
  methods: {
    handleCollapse() {
      this.$store.dispatch("settings/changeCollapse");
    },
    async refreshRoute() {
      const view = this.visitedRoutes.find(
        (item) => item.fullPath === this.$route.fullPath
      );
      this.pulse = true;
      await this.$store.dispatch("tagsBar/delCachedRoutes", view);
      await this.$router.replace({
        path: "/redirect" + this.$route.fullPath,
      });
      setTimeout(() => {
        this.pulse = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar-container {
  position: relative;
  height: $base-nav-bar-height;
  overflow: hidden;
  user-select: none;
  background: $base-color-white;
  box-shadow: $base-box-shadow;
  .left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    height: $base-nav-bar-height;
    max-height: $base-nav-bar-height;

    .fold-unfold {
      margin-left: 10px;
      font-size: 20px;
      color: $base-font-color;
      cursor: pointer;
    }

    ::v-deep {
      .breadcrumb-container {
        margin-left: 10px;
      }
    }
  }

  .right-panel {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    height: $base-nav-bar-height;

    ::v-deep {
      .user-avatar {
        margin-right: 5px;
        font-weight: 600;
        cursor: pointer;
      }

      .user-name {
        position: relative;
        top: -14px;
        margin-right: 35px;
        margin-left: 5px;
        font-weight: 600;
        cursor: pointer;
      }

      .user-name + i {
        position: absolute;
        top: 14px;
        right: 15px;
      }

      svg {
        width: 1em;
        height: 1em;
        margin-right: 15px;
        font-size: $base-font-size-big;
        color: $base-font-color;
        cursor: pointer;
        fill: $base-font-color;
      }

      button {
        svg {
          margin-right: 0;
          color: $base-color-white;
          cursor: pointer;
          fill: $base-color-white;
        }
      }

      .el-badge {
        margin-right: 15px;
      }
    }
  }
}
</style>
