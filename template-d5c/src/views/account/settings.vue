<template>
  <el-card>
    <el-tabs tab-position="left">
      <el-tab-pane label="修改手机号">
        <el-card class="content">
          <span slot="header">修改手机号</span>
          <el-form
            ref="mobileForm"
            :model="mobileForm"
            label-position="top"
            :rules="mobileFormRules"
          >
            <el-form-item label="新手机号" prop="mobile">
              <el-input
                v-model.number="mobileForm.mobile"
                prefix-icon="el-icon-mobile"
                placeholder="请输入新手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="短信验证码" prop="code">
              <el-input
                v-model.number="mobileForm.code"
                type="age"
                prefix-icon=" el-icon-chat-dot-round"
                placeholder="请输入短信验证码"
                maxlength="6"
              >
                <el-button
                  slot="append"
                  class="code-button"
                  @click="getSMSCode"
                >
                  获取短信验证码
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="mobileFormOnsubmit">
                确认修改
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <el-card class="content">
          <span slot="header">修改密码</span>
          <el-form
            ref="pwdForm"
            :model="pwdForm"
            label-position="top"
            :rules="pwdFormRules"
          >
            <el-form-item label="手机号" prop="mobile">
              <el-input
                v-model.number="pwdForm.mobile"
                prefix-icon="el-icon-mobile"
                placeholder="请输入新手机号"
                maxlength="11"
              ></el-input>
            </el-form-item>
            <el-form-item label="原密码" prop="oldPwd">
              <el-input
                v-model="pwdForm.oldPwd"
                prefix-icon="el-icon-lock"
                type="password"
                placeholder="请输入原密码"
              ></el-input>
            </el-form-item>

            <el-form-item label="新密码" prop="newPwd">
              <el-input
                v-model="pwdForm.newPwd"
                prefix-icon="el-icon-lock"
                type="password"
                placeholder="请输入新密码"
              ></el-input>
            </el-form-item>

            <el-form-item label="再次输入新密码" prop="newPwdA">
              <el-input
                v-model="pwdForm.newPwdA"
                prefix-icon="el-icon-lock"
                type="password"
                placeholder="请再次输入新密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="pwdFormRulesOnsubmit">
                确认修改
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { validateTel, validatePwd } from "@/utils/validateRule";
import { isPhone } from "@/utils/validate";
export default {
  data() {
    return {
      mobileForm: {
        mobile: "",
        code: "",
      },
      mobileFormRules: {
        mobile: [
          { required: true, message: "手机号不能为空" },
          { validator: validateTel, trigger: "blur" },
        ],
        code: [
          { required: true, message: "验证码不能为空" },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("验证码不能为空"));
              }
              if (!Number.isInteger(value)) {
                callback(new Error("请输入数字"));
              } else {
                if (value.toString().length !== 6) {
                  callback(new Error("必须6位数字验证码"));
                } else {
                  callback();
                }
              }
            },
            trigger: "blur",
          },
        ],
      },
      pwdForm: {
        mobile: "",
        oldPwd: "",
        newPwd: "",
        newPwdA: "",
      },
      pwdFormRules: {
        mobile: [
          { required: true, message: "手机号不能为空" },
          { validator: validateTel, trigger: "blur" },
        ],
        oldPwd: [{ required: true, message: "密码不能为空" }],
        newPwd: [{ required: true, message: "密码不能为空" }],
        newPwdA: [
          { required: true, message: "密码不能为空" },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("密码不能为空"));
              }
              if (value !== this.pwdForm.newPwd) {
                callback(new Error("两次输入的密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    CPY_ID() {
      return this.$store.getters["user/userInfo"].companyId;
    },
  },
  mounted() {},
  methods: {
    getSMSCode() {
      if (!isPhone(this.mobileForm.mobile)) {
        return this.$baseMessage(`请输入正确的手机号`, "error");
      } else {
        //
        this.$store.dispatch("user/getSMSCode", {
          mobile: Number(this.mobileForm.mobile),
          type: 1,
        });
      }
    },
    mobileFormOnsubmit() {
      this.$refs.mobileForm.validate(async (valid) => {
        if (valid) {
          const res = await this.$store.dispatch("user/changeMobile", {
            mobile: this.mobileForm.mobile,
            code: this.mobileForm.code,
            f: this.$store.getters.productId,
          });
          console.log("mobileFormOnsubmit -> res", res);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    pwdFormRulesOnsubmit() {
      this.$refs.pwdForm.validate(async (valid) => {
        if (valid) {
          const { mobile, oldPwd, newPwd } = this.pwdForm;
          const res = await this.$store.dispatch("user/changePassword", {
            mobile,
            oldPwd,
            newPwd,
          });
          console.log("changePassword -> res", res);
          if (+res.status === 200) {
            this.$message.success("操作成功");
            setTimeout(() => {
              this.$router.push("/");
            }, 2000);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  border: none;
  ::v-deep .el-card__body {
    max-width: 600px;
  }
  .code-button {
    color: #fff;
    background-color: #1890ff;
    &:hover {
      background: #46a6ff;
    }
  }
}
</style>
