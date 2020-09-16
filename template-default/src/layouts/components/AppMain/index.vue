<template>
  <div>
    <section class="app-main-container">
      <skeleton-wrap v-if="show && skeleton" style="margin: 15px">
        <skeleton-heading :img="true" />
        <skeleton-text :lines="8" />
        <skeleton-heading :img="true" />
        <skeleton-text :lines="8" />
        <skeleton-heading :img="true" />
        <skeleton-text :lines="8" />
      </skeleton-wrap>

      <router-view :key="routerKey" />
    </section>
  </div>
</template>
<script>
import { skeleton } from "@/config/settings";

import {
  SkeletonWrap,
  SkeletonHeading,
  SkeletonText,
} from "@/layouts/components/Skeleton";

export default {
  name: "AppMain",
  components: {
    SkeletonWrap,
    SkeletonHeading,
    SkeletonText,
  },
  data() {
    return {
      skeleton,
      show: true,
      cachedRoutes: [], // TODO:
      tagsBarSkeleton: true, // TODO:
    };
  },
  computed: {
    routerKey() {
      return this.$route.path;
    },
  },
  watch: {
    $route() {
      console.log(111);
      if (this.tagsBarSkeleton) {
        this.handleSkeleton();
      } else {
        this.show = false;
      }

      //   TODO: 手机
      //   this.$nextTick(() => {
      //     if ("mobile" === this.device) {
      //       this.$store.dispatch("settings/foldSideBar");
      //     }
      //   });
    },
  },
  mounted() {
    this.handleSkeleton();
  },
  methods: {
    handleSkeleton() {
      this.show = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.show = false;
        }, 300);
      });
    },
  },
};
</script>
