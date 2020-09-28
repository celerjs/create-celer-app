<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      <el-avatar class="user-avatar" :src="avatar"></el-avatar>
      <span class="user-name">{{ username }}</span>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="account">
        <!-- <fas-icon :icon="['fas', 'mobile']"></fas-icon> -->
        <fas-icon icon="user"></fas-icon>
        个人设置
      </el-dropdown-item>
      <el-dropdown-item command="logout" divided>
        <fas-icon icon="sign-out-alt"></fas-icon>
        退出登录
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Avatar",
  computed: {
    ...mapGetters({
      avatar: "user/avatar",
      username: "user/username",
    }),
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "account":
          this.$router.push("/account/settings");
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    logout() {
      this.$baseConfirm("您确定要退出" + this.$baseTitle + "吗?", null, () => {
        const fullPath = this.$route.fullPath;
        this.$store.dispatch("user/logout").then(() => {
          this.$router.push(`/login?redirect=${fullPath}`);
        });
      });
    },
  },
};
</script>
