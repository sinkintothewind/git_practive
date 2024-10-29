<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { ElMessageBox } from "element-plus";
import defaultImg  from '@/assets/common/bigUserHeader.png'
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const { userInfo,logOut } = useUserStore()

const defaultImg1 = ref(defaultImg)
/**
 * 注销
 */
function logout() {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    logOut()
    router.push('/login')
  });
}
</script>
<template>
  <!-- 顶部导航栏 -->
  <div class="navbar">
    <!-- 左侧面包屑 -->
    <div class="flex">
      <div class="app-breadcrumb">
        江苏传智播客教育科技股份有限公司
        <span class="breadBtn">体验版</span>
      </div>
    </div>
    <!-- 右侧导航设置 -->
    <div class="flex">
      <!-- 用户头像 -->
      <el-dropdown trigger="click">
        <div class="avatar-container">
          <img :src="userInfo?.staffPhoto" v-imgError="defaultImg1"/>
          <span class="username">{{userInfo?.username}}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  box-shadow: 0 0 1px #0003;
  background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);

  .setting-container {
    display: flex;
    align-items: center;

    .setting-item {
      display: inline-block;
      width: 30px;
      height: 50px;
      line-height: 50px;
      color: #5a5e66;
      text-align: center;
      cursor: pointer;

      &:hover {
        background: rgb(249 250 251 / 100%);
      }
    }
  }

  .app-breadcrumb {
    display: inline-block;
    font-size: 18px;
    line-height: 50px;
    margin-left: 10px;
    color: #ffffff;
    cursor: text;

    .breadBtn {
      background: #84a9fe;
      font-size: 14px;
      padding: 0 10px;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
      margin-left: 15px;
    }
  }

  .avatar-container {
    display: flex;
    align-items: center;
    justify-items: center;
    margin: 0 5px;
    cursor: pointer;

    img {
      width: 40px;
      height: 40px;
      border-radius: 5px;
    }
    .username {
      color: #fff;
    }
  }
}
</style>
