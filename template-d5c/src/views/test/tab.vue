<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="tab1"></el-tab-pane>
      <el-tab-pane label="配置管理" name="tab2"></el-tab-pane>
    </el-tabs>
    <div class="content">
      <div :is="activeName"></div>
    </div>
  </div>
</template>

<script>
import tab1 from "./tabComp/tab1";
import tab2 from "./tabComp/tab2";
export default {
  components: {
    tab1,
    tab2,
  },
  data() {
    return {
      activeName: "tab1",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style lang="scss" scoped></style>
