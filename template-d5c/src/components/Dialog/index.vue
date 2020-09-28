<template>
  <el-dialog
    :visible.sync="visibleDialog"
    :close-on-click-modal="false"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!--内容区域的默认插槽-->
    <el-scrollbar wrap-class="scroll">
      <slot />
    </el-scrollbar>

    <!--使用弹框的footer插槽添加按钮-->
    <template #footer>
      <!--对外继续暴露footer插槽，有个别弹框按钮需要自定义-->
      <slot name="footer">
        <!--将取消与确定按钮集成到内部-->
        <span>
          <el-button @click="$_handleCancel">取 消</el-button>
          <el-button type="primary" @click="$_handleConfirm"> 确 定 </el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: "Dialog",
  //默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings)
  //将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。
  //通过设置 inheritAttrs 到 false，这些默认行为将会被去掉
  inheritAttrs: false,
  props: {
    // 对外暴露visible属性，用于显示隐藏弹框
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    visibleDialog: {
      get() {
        return this.visible;
      },
      set() {
        this.$emit("update:visible");
      },
    },
  },

  methods: {
    $_handleCancel() {
      this.$emit("update:visible", false);
    },
    // 对外抛出 confirm事件
    $_handleConfirm() {
      this.$emit("confirm");
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .scroll {
  max-height: 78vh;
}
</style>
