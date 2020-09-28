<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="24">
        <el-divider content-position="left">图标</el-divider>
      </el-col>
      <el-col :span="24">
        <el-form :inline="true" label-width="80px" @submit.native.prevent>
          <el-form-item label="图标名称">
            <el-input v-model="queryForm.title"></el-input>
          </el-form-item>
          <el-form-item label-width="0">
            <el-button native-type="submit" type="primary" @click="queryData"
              >搜索
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :xs="6" :sm="8" :md="3" :lg="2" :xl="2">
        <el-card shadow="hover" style="cursor: pointer">
          <svg-icon icon-class="az" />
        </el-card>
        <div class="icon-text">az</div>
      </el-col>
      <el-col :xs="6" :sm="8" :md="3" :lg="2" :xl="2">
        <el-card shadow="hover" style="cursor: pointer">
          <svg-icon icon-class="qq" />
        </el-card>
        <div class="icon-text">qq</div>
      </el-col>

      <el-col
        v-for="(item, index) in queryIcon"
        :key="index"
        :xs="6"
        :sm="8"
        :md="3"
        :lg="2"
        :xl="2"
      >
        <el-card shadow="hover" style="cursor: pointer">
          <svg-icon icon-class="https://www.dogged.cn/logo.svg" />
        </el-card>
        <div class="icon-text">{{ item }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Icon",
  data() {
    return {
      copyText: "",
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      background: true,
      height: 0,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryIcon: [],
      queryForm: {
        pageNo: 1,
        pageSize: 72,
        title: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  activated() {},
  methods: {
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val;
      this.fetchData();
    },
    queryData() {
      this.queryForm.pageNo = 1;
      this.fetchData();
    },
    fetchData() {
      this.queryIcon = ["binoculars.svg"];
      this.total = this.queryIcon.length;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-card__body {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    svg:not(:root) {
      font-size: 35px;
      font-weight: bold;
      color: $base-color-gray;
      text-align: center;
      vertical-align: middle;
      pointer-events: none;
      cursor: pointer;
    }
    .svg-icon {
      width: 35px;
      height: 35px;
    }
  }
}
.icon-text {
  height: 30px;
  margin-top: -15px;
  overflow: hidden;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
