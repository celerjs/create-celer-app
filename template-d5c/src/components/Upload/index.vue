<!--
   ** isSee: Boolean 是否可编辑
   ** curkeyList: Array 已上传图片key 数组
   ** imgkeyList: Array 所有在列表中的key 数组
   ** mode: String 单张还是多张 单picture 多picture-card
   ** name :下方显示文字
-->
<template>
  <div class="d5c-upload-container">
    <div class="upload-content">
      <el-upload
        accept="image/png, image/jpeg, image/gif"
        :action="FILE_UPLOAD"
        list-type="picture-card"
        class="d5c-upload"
        :class="[isSee ? 'mode-see' : '', mode, hideUpload]"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSucces"
        :before-upload="beforeUpload"
        multiple
        :limit="meLimit"
        drag
        :file-list="fileList"
        :on-exceed="handleExceed"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <div v-if="name" class="info">{{ name }}</div>
    </div>
  </div>
</template>

<script>
import { FILE_UPLOAD, IMG_URL, HIGH_IMG_URL } from "@/config";
export default {
  components: {},
  props: {
    isSee: {
      type: Boolean,
      default: false,
    },
    curkeyList: {
      type: Array,
      default: () => [],
    },
    imgkeyList: {
      type: Array,
      default: () => [],
    },
    limit: {
      type: Number,
      default: 10,
    },
    mode: {
      type: String,
      default: "picture",
    },
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      FILE_UPLOAD,
      IMG_URL,
      HIGH_IMG_URL,
      fileList: [],
      hideUpload: "",
      allkeyList: [],
    };
  },
  computed: {
    meLimit() {
      return this.mode === "picture" ? 1 : this.limit;
    },
  },
  watch: {
    curkeyList: {
      handler(val) {
        // 数组中删除虚值
        val = val.filter(Boolean);
        if (val.length > 0) {
          if (this.mode === "picture") {
            val = [val[0]];
          }
          this.fileList = this.genShowList(val);
          this.allkeyList = val;
        } else {
          this.allkeyList = val;
        }
      },
      immediate: true,
    },
    allkeyList: {
      handler(val) {
        if (this.mode === "picture") {
          if (val.length > 0) {
            this.hideUpload = "hideUpload";
          } else {
            this.hideUpload = "";
          }
        }
        this.$emit("update:imgkeyList", val);
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    genShowList(keyArr) {
      return keyArr.map((key) => ({
        url: `${this.IMG_URL}${key}`,
        response: { a: key },
      }));
    },
    beforeUpload(file) {
      console.log("beforeUpload -> file", file.type);
      if (file.type.indexOf("image") < 0) {
        this.$message.error("只能上传图片格式!");
        return false;
      }
    },
    handleSucces(res, file, fileList) {
      console.warn("d5c-upload | handleSucces", res, file, fileList);
      const keyList = fileList.map((item) => item.response.a);
      this.allkeyList = keyList;
    },
    handleRemove(file, fileList) {
      console.warn("d5c-upload | handleRemove", file, fileList);
      const keyList = fileList.map((item) => item.response.a);
      this.allkeyList = keyList;
    },
    handlePictureCardPreview(file) {
      console.warn("d5c-upload | handlePictureCardPreview", file);
      this.$viewer({ urlList: [`${HIGH_IMG_URL}${file.response.a}`] });
    },
    handleExceed() {
      this.$message.error(`不允许超过${this.meLimit}个图片上传`);
    },
  },
};
</script>

<style lang="scss" scoped>
.d5c-upload-container {
  .upload-content {
    display: inline-block;
    position: relative;
    padding-bottom: 20px;
    .d5c-upload::v-deep {
      text-align: left;
      // 动画效果
      .el-list-enter,
      .el-list-enter-to,
      .el-list-leave-active {
        transform: none;
        opacity: 1;
        transition: none;
      }
      .el-upload {
        width: 148px;
        height: 148px;
        cursor: pointer;
        line-height: 146px;
        vertical-align: top;
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        margin-bottom: 10px;
      }
      .el-icon-plus {
        font-size: 28px;
        color: #8c939d;
      }
      &.mode-see {
        .el-upload {
          display: none !important;
        }
        .el-upload-list__item-delete {
          display: none !important;
        }
      }
      &.hideUpload {
        .el-upload {
          display: none;
        }
      }

      .el-upload-dragger {
        width: 100%;
        height: 100%;
        border: none;
      }
    }
  }

  .info {
    color: $base-color-gray;
    text-align: center;
    display: block;
    position: absolute;
    bottom: 8px;
    width: calc(100% - 8px);
  }
}
</style>
