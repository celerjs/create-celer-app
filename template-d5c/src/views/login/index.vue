<template>
  <div class="page-container">
    <div class="login-container">
      <div class="login-logo">
        <img src="~@/assets/login_images/background.svg" alt="" />
      </div>
      <div class="login-content">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          auto-complete="off"
          class="login-form"
        >
          <div class="title-tips">欢迎来到{{ title }}！</div>
          <el-form-item
            style="margin-top: 20px"
            prop="username"
            class="login-form-admin"
          >
            <span class="svg-container svg-container-admin">
              <fas-icon :icon="['fas', 'user']" />
            </span>
            <el-input
              v-model.trim="loginForm.username"
              v-focus
              auto-complete="off"
              placeholder="请输入账号"
              tabindex="1"
              type="text"
            />
          </el-form-item>
          <el-form-item prop="password" class="login-form-pass">
            <span class="svg-container svg-container-pass"
              ><fas-icon :icon="['fas', 'lock']"
            /></span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model.trim="loginForm.password"
              :type="passwordType"
              auto-complete="off"
              placeholder="请输入密码"
              tabindex="2"
              @keyup.enter.native="handleLogin"
            />
            <span
              v-if="passwordType === 'password'"
              class="show-pwd"
              @click="showPwd"
              ><fas-icon :icon="['fas', 'eye-slash']"
            /></span>
            <span v-else class="show-pwd" @click="showPwd"
              ><fas-icon :icon="['fas', 'eye']"
            /></span>
          </el-form-item>
          <el-button
            :loading="loading"
            class="login-btn"
            type="primary"
            @click="handleLogin"
            >登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { isPassword, isPhone } from "@/utils/validate";
import { encrypt } from "@/utils/encrypt";
import { login } from "@/api/user";
export default {
  name: "Login",
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
        callback(new Error("账号格式错误"));
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
    return {
      nodeEnv: process.env.NODE_ENV,
      title: this.$baseTitle,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername,
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword,
          },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {},
  mounted() {
    if ("production" !== process.env.NODE_ENV) {
      this.loginForm.username = "13812345600";
      this.loginForm.password = "123456";
    }
    setTimeout(() => {
      this.animateShow = true;
    });
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    async handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          login(
            {
              username: Number(this.loginForm.username),
              password: encrypt(this.loginForm.password),
            },
            {
              headers: {
                op_code: "PA001",
              },
            }
          )
            .then((res) => {
              this.$store.dispatch("user/setTokenAndId", res);
              const routerPath = this.redirect === "/404" ? "/" : this.redirect;
              this.$router.push({ path: routerPath || "/" }).catch(() => {});
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
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
.login-container {
  flex: 1;
  padding: 20vh 0 0;
  text-align: center;
  width: 400px;
  margin: 0 auto;
}
@media (max-width: 768px) {
  .login-container {
    padding: 32px 0 24px 0;
  }
}
@media screen and (max-width: 576px) {
  .login-container {
    width: 95%;
  }
}

.login-container {
  .title-tips {
    margin-top: 20px;
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
</style>
