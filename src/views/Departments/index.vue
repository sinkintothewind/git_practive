<script setup lang="ts">
import { getDepartmentListAPI,delDepartmentAPI } from '@/api/department'
import { ref, onMounted } from 'vue'
import type { data, Dept } from '@/types/department'
import { listToTree } from '@/utils/index'
import addDept from '@/views/Departments/addDepartment.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// 渲染列表
const department = ref<data>()
const treeList = ref<Dept[]>()
const getDepartmentList = async () => {
  const res = await getDepartmentListAPI()
  department.value = res.data
  treeList.value = listToTree<Dept>(res.data.depts, '')
}
// 获取添加组件
const addForm = ref<InstanceType<typeof addDept> | null>(null)
// 下拉框点击事件
const nodeData = ref<Dept>()
const title=ref<string>()
const handleCommand = (command:{type:string,data:Dept}) => {
  if (command.type === 'add') {
    // 打开添加部门弹窗
    addForm.value?.openAddDialog()
    // data传至父级
    nodeData.value = command.data
    title.value='添加部门'
  }
  if (command.type === 'edit') {
    // 编辑部门方法
    addForm.value?.openAddDialog()
    nodeData.value = command.data
    // 数据回显
    title.value='编辑部门'
    addForm.value?.getDepartmentDetail()
  }
  if (command.type === 'del') {
    // 删除部门方法
    delDepartment(command.data.id)
  }
}
// 删除部门方法
const delDepartment = (id:string) => {
  ElMessageBox.confirm('确定要删除该部门吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  type:'warning'
  }).then(async () => {
    await delDepartmentAPI(id)
    ElMessage.success('删除部门成功')
    await getDepartmentList()
}).catch(()=>{})
}
onMounted(() => {
  // 初始化部门列表
  getDepartmentList()
})
</script>

<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 表头 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col :span="20"> {{ department?.companyName }} </el-col>
          <el-col :span="2" class="manager"> 负责人 </el-col>
          <el-col :span="2">
            <el-dropdown>
              <span class="el-dropdown-link">
                操作
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
        <!-- 树状列表 -->
        <el-tree
          :data="treeList"
          node-key="id"
          default-expand-all
          :expand-on-click-node="true"
        >
          <template #default="{ data }">
            <el-row type="flex" justify="space-evenly" align="middle" style="height: 40px">
              <el-col :span="20"> {{ data?.name }} </el-col>
              <el-col :span="2" class="manager"> {{ data?.manager }} </el-col>
              <el-col :span="2">
                <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                    操作
                    <el-icon class="el-icon--right">
                      <arrow-down />
                    </el-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item :command="{type:'add',data:data}">添加子部门</el-dropdown-item>
                      <el-dropdown-item :command="{type:'edit',data:data}">编辑部门</el-dropdown-item>
                      <el-dropdown-item :command="{type:'del',data:data}">删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加弹窗 -->
     <addDept ref="addForm" @getList="getDepartmentList" :node-data="nodeData" :title="title"></addDept>
  </div>
</template>

<style lang="scss" scoped>
.el-card{
  padding: 30px;
  font-size: 14px;
  height: calc(100vh - 70px);
  overflow: auto;
}
.el-row{
  width: 100%;
}
.manager{
  text-align: right;
  padding-right: 50px;
}

</style>