<template>
  <div :class="className" />
</template>

<script>
export default {
  name: "SkeletonImg",
  data() {
    return {
      className: "vue-skeleton-img",
    };
  },
};
</script>
