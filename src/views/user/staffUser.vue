<script setup>
import { ref, onMounted, reactive } from 'vue'
import { staffUser } from '@/api/Alluser/staffUser'
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
import { deleteStaff } from '@/api/DeleteUser/deleteStaff'
import { searchStaff } from '@/api/Search/searchStaff'
import { addStaff } from '@/api/add/index'
import { ElMessage } from 'element-plus'
import { staffChange } from '@/api/ChangeOrDelete/staffChange'
// 当前页面|条数|用户搜索关键字
let pageNo = ref({
  page: 1,
  pageSize: 10,
  key: ''
})
// 总共的条数 
let total = ref()
// 员工的数据
const staffList = ref([])
// 每一个员工的所有属性
const staffUserList = reactive({})
// 控制抽屉的开关
const drawer = ref(false)
// 控制dialog的开关
const dialog = ref(false)
// 封装员工信息的函数
const getStaffUser = async () => {
  let res = await staffUser(pageNo.value)
  staffList.value = res.data.records
  total.value = parseInt(res.data.total)
}
// 页面刷新获取
onMounted(() => {
  getStaffUser()
})
// 点击编辑的回调
const editStaff = (row) => {
  drawer.value = !drawer.value
  Object.assign(staffUserList, row)
}
// 点击抽屉取消的回调
const cancel = () => {
  drawer.value = !drawer.value
}
// 点击抽屉确定的回调
const submit = async () => {
  let res = await staffChange(staffUserList)
  if (res.code === "1") {
    ElMessage.success("修改成功")
    getStaffUser()
  } else {
    ElMessage.error("修改失败")
  }
  drawer.value = !drawer.value
}
// 点击泡泡确认框的确认删除的回调
const deleteUser = async (id) => {
  ElMessage.success("删除成功")
  await deleteStaff(id)
  // 刷新重新获取最新数据
  getStaffUser()
}
// 点击搜索按钮的回调
const searchUser = async () => {
  let res = await searchStaff(pageNo.value)
  staffList.value = res.data.records

}
// 点击重置的回调
const reset = () => {
  // 清空数据
  window.location.reload();
}
// 点击添加员工的回调
const addUser = () => {
  dialog.value = !dialog.value
  //清空数据
  Object.assign(staffUserList, {
    username: '',
    name: '',
    password: '',
    phone: '',
    idnumber: '',
    sex: 1,
    status: 1,
  });
}
// 点击确定添加按钮的回调
const subAdd = async () => {
  await form.value.validate()
  let res = await addStaff(staffUserList)
  if (res.code === "1") {
    ElMessage.success("添加成功")
    getStaffUser()
  } else {
    ElMessage.error("添加失败")
  }
  dialog.value = !dialog.value
}
// 分页器显示条数发生变化的回调
const changeSize = () => {
  getStaffUser()
}
// 表单校验规则
const updateRules = {
  name: [
    { required: true, message: '请输入用户名!', trigger: 'blur' },
    { required: true,min: 1, max: 6, message: "用户名长度必须1-6位!", trigger: 'blur' }
  ],
  username: [
    { required: true, message: '请输入员工姓名', trigger: 'blur' }
  ],
  idNum: [
    { required: true, message: '请输入身份证号码!', trigger: 'blur' },
    { required: true,max: 18, min: 18, message: '身份证号码必须18位!', trigger: 'blur' }
  ],
  phone: [{ required: true, message: '请输入手机号!', trigger: 'blur' },
  { required: true,pattern: /^1[3-9]\d{9}$/,message: '手机号格式错误!',trigger: 'blur'}],
  password: [{ required: true, message: '请输入密码!', trigger: 'blur' },
  { required: true,min: 6, max: 16, trigger: 'blur',message:'密码必须6-16位!' }]
}
</script>

<template>
  <div class="page-enter">
    <!-- 头部 -->
    <el-card style="height: 80px">
      <el-form :inline="true">
        <el-form-item label="查询员工">
          <el-input placeholder="请输入员工用户名" v-model="pageNo.key"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" title="请添加搜索条件" @click="searchUser">搜索</el-button>
          <el-button size="large" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- main -->
    <!-- table展示用户信息 -->
    <el-card style="margin-top: 10px">
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button type="primary" :icon="Plus" @click="addUser">添加员工</el-button>
      <!-- 表格组件：用于展示产品数据 -->
      <el-table border style="margin: 10px 0px" :data="staffList">
        <el-table-column label="序号" width="60px" type="index" align="center"></el-table-column>
        <el-table-column label="员工姓名" prop="name" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户名" prop="username" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="手机号" prop="phone" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="身份证号码" prop="idnumber" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="性别" prop="sex" align="center" show-overflow-tooltip>
          <template #default="{ row, $index }">
            <el-radio-group v-model="row.sex">
              <el-radio label="0" disabled>男</el-radio>
              <el-radio label="1" disabled>女</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="380px" prop="status">
          <template #default="{ row, $index }">
            <el-radio-group v-model="row.status">
              <el-radio label="1" disabled>启用</el-radio>
              <el-radio label="0" disabled>禁用</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="400px">
          <template #default="{ row, $index }">
            <el-button type="primary" :icon="Edit" @click="editStaff(row)">编辑</el-button>
            <el-popconfirm title="你确定要删除吗?" @confirm="deleteUser(row.id)">
              <template #reference>
                <el-button type="danger" :icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination v-model:current-page="pageNo.page" v-model:page-size="pageNo.pageSize" :page-sizes="[5, 10, 15]"
        :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="changeSize"
        @current-change="getStaffUser()" />

      <!-- (修改)抽屉组件 -->
      <el-drawer v-model="drawer" title="修改患者信息" direction="rtl">
        <el-form :rules="updateRules" :model="staffUserList" label-position="left" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input placeholder="请输入用户名" v-model="staffUserList.username" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input placeholder="请输入手机号" v-model="staffUserList.phone" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group placeholder="请选择状态" v-model="staffUserList.status">
              <el-radio label="0">禁用</el-radio>
              <el-radio label="1">启用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group placeholder="请选择性别" v-model="staffUserList.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit">确认</el-button>
          </div>
        </template>
      </el-drawer>

      <!-- 添加用户的dialog -->
      <el-dialog v-model="dialog" title="新增医生" width="30%">
        <el-form :rules="updateRules" label-position="left" label-width="100px" :model="staffUserList" style="max-width: 460px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="staffUserList.username" />
          </el-form-item>
          <el-form-item label="员工姓名" prop="username">
            <el-input v-model="staffUserList.name" />
          </el-form-item>
          <el-form-item label="身份证号码" prop="idNum">
            <el-input v-model="staffUserList.idnumber" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="staffUserList.phone" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="staffUserList.password" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button>取消</el-button>
          <el-button type="primary" @click="subAdd">确定</el-button>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<style scoped lang="scss">

</style>
