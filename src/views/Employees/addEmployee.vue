<script setup lang="ts">
import { getDepartmentListAPI } from '@/api/department';
import { addEmployeeAPI } from '@/api/employee';
import type { Dept } from '@/types/department';
import type { addEmployee } from '@/types/employee';
import { listToTree } from '@/utils';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

// 弹窗显示与隐藏
const dialogVisible = ref<boolean>(false)
const openDialog = () => {
    dialogVisible.value = true
    getDepartmentTreeList()
}
// 添加表单
const addForm = ref<addEmployee>({
  username: '',
  mobile: '',
  timeOfEntry: '',
  formOfEmployment: 1,
  workNumber: '',
  departmentName: '',
  correctionTime: ''
})
// 添加表单验证规则
const addEmployeeRules =({
    username: [
    {required:true,message:'请输入员工姓名',trigger:'blur'}
  ],
  mobile:  [
    {required:true,message:'请输入手机号',trigger:'blur'},
    {pattern:/^1[3-9]\d{9}$/,message:'手机号格式不正确',trigger:'blur'}
  ],
  timeOfEntry: [
    {required:true,message:'请选择入职时间',trigger:'change'}
  ],
  formOfEmployment: [
    {required:true,message:'请选择聘用形式',trigger:'blur'}
  ],
  workNumber:[
    {required:true,message:'请输入工号',trigger:'blur'}
  ],
  departmentName: [
    {required:true,message:'请选择部门名称',trigger:'change'}
  ],
  correctionTime: [
    {required:true,message:'请选择转正时间',trigger:'change'}
  ]
})
// 定义聘用形式
const formateEmpData =[
    { label: '正式', value: 1 },
    { label:'非正式',value:2 }
]
// 获取部门数据
const treeList=ref<Dept[]>()
const getDepartmentTreeList =async () => {
    const res = await getDepartmentListAPI()
treeList.value=listToTree(res.data.depts,'')
}
// 定义树结构展示配置
const defaultProps = {
    label: 'name',
    children:'children'
}
// 添加员工
const submit = () => {
    addEmployeeRef.value?.validate(async(valid:boolean) => {
        if (!valid) return
        await addEmployeeAPI(addForm.value)
        ElMessage.success('添加员工成功')
        dialogVisible.value=false
emit('getList')
    })
}
// 获取父组件刷新列表方法
const emit=defineEmits<{( e:'getList' ) : void} >()
// 获取表单元素
const addEmployeeRef=ref<HTMLFormElement | null>()
// 关闭弹窗
const closeDialog = () => {
    addForm.value = {
     username: '',
  mobile: '',
  timeOfEntry: '',
  formOfEmployment: 1,
  workNumber: '',
  departmentName: '',
  correctionTime: ''
    }
    addEmployeeRef.value?.resetFields()
}
// 向父级传递方法
defineExpose({
    openDialog
})
</script>
<template>
    <el-dialog title="新增员工" top="8vh" v-model="dialogVisible" @close="closeDialog">
      <!-- 表单 -->
      <el-form label-width="80px" :model="addForm" ref="addEmployeeRef" :rules="addEmployeeRules" >
        <el-form-item label="姓名" prop="username">
          <el-input  placeholder="请输入姓名" v-model="addForm.username" clearable/>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input  placeholder="请输入手机号" v-model="addForm.mobile" clearable/>
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker  placeholder="请选择入职时间" style="width: 100%;" v-model="addForm.timeOfEntry"/>
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select  placeholder="请选择" v-model="addForm.formOfEmployment">
            <el-option
        v-for="item in formateEmpData"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input  placeholder="请输入工号" v-model="addForm.workNumber" clearable/>
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
            <el-tree-select
    v-model="addForm.departmentName"
    :data="treeList"
    check-strictly
    :render-after-expand="false"
    style="width: 100%"
    :props="defaultProps"
    clearable
  />
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker placeholder="请选择转正时间" style="width: 100%;" v-model="addForm.correctionTime"/>
        </el-form-item>
      </el-form>
      <!-- footer插槽 -->
      <template v-slot:footer>
<div class="footer">
    <el-button @click="dialogVisible=false">取消</el-button>
    <el-button type="primary" @click="submit">确定</el-button>
</div>
      </template>
    </el-dialog>
  </template>

<style scoped>

.footer{
padding-right: 40px;
margin-bottom: 10px;

}
</style>