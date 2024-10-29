<script setup lang='ts'>
import { addPermissionAPI, delPermissionAPI, editPermissionAPI, getPermissionListAPI, permissionDetailAPI } from '@/api/permission';
import type { addPermission, data } from '@/types/permission';
import { listToTree } from '@/utils';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, ref } from 'vue';

// 获取权限列表
const permissionList=ref<data[]>()
const getPermissionList = async() => {
    const res = await getPermissionListAPI()
    permissionList.value = listToTree(res.data, '0')
    console.log('res.data', res.data);
    console.log('permissionList',permissionList.value);
}
const addDialogVisible = ref<boolean>(false)
// 标题
const title=ref<string>()
// 添加权限按钮
const openDialog=(id:string,type:number)=> {
    addDialogVisible.value = true
    title.value='添加权限'
    addPermissionForm.value.pid = id
    addPermissionForm.value.type=type
}
// 添加权限表单
const addPermissionForm = ref<addPermission>({
    _id: '',
    name: '',
    code: '',
    description: '',
    type: 1,
    pid: '',
    enVisible: 1,
    __v: 0,
    id: ''
})
// 添加权限验证规则
const addPermissionRules = {
    name: [
        {required:true,message:'请输入菜单名称',trigger:'blur'}
    ],
    code: [
        {required:true,message:'请输入权限标识',trigger:'blur'}
    ],
    description: [
        {required:true,message:'请输入权限描述',trigger:'blur'}
    ],
    enVisible: [
        {required:true,message:'请选择权限开启状态',trigger:'blur'}
    ]
}
// 获取添加权限表单
const addPermissionRef=ref<HTMLFormElement | null>()
// 添加/编辑权限
const addSubmit = () => {
    addPermissionRef.value?.validate(async(valid: boolean) => {
        if (!valid) return
        if (addPermissionForm.value.id) {
            await editPermissionAPI(addPermissionForm.value.id,addPermissionForm.value)
        } else {
            await addPermissionAPI(addPermissionForm.value)
        }
        ElMessage.success(`${addPermissionForm.value.id?'编辑':'添加'}权限成功`)
        addDialogVisible.value = false
getPermissionList()
    })
}
// 编辑权限按钮
const editPermission =async (id: string) => {
    // 打开弹窗
    addDialogVisible.value = true
    title.value='编辑权限'
    // 数据回显
    const res = await permissionDetailAPI(id)
addPermissionForm.value=res.data
 }
// 关闭弹窗时清空数据
const closeAddDialog = () => {
    addPermissionForm.value = {
        _id: '',
    name: '',
    code: '',
    description: '',
    type: 1,
    pid: '',
    enVisible: 1,
    __v: 0,
    id: ''
    }
    addPermissionRef.value?.resetFields()
}
// 删除权限
const delPermission = (id:string) => {
    ElMessageBox.confirm('确定要删除该权限吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning'
    }).then(async() => {
        await delPermissionAPI(id)
        ElMessage.success('删除权限成功')
getPermissionList()
    }).catch(()=>{})
}
// 初始化钩子
onMounted(() => {
    getPermissionList()
})
</script>
<template>
<div class='permission-container'>
<div class="app-container">
        <page-tools>
          <template #right>
            <!-- <el-button type="warning">excel导入</el-button>
            <el-button type="danger">excel导出</el-button> -->
            <el-button type="primary" @click="openDialog('0',1)">添加权限</el-button>
          </template>
        </page-tools>
        <el-card style="margin-top: 10px;" class="list-card">
            <el-table :data="permissionList" border style="width: 100%"
            row-key="id"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column label="菜单名称" prop="name"/>
                 <el-table-column label="权限标识" prop="code"/>
                <el-table-column label="描述" prop="description"/>
                <el-table-column label="操作">
                    <template #default="scope">
                    <el-button text type="primary" size="small" @click="openDialog('1',2)">添加权限点</el-button>
                    <el-button text type="primary" size="small" @click="editPermission(scope.row.id)">编辑</el-button>
                    <el-button text type="primary" size="small" @click="delPermission(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
</div>
<!-- 添加权限弹窗 -->
 <el-dialog v-model="addDialogVisible" :title='title' width="30%" @close="closeAddDialog">
    <el-form ref="addPermissionRef" :model="addPermissionForm" :rules="addPermissionRules" >
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="addPermissionForm.name"></el-input>
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="addPermissionForm.code"></el-input>
          </el-form-item>
          <el-form-item label="权限描述" prop="description">
            <el-input v-model="addPermissionForm.description"></el-input>
          </el-form-item>
          <el-form-item label="权限开启" prop="enVisible">
            <el-switch v-model="addPermissionForm.enVisible" :active-value="1" :inactive-value="0">
            </el-switch>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <div class="footer">
                <el-button @click="addDialogVisible=false">取消</el-button>
            <el-button type="primary" @click="addSubmit">
              确定
            </el-button>
        </div>
          </span>
        </template>
 </el-dialog>
</div>
</template>
<style scoped lang="scss">
.footer{
    padding-right: 40px;
    display: flex;
    justify-content: end;
}
.list-card{
    height: calc(100vh - 152px);
}
</style>