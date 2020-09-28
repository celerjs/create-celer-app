<template>
  <div :class="className">
    <div v-if="img" :class="`${className}__img`" />
    <div :class="`${className}__content`">
      <div :class="`${className}__title`" />
      <div :class="`${className}__subtitle`" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SkeletonHeading",
  props: {
    img: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      className: "vue-skeleton-heading",
    };
  },
};
</script>
