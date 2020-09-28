<template>
  <el-row :gutter="10" class="query-form">
    <slot></slot>
  </el-row>
</template>

<script>
export default {
  name: "Search",
};
</script>

<style lang="scss" scoped>
.query-form {
  ::v-deep {
    .el-form-item--small .el-form-item__content {
      line-height: 1;
    }
    .el-date-editor {
      width: 100%;
    }
  }
}
</style>
