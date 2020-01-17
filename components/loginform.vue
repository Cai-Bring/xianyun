<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // 校验的函数
    // rule 用不上，代表校验的规则
    // value 代表输入框的值
    // callback回调函数，该函数必须要执行，如果传了错误的对象就会在页面显示错误
    // 如果验证通过不用传参数
    const validateUsername = (rule, value, callback) => {
      // 通过value校验到底是否是手机号码, true的话表示通过，false就不通过
      const isValid = /^1[3-9][0-9]{9}$/.test(value);

      // 不是手机号码报错
      if (!isValid) {
        callback(new Error("手机号码格式错误"));
      } else {
        // 通过
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: this.form
          }).then(res => {
            const { data } = res;
            console.log(res);
            // 传到仓库store中的user里面的setUserInfo去
            this.$store.commit("user/setUserInfo", data);
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
