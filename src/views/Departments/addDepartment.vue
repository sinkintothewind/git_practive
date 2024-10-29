<script setup lang="ts">
import { ref,defineExpose,defineEmits, nextTick } from 'vue';
import type { addDept, Manager,Dept} from '@/types/department'
import { addDepartmentAPI,getManagerListAPI,departmentDetailAPI,editDepartmentAPI } from '@/api/department'
import { ElMessage } from 'element-plus';
// 弹窗显示与隐藏
const dialogVisible = ref(false)
const openAddDialog = () => {
  dialogVisible.value = true
  getManagerList()
}
// const closeAddDialog = () => {
//     dialogVisible.value=false
// }
// 父级使用子级数据与方法
// 添加弹窗数据
const addForm = ref<addDept>({
  code: '',
  introduce: '',
  manager: '',
  name: '',
  pid:'',
  id:'',
  createTime:''
})
// 添加弹窗验证规则-死数据不用ref
const addFormRules = {
    name: [
    { required: true, message: '请输入部门名称', trigger: 'blur' },
    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入部门编码', trigger: 'blur' },
    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
  ],
  manager: [
    { required: true, message: '请选择部门负责人', trigger: 'change' }
  ],
  introduce: [
    { required: true, message: '请输入部门介绍', trigger: 'blur' },
    { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
  ]
}
// 获取负责人下拉数据
const manager=ref<Manager[]>()
const getManagerList = async () => {
    const res = await getManagerListAPI()
  manager.value = res.data
    console.log('负责人列表');

}
// 获取部门详细数据
const getDepartmentDetail = async () => {
  await nextTick()
  const res = await departmentDetailAPI(props.nodeData!.id)
  addForm.value = res.data
console.log('部门回显');

}
// 点击确定按钮
const addDeptRef=ref<HTMLFormElement | null>()
const submit = () => {
    addDeptRef.value?.validate(async(valid:boolean) => {
        if (!valid) return
      if (addForm.value.id === '') {
      addForm.value.pid = props.nodeData!.id
        await addDepartmentAPI(addForm.value)
      } else {
        await editDepartmentAPI(props.nodeData!.id,addForm.value)
        }
            ElMessage.success(`${addForm.value.id?'编辑':'添加'}部门成功`)
            dialogVisible.value = false
            // 刷新列表
            emit('getList')
        }
    )
}
// 获取父级刷新列表方法
const emit = defineEmits<{ (e: 'getList'): void }>()
// 获取父级数据
const props = defineProps<{ nodeData?: Dept,title?:string }>()
// 向父级传递方法
defineExpose ( {
  openAddDialog,
  getDepartmentDetail
})
// 关闭弹窗清空数据
const closeDialog = () => {
  // 清空表单
  console.log('关闭弹窗');
addForm.value =({
  code: '',
  introduce: '',
  manager: '',
  name: '',
  pid: '',
  id:'',
  createTime:''
  })
  // 清空验证规则
  addDeptRef.value?.resetFields()
}
</script>
<template>
    <div class="addDept-container">
        <el-dialog
    v-model="dialogVisible"
    :title="props.title"
style="width: 30%!important;"
    @close="closeDialog"
  >
<el-form :model="addForm" ref="addDeptRef" :rules="addFormRules" label-width="100px
">
    <el-form-item label="部门名称" prop="name">
<el-input v-model="addForm.name"></el-input>
    </el-form-item>
    <el-form-item label="部门编码" prop="code">
<el-input v-model="addForm.code"></el-input>
    </el-form-item>
    <el-form-item label="部门负责人" prop="manager">
        <el-select
      v-model="addForm.manager"
      placeholder="请选择负责人"
    >
      <el-option
        v-for="item in manager"
        :key="item.id"
        :label="item.username"
        :value="item.username"
      />
    </el-select>
    </el-form-item>
    <el-form-item label="部门介绍" prop="introduce">
<el-input v-model="addForm.introduce"></el-input>
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

<style lang="scss" scoped>
.el-dialog{
  padding: 0!important;
}
</style>