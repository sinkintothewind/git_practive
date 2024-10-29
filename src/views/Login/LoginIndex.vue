<script lang="ts" setup>
import type { LoginForm } from '@/types/user'
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { loginApi } from '@/api/user'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
// 密码显示隐藏
const passwordType = ref('password')
const showPwd = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}

//声明收集表单数据的对象
const loginForm = ref<LoginForm>({
  mobile: '13800000002',
  password: '888itcast.CN764%...'
  // password: 'hm#qd@23!'
})

//校验规则
const rules = {
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 32, message: '密码必须是6-32位', trigger: 'blur' }
  ]
}

// 登录
const login = ref<FormInstance>()
const { setToken } = useUserStore()
const router = useRouter()
const loading = ref(false)
const handleLogin = () => {
  // 1.校验表单
  login?.value?.validate(async (valid) => {
    if (!valid) return
    // 2.发送请求
    loading.value = true
    const res = await loginApi(loginForm.value)
    loading.value = false
    //console.log(res.data)
    // 3.保存token
    setToken(res.data)
    // 3.跳转页面 通过路由跳转
    router.push('/dashboard')
  })
}
</script>

<template>
  <div class="login-container">
    <el-form
      ref="login"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :model="loginForm"
      :rules="rules"
    >
      <!-- 放置标题图片 @是设置的别名-->
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="" />
        </h3>
      </div>

      <el-form-item prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.mobile"
          placeholder="请输入您的手机号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          :type="passwordType === 'password' ? 'password' : 'text'"
          v-model="loginForm.password"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        class="loginBtn"
        @click="handleLogin"
        :loading="loading"
        >登录</el-button
      >
      <div class="tips">
        <span style="margin-right: 20px">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>
    </el-form>
  </div>
</template>


<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #407ffe;
$cursor: #407ffe;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
// css中 如果让@ 指向src 必须加~
.login-container {
  background: url('@/assets/common/login.jpg'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕

  .loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }

  .el-form-item {
    border: 1px solid hsla(0, 0%, 100%, 0.1);
    background: hsla(0, 0%, 100%, 0.7);
    border-radius: 5px;
    color: #454545;

    .el-form-item__content {
      width: 100%;
      display: flex;
      justify-content: flex-start;
    }

    .el-input {
      width: 85%;
      height: 47px;

      .el-input__wrapper {
        background-color: transparent;
        box-shadow: none;
      }

      input {
        background: transparent;
        border: 0;
        border-radius: 0;
        padding: 12px 5px 12px 15px;
        color: #68b0fe;
        height: 47px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #407ffe;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
