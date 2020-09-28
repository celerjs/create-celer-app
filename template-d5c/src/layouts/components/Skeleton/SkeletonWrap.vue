<template>
  <div :class="classObject">
    <slot />
  </div>
</template>

<script>
export default {
  name: "SkeletonWrap",
  props: {
    rounded: {
      type: Boolean,
      default: false,
    },
    centered: {
      type: Boolean,
      default: false,
    },
    animated: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    classObject() {
      return {
        "vue-skeleton": true,
        "vue-skeleton-is-rounded": this.rounded,
        "vue-skeleton-is-centered": this.centered,
        "vue-skeleton-is-animated": this.animated,
      };
    },
  },
};
</script>

<style lang="scss">
$vue-skeleton-primary-color: #ccc !default;
$vue-skeleton-secondary-color: #eee !default;
$vue-skeleton-border-radius: 6px !default;
$vue-skeleton-line-height: 15px !default;
$vue-skeleton-spacing: 10px !default;

@keyframes vueKeelAnimation {
  0% {
    transform: translate3d(-30%, 0, 0);
  }

  100% {
    transform: translate3d(100%, 0, 0);
  }
}

@mixin vue-skeleton {
  position: relative;
  overflow: hidden;
  height: $vue-skeleton-line-height;
  background: $vue-skeleton-secondary-color;

  .vue-skeleton-is-rounded & {
    border-radius: $vue-skeleton-border-radius;
  }

  .vue-skeleton-is-centered & {
    margin-left: auto;
    margin-right: auto;
  }

  .vue-skeleton-is-animated &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    max-width: 1000px;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent 0%,
      darken($vue-skeleton-secondary-color, 5%) 15%,
      transparent 30%
    );
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: vueKeelAnimation;
    animation-timing-function: linear;
  }
}

@mixin vue-skeleton-spacing {
  [class^="vue-skeleton-"] + & {
    margin-top: 2 * $vue-skeleton-spacing;
  }
}

.vue-skeleton-heading {
  @include vue-skeleton-spacing;
  display: flex;

  &__img {
    @include vue-skeleton;
    width: 2 * $vue-skeleton-line-height + 3 * $vue-skeleton-spacing;
    height: 2 * $vue-skeleton-line-height + 3 * $vue-skeleton-spacing;
    margin-right: 1.5 * $vue-skeleton-spacing;
  }

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
  }

  &__title {
    @include vue-skeleton;
    width: 85%;
    margin-bottom: $vue-skeleton-spacing;
    background: $vue-skeleton-primary-color;
  }

  &__subtitle {
    @include vue-skeleton;
    width: 90%;
  }
}

.vue-skeleton-text {
  @include vue-skeleton-spacing;

  &__line {
    @include vue-skeleton;
    width: 100%;
    margin-bottom: $vue-skeleton-spacing;

    &:nth-child(4n + 1) {
      width: 80%;
    }

    &:nth-child(4n + 2) {
      width: 100%;
    }

    &:nth-child(4n + 3) {
      width: 70%;
    }

    &:nth-child(4n + 4) {
      width: 85%;
    }
  }
}

.vue-skeleton-img {
  @include vue-skeleton;
  @include vue-skeleton-spacing;
  width: 100%;
  height: 120px;
}
</style>
