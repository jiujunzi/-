<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/tutu.jpg" alt />
      </div>

      <!-- 表单区域 -->
      <el-form ref="loginFormRef" class="login_form" :rules="loginFormRules" :model="loginForm">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //登录表单数据对象
      loginForm: {
        username: "admin",
        password: "123456"
      },
      // 表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //重置表单功能
    resetLoginForm() {
      //console.log(this.$refs.resetLoginForm)
      this.$refs.loginFormRef.resetFields();
    },
    //登录按钮预验证
    // valid是布尔值类型的行参，箭头函数只有一个参数时，可以省略括号
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        //console.log(valid)
        if (!valid) return;
        // 解构data给res，async和await，返回的是promise对象
        const { data: res } = await this.$http.post("login", this.loginForm);
        console.log(res);
        // 显示登录结果
        if (res.meta.status !==200 ) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)

        // 保存token
        window.sessionStorage.setItem('token',res.data.token)

        // 编程式导航跳转到后台home
        this.$router.push('/home')
      });
    }
  }
};
</script>
<style lang='less' scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: solid 1px #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>