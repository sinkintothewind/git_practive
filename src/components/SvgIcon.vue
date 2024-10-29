<script setup lang='ts'>
defineProps<{
  iconClass: string
}>()
</script>
<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="`#icon-${iconClass}`" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>