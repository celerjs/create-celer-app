<template>
  <div class="page-container">
    <div class="register-container">
      <div class="login-logo">
        <img src="https://dogged.cn/logo.svg" alt="" />
      </div>
      <div class="login-content">
        <el-form
          ref="registerForm"
          :model="registerForm"
          :rules="registerRules"
          auto-complete="off"
          class="login-form"
        >
          <div class="title-tips">注册{{ title }}</div>
          <el-form-item
            style="margin-top: 20px"
            prop="username"
            class="login-form-admin"
          >
            <span class="svg-container svg-container-admin">
              <fas-icon :icon="['fas', 'user']" />
            </span>
            <el-input
              v-model.trim="registerForm.username"
              v-focus
              auto-complete="off"
              placeholder="请输入手机号码"
              type="text"
            />
          </el-form-item>
          <el-form-item class="root-send-code" prop="code">
            <span class="svg-container svg-container-admin">
              <fas-icon :icon="['fas', 'comment']" />
            </span>
            <el-input
              v-model.trim="registerForm.code"
              type="text"
              maxlength="6"
              autocomplete="off"
              size="medium"
              placeholder="请输入短信验证码"
            >
              <el-button
                slot="append"
                class="send-code"
                @click="handleSendCode"
              >
                获取短信验证码
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="name">
            <span class="svg-container svg-container-admin">
              <fas-icon :icon="['fas', 'user']" />
            </span>
            <el-input
              v-model.trim.number="registerForm.name"
              type="text"
              maxlength="6"
              autocomplete="off"
              size="medium"
              placeholder="请输入姓名"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-form-pass">
            <span class="svg-container svg-container-pass"
              ><fas-icon :icon="['fas', 'lock']"
            /></span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="registerForm.password"
              :type="passwordType"
              auto-complete="off"
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin"
            />
            <span
              v-if="passwordType === 'password'"
              class="show-pwd"
              @click="showPwd"
            >
              <fas-icon :icon="['fas', 'eye-slash']" />
            </span>
            <span v-else class="show-pwd" @click="showPwd">
              <fas-icon :icon="['fas', 'eye']" />
            </span>
          </el-form-item>
          <el-form-item prop="repassword" class="login-form-pass">
            <span class="svg-container svg-container-pass">
              <fas-icon :icon="['fas', 'lock']" />
            </span>
            <el-input
              :key="repasswordType"
              ref="password"
              v-model="registerForm.repassword"
              :type="repasswordType"
              auto-complete="off"
              placeholder="请再次输入密码"
              @keyup.enter.native="handleLogin"
            />
            <span
              v-if="repasswordType === 'password'"
              class="show-pwd"
              @click="showRepwd"
              ><fas-icon :icon="['fas', 'eye-slash']"
            /></span>
            <span v-else class="show-pwd" @click="showRepwd"
              ><fas-icon :icon="['fas', 'eye']"
            /></span>
          </el-form-item>
          <el-button
            :loading="loading"
            class="login-btn"
            type="primary"
            @click="handleRegister"
          >
            注册
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { isPassword, isPhone } from "@/utils/validate";
import { encrypt } from "@/utils/encrypt";
import { sendCode, register } from "@/api/user";
export default {
  name: "Register",
  directives: {
    focus: {
      inserted(el) {
        el.querySelector("input").focus();
      },
    },
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isPhone(value)) {
        callback(new Error("手机号码格式错误"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!isPassword(value)) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    const validateRepassword = (rule, value, callback) => {
      if (!isPassword(value)) {
        callback(new Error("密码不能少于6位"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (!/\d{6}/.test(value)) {
        callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };
    return {
      nodeEnv: process.env.NODE_ENV,
      title: this.$baseTitle,
      registerForm: {
        username: "",
        password: "",
        repassword: "",
        code: "",
      },
      registerRules: {
        username: [
          {
            required: true,
            validator: validateUsername,
          },
        ],
        code: [
          {
            required: true,
            validator: validateCode,
          },
        ],
        name: [
          {
            required: true,
            message: "请输入姓名",
          },
        ],
        password: [
          {
            required: true,
            validator: validatePassword,
          },
        ],
        repassword: [
          {
            required: true,
            validator: validateRepassword,
          },
        ],
      },
      loading: false,
      passwordType: "password",
      repasswordType: "password",
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    showRepwd() {
      if (this.repasswordType === "password") {
        this.repasswordType = "";
      } else {
        this.repasswordType = "password";
      }
    },
    handleSendCode() {
      if (!isPhone(this.registerForm.username)) {
        this.$message.error("手机号码格式错误");
      } else {
        sendCode({ mobile: this.registerForm.username, type: 1 }).then();
      }
    },
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          register(
            {
              username: this.registerForm.username,
              code: this.registerForm.code,
              name: this.registerForm.name,
              password: this.registerForm.password,
            },
            {
              headers: {
                op_code: "PA004",
              },
            }
          ).then((res) => {
            this.$router.replace("/login");
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  height: 100vh;
  background: url("~@/assets/login_images/background.svg") center center fixed
    no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
}
.register-container {
  flex: 1;
  padding: 20vh 0 0;
  text-align: center;
  width: 400px;
  margin: 0 auto;
}
@media (max-width: 768px) {
  .register-container {
    padding: 32px 0 24px 0;
  }
}
@media screen and (max-width: 576px) {
  .register-container {
    width: 95%;
  }
}

.register-container {
  .title-tips {
    font-size: 26px;
    font-weight: 400;
    color: rgba(14, 18, 26, 1);
  }

  .login-content {
    padding: 10px;
    &::before {
      display: table;
      content: "";
    }
  }
  .login-logo {
    top: 45px;
    left: 45px;
    img {
      width: 180px;
      max-height: 40px;
      object-fit: contain;
    }
  }
  .login-btn {
    display: inherit;
    width: 100%;
    height: 40px;
    margin-top: 5px;
    &:hover {
      opacity: 0.9;
    }
  }
  .login-form {
    position: relative;
    max-width: 100%;
    overflow: hidden;
    .svg-container {
      position: absolute;
      top: 6px;
      left: 15px;
      z-index: $base-z-index;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    .show-pwd {
      position: absolute;
      top: 6px;
      right: 25px;
      font-size: 16px;
      color: $base-font-color;
      cursor: pointer;
      user-select: none;
    }
    .forget-password {
      width: 100%;
      margin-top: 40px;
      text-align: left;
      .forget-pass {
        width: 129px;
        height: 19px;
        font-size: 20px;
        font-weight: 400;
        color: rgba(92, 102, 240, 1);
      }
    }
    ::v-deep .el-input-group__append {
      background-color: #4385ff;
    }
    .send-code {
      color: #fff;
      background-color: #4385ff;
    }
  }
  ::v-deep {
    .el-form-item {
      padding-right: 0;
      margin: 20px 0;
      color: #454545;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 2px;
      &__content {
        min-height: $base-input-height;
        line-height: $base-input-height;
      }

      &__error {
        position: absolute;
        top: 100%;
        left: 18px;
        font-size: $base-font-size-small;
        line-height: 18px;
        color: $base-color-red;
      }
    }
    .el-input {
      box-sizing: border-box;
      input {
        height: 45px;
        padding-left: 45px;
        font-size: $base-font-size-default;
        line-height: 45px;
        color: $base-font-color;
        caret-color: $base-font-color;
      }
    }
  }
}
.go-register {
  margin-top: 10px;
}
</style>
