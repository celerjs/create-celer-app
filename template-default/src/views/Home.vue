<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="title">asdasd</div>
    <div class="test">
      <a-button type="primary"> Primary </a-button>
      <fas-icon icon="home"></fas-icon>
      <svg-icon icon-class="a" />
      <svg-icon
        :icon-class="`https://cdn.jsdelivr.net/gh/chuzhixin/zx-colorful-icon@master/about.svg`"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      a: [123, 3, 2, 1, 15, 1, 5, 15, 15, 5, 151, 51, 1],
    };
  },
};
</script>
<style lang="scss" scoped>
.title {
  color: $color;
}
</style>
