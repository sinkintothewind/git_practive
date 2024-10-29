<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import SidebarItem from "./SidebarItem.vue";
import Logo from "./Logo.vue";

import { useSettingsStore } from "@/store/settings";
// import { usePermissionStore } from "@/store/permission";
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
import variables from "@/styles/variables.module.scss";
import { computed } from "vue";

const settingsStore = useSettingsStore();
// const permissionStore = usePermissionStore();
const appStore = useAppStore();
const currRoute = useRoute();
const { sidebarLogo } = storeToRefs(settingsStore);

const router = useRouter();

const routes= computed(()=>{
  return router.options.routes
})
console.log(routes.value);

</script>

<template>
  <div :class="{ 'has-logo': sidebarLogo }">
    <logo v-if="sidebarLogo" :collapse="!appStore.sidebar.opened" />
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu
        :default-active="currRoute.path"
        :collapse="!appStore.sidebar.opened"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="!appStore.sidebar.opened"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-container {
   background: -webkit-linear-gradient(bottom, #3d6df8, #5b8cff);
}
.scrollbar-wrapper { 
  background: url('@/assets/common/leftnavBg.png') no-repeat 0 100%;
}

.el-menu {
  background-color: transparent !important;
}

</style>