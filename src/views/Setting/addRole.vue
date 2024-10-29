<script setup lang="ts">
import { editRoleAPI,addRoleAPI,getRoleDetailAPI } from '@/api/setting';
import type { addRole } from '@/types/setting';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

// 打开弹窗方法
const dialogVisible = ref<boolean>(false)
const openDialog = () => {
    dialogVisible.value=true
}
// 添加角色表单
const addRoleForm = ref<addRole>({
    name: '',
    description: '',
    id: '',
    permIds:[]
})
// 添加角色表单验证规则
const addRoleRules = {
    name: [
        {required:true,message:'请输入角色名称',trigger:'blur'}
    ],
    description: [
    {required:true,message:'请输入角色描述',trigger:'blur'}
    ]
}
// 数据回显方法
const getRoleDetail =async (id:string) => {
    const res = await getRoleDetailAPI(id)
addRoleForm.value=res.data
}
// 点击提交
const addRoleRef=ref<HTMLFormElement | null>()
const submit = () => {
    addRoleRef.value?.validate(async(valid:boolean) => {
        if (!valid) return
        if (addRoleForm.value.id) {
    await editRoleAPI(addRoleForm.value.id,addRoleForm.value)
        } else {
            await addRoleAPI(addRoleForm.value)
        }
        ElMessage.success(`${addRoleForm.value.id ? '编辑' : '添加'}角色成功`)
        dialogVisible.value = false
        // 刷新角色列表 需要父级传递方法
        emit('getList')
    })
}
// 关闭弹窗
const closeDialog = () => {
    // 清空表单数据
    addRoleForm.value = {
    name: '',
    description: '',
    id: '',
    permIds:[]
    }
    // 清空校验规则
    addRoleRef.value?.resetFields()
}
// 向父级传递方法和数据
defineExpose({
    openDialog,
    getRoleDetail
})
// 接收父级数据
const props = defineProps<{ title: string }>()
// 接收父组件方法
const emit = defineEmits<{ (e: 'getList'): void }>()

</script>
<template>
    <div class="addRole-container">
        <el-dialog
    v-model="dialogVisible"
    :title="props.title"
    @close="closeDialog"
  >
  <el-form :model="addRoleForm" ref="addRoleRef" :rules="addRoleRules"  style="max-width: 600px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="addRoleForm.name" />
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="addRoleForm.description" />
    </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
    </div>
</template>

<style scoped>

</style>