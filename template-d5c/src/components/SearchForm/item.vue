<template>
  <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
    <div class="left-label">
      <slot></slot>
    </div>
  </el-col>
</template>
<script>
export default {
  name: "SearchItem",
};
</script>

<style></style>
