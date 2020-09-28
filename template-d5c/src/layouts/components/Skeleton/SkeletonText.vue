<template>
  <div :class="className">
    <div v-for="n in lines" :key="n" :class="`${className}__line`" />
  </div>
</template>

<script>
export default {
  name: "SkeletonText",
  props: {
    lines: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      className: "vue-skeleton-text",
    };
  },
};
</script>
