<script setup lang='ts'>
import { useSlots } from 'vue';
const slots=useSlots()
</script>

<template>
<el-card>
    <div class="page-tools">
        <div class="left">
        <div class="tips" v-if="slots.left">
            <!-- <i class="el-icon-info" /> -->
                <el-icon><InfoFilled /></el-icon>
            <slot name="left"></slot>
        </div>
    </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</el-card>
</template>

<style scoped lang="scss">
.page-tools {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tips {
    position: relative;
    line-height:34px;
    padding: 0px 15px;
    padding-left: 33px;
    border-radius: 5px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
    /* i {
      margin-right: 10px;
      color: #409eff;
    } */
     .el-icon{
        position: absolute;
        left: 12px;
        top: 9px;
         color:#409eff;
         vertical-align: middle;
     }
  }
}
</style>