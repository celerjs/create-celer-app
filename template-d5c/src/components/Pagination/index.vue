<template>
  <el-pagination
    layout="prev, pager, next"
    v-bind="$attrs"
    :background="true"
    :page-size="15"
    :hide-on-single-page="false"
    v-on="$listeners"
  >
  </el-pagination>
</template>
<script>
export default {
  name: "Pagination",
};
</script>
