<script setup lang="ts">
import { getRolesListAPI,delRoleAPI, getCompanyAPI, getRoleDetailAPI } from '@/api/setting'
import type { Role,Page, company } from '@/types/setting';
import { ElMessage, ElMessageBox, ElTree } from 'element-plus';
import { onMounted, ref } from 'vue';
import addForm from '@/views/Setting/addRole.vue'
import {useUserStore }from '@/store/user'
import type { data } from '@/types/permission';
import { assignPermissionAPI, getPermissionListAPI } from '@/api/permission';
import { listToTree } from '@/utils';
// 获取用户id 直接读取解构 pinia 的数据
const { userInfo } = useUserStore()
// 获取公司信息
const companyInfo=ref<company>()
const genCompanyInfo = async() => {
  const res = await getCompanyAPI(userInfo!.companyId )
companyInfo.value=res.data
}
// 获取角色列表
const roleList = ref<Role[]>()
const params = ref<Page>({
    page: 1,
pagesize:10
})
const total=ref(0)
const getRoleList =async () => {
    const res = await getRolesListAPI(params.value)
    roleList.value = res.data.rows
total.value=res.data.total
}
// 页码尺寸修改
const handleSizeChange=(val:number)=> {
    params.value.pagesize = val
    getRoleList()
}
// 页码修改
const handleCurrentChange=(val:number)=> {
    params.value.page = val
    getRoleList()
}
// 序号计算
const handleIndex = (index:number) => {
    return index+1+(params.value.page-1)*params.value.pagesize
}
// 获取子组件方法
const addComponent = ref<InstanceType<typeof addForm> | null>()
  // 父级向子级传数据
const title=ref<string>('')
// 添加角色
const addRole = () => {
  // 打开弹窗
  addComponent.value?.openDialog()
  title.value='添加角色'
}
// 编辑角色
const editRole = (id:string) => {
  addComponent.value?.openDialog()
  title.value='编辑角色'
  // 数据回显-调用子组件函数即可
  addComponent.value?.getRoleDetail(id)
}
// 删除角色
const delRole = (id: string) => {
    ElMessageBox.confirm('确定要删除该角色吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning'
    }).then(async() => {
        await delRoleAPI(id)
        ElMessage.success('删除角色成功')
        getRoleList()
    }).catch(()=>{})
}
// 定义分配权限弹窗
const assignDialogVisible = ref<boolean>(false)
// 定义保存修改后的权限内容时需要的id
const assignId = ref<string>()
// 树结构配置
const defaultProps = {
  children: 'children',
label: 'name'
}
// 定义permission数据
const permissionTree = ref<data[]>([])
// 获取树形结构组件
const treeRef=ref<InstanceType<typeof ElTree> | null>()
// 分配权限按钮
const assignPermission = async (id: string) => {
  assignId.value=id
  assignDialogVisible.value = true
  // 展示树结构内容
  const res = await getPermissionListAPI()
  permissionTree.value = listToTree(res.data, '0')
  // 回显已有的权限
  const result = await getRoleDetailAPI(id)
  treeRef.value?.setCheckedKeys(result.data.permIds || [])
}
// 分配权限提交
const assignPermSubmit = async() => {
  await assignPermissionAPI(assignId.value!, treeRef.value?.getCheckedKeys() as string[] || [])
  ElMessage.success('分配权限成功')
  assignDialogVisible.value=false
}
// 关闭分配权限弹窗
const assignDialogClose = () => {
  assignDialogVisible.value=false
}
// 初始化钩子
onMounted(() => {
  getRoleList()
  genCompanyInfo()
})
</script>

<template>
    <div class="setting-container">
<div class="app-container">
    <el-card>
        <el-tabs>
            <!-- 左侧 -->
          <el-tab-pane label="角色管理">
            <!-- 按钮 -->
            <el-button type="primary" @click="addRole">
              <el-icon>
                <Plus />
              </el-icon>新增角色</el-button>
            <!-- 表格 -->
            <el-table :data="roleList" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
              <el-table-column label="序号" type="index" :index="handleIndex" width="150" />
              <el-table-column label="角色名称" prop="name" width="230" />
              <el-table-column label="描述" prop="description" width="550"/>
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button type="success" size="small" @click="assignPermission(scope.row.id)">分配权限</el-button>
                  <el-button type="primary" size="small" @click="editRole(scope.row.id)">编辑</el-button>
                  <el-button type="danger" size="small" @click="delRole(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pager" style="margin-top:10px;display:flex;justify-content:flex-end;">
                    <!-- 分页 -->
                    <el-pagination
      v-model:current-page="params.page"
      v-model:page-size="params.pagesize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      size="small"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
            </div>
          </el-tab-pane>

          <el-tab-pane label="公司信息">
            <!-- 警告信息 -->
            <el-alert title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改" type="info" show-icon :closable="false" />
            <!-- 表单 -->
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input disabled style="width:400px" :model-value="companyInfo?.name"/>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input disabled style="width:400px" :model-value="companyInfo?.companyAddress" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input disabled style="width:400px" :model-value="companyInfo?.mailbox"/>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="3" disabled style="width:400px" :model-value="companyInfo?.remarks" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

    </el-card>
</div>
<!-- 添加角色弹窗 -->
 <addForm  ref="addComponent" :title="title" @getList="getRoleList"/>
 <!-- 分配权限弹窗 -->
 <el-dialog
    v-model="assignDialogVisible"
    title="分配权限"
    width="500"
@close="assignDialogClose"
  >
  <el-tree
    ref="treeRef"
    style="max-width: 600px"
    :data="permissionTree"
    show-checkbox
    default-expand-all
    node-key="id"
    highlight-current
    :props="defaultProps"
  />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="assignDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="assignPermSubmit">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.el-card{
  padding: 20px;
  height: calc(100vh - 70px);
  overflow: auto;
}
.el-table {
    margin-top: 10px;
}
.el-pagination {
    margin-top: 20px;
}
</style>