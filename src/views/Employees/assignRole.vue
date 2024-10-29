<script setup lang="ts">
import { assignRoleAPI, getEmployeeDetailAPI } from '@/api/employee';
import { getRolesListAPI } from '@/api/setting';
import type { Role } from '@/types/setting';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
// 定义角色选项
const roleList = ref<Role[]>()
// 定义已选择项
const checkedRole = ref<string[]>()
// 定义分配角色的成员id用于提交修改
const assignId = ref<string>()
// 打开弹窗方法
const assignDialogVisible=ref<boolean>(false)
const openAssignDialog =async (id:string) => {
    assignDialogVisible.value = true
    assignId.value=id
  // 回显所有角色选项
    const res = await getRolesListAPI({ pagesize: 999, page: 1 })
    roleList.value = res.data.rows
    //   回显已选择项
    const result = await getEmployeeDetailAPI(assignId.value)
    checkedRole.value=result.data.roleIds
}
// 分配角色提交
const submit =async () => {
    await assignRoleAPI(assignId.value!, checkedRole.value || [])
    ElMessage.success('分配角色成功')
    assignDialogVisible.value=false
}
// 分配弹窗关闭
const assignDialogClose = () => {
    checkedRole.value=[]
}
// 向父级传递方法
defineExpose({
    openAssignDialog//vue3中通过ref传值，子组件需要将数据和方法暴露出去才能传递
})
</script>
<template>
    <div class="assign-container">
<el-dialog v-model="assignDialogVisible" title="分配角色" @close="assignDialogClose">
    <el-checkbox-group  v-model="checkedRole">
    <el-checkbox  v-for="item in roleList" :label="item.name" :value="item.id" :key="item.id"/>
  </el-checkbox-group>
  <!-- footer插槽 -->
  <template v-slot:footer>
<div class="footer">
    <el-button @click="assignDialogVisible=false">取消</el-button>
    <el-button type="primary" @click="submit">确定</el-button>
</div>
      </template>
</el-dialog>
    </div>
</template>

<style scoped>
.footer{
    margin-right: 40px;
}
.el-checkbox{
    width: 100%!important;
    margin: 0;
  }
</style>