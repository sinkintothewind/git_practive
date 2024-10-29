<script setup lang='ts'>
import { delEmployeeAPI, getEmployeeListAPI } from '@/api/employee';
import type { employee } from '@/types/employee';
import type { params } from '@/types/employee';
import dayjs from 'dayjs';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, ref } from 'vue';
import addComponent from '@/views/Employees/addEmployee.vue'
import assignForm from './assignRole.vue';
// 获取员工列表
const param = ref<params>({
    page: 1,
    size:10
})
const employeeList = ref<employee[]>()
const total=ref<number>(0)
const getEmployeeList=async()=> {
    const res =await getEmployeeListAPI(param.value)
    employeeList.value = res.data.rows
total.value=res.data.total
}
// 序号处理
const handleIndex = (index:number) => {
return index+1+(param.value.page-1)*param.value.size
}
// 页面尺寸修改
const handleSizeChange = (val:number) => {
    param.value.size = val
getEmployeeList()
}
// 页面尺寸修改
const handleCurrentChange = (val:number) => {
    param.value.page = val
getEmployeeList()
}
// 聘用方式枚举
const formateEmployee = (formOfEmployment:1 | 2) => {
  const Map = {
    1: '正式',
  2:'非正式'
  }
return Map[formOfEmployment]
}
// 时间格式化
const FormateTime = (time: string) => {
  if (time) {
    return dayjs(time).format('YYYY-MM-DD')
  } else {
return null
  }
}
// 获取子组件
const addFormRef=ref<InstanceType<typeof addComponent> | null>()
// 添加员工
const addEmployee = () => {
  addFormRef.value?.openDialog()
}
// 删除员工
const delEmployee = (id:string) => {
  ElMessageBox.confirm('确定要删除该员工？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  type:'warning'
  }).then(async() => {
    await delEmployeeAPI(id)
    ElMessage.success('删除成功')
getEmployeeList()
}).catch(()=>{})
}
// 获取分配角色子组件
const assignRef = ref<InstanceType<typeof assignForm> | null>()
// 分配角色按钮
const assignRole = (id: string) => {
  // 调用子组件方法打开弹窗时传id给子组件
  assignRef.value?.openAssignDialog(id)
  }
// 初始化钩子函数
onMounted(() => {
    getEmployeeList()
})
</script>
<template>
    <div class="employees-container">
      <div class="app-container">
        <page-tools>
          <template #left>
            <span style="font-size: 14px;">总记录数: {{total}} 条</span>
          </template>
          <template #right>
            <!-- <el-button type="warning">excel导入</el-button>
            <el-button type="danger">excel导出</el-button> -->
            <el-button type="primary" @click="addEmployee">新增员工</el-button>
          </template>
        </page-tools>
        <el-card style="margin-top: 10px">
          <el-table border :data="employeeList">
            <el-table-column label="序号" type="index" :index="handleIndex" width="80"/>
            <el-table-column label="姓名" prop="username"/>
            <el-table-column label="手机号" prop="mobile" width="160"/>
            <el-table-column label="工号" prop="workNumber"/>
            <el-table-column label="聘用形式" prop="formOfEmployment">
              <template #default="scope">
{{ formateEmployee(scope.row.formOfEmployment) }}
              </template>
</el-table-column>
            <el-table-column label="部门" prop="departmentName"/>
            <el-table-column label="入职时间" prop="timeOfEntry" width="280">
              <template #default="scope">
{{FormateTime(scope.row.timeOfEntry)}}
              </template>
              </el-table-column>
            <el-table-column label="操作" fixed="right" width="280">
              <template #default="scope">
                <!-- <el-button type="primary">查看</el-button> -->
                <el-button type="success" size="small" @click="assignRole(scope.row.id)">分配角色</el-button>
                <el-button type="danger" size="small" @click="delEmployee(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <div style="height: 60px; margin-top: 10px; display: flex; justify-content: flex-end">
                                <!-- 分页 -->
                                <el-pagination
      v-model:current-page="param.page"
      v-model:page-size="param.size"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      size="small"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
          </div>
        </el-card>
      </div>
      <!-- 添加员工组件 -->
       <addComponent  ref="addFormRef" @getList="getEmployeeList"/>
       <!-- 分配角色弹窗 -->
    <assignForm ref="assignRef"/>
    </div>
  </template>
<style scoped lang="scss"></style>