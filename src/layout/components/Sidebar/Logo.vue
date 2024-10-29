<script lang="ts" setup> 
defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
});

</script>

<template>
  <div class="w-full h-[50px]  dark:bg-[var(--el-bg-color-overlay)]">
    <transition name="sidebarLogoFade">
      <router-link key="collapse" class="sidebar-logo-link" to="/">
        <img src="@/assets/common/logo.png" class="sidebar-logo  ">
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
// https://cn.vuejs.org/guide/built-ins/transition.html#the-transition-component
.sidebarLogoFade-enter-active {
  transition: opacity 2s;
}

.sidebarLogoFade-leave-active,
.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
.sidebar-logo {
  width: 140px;
  vertical-align: middle;
  margin-right: 12px;
}

// .collapse {
//   .sidebar-logo {
//     margin-right: 0px;
//     width: 50px;
//     height: 24px;
//   }
// }
</style>
