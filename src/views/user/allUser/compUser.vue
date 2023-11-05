<script setup>
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
// 引入获取陪诊师的接口
import { compUser } from '@/api/Alluser/compUser'
// 引入更改陪诊师信息的接口
import { compChange } from '@/api/ChangeOrDelete/campChange'
// 引入删除陪诊师的接口
import { deleteComp } from '@/api/DeleteUser/deletecomp'
// 引入添加陪诊师的接口
import { addComp } from '@/api/add/index'
// 引入搜索陪诊师接口
import { searchUser } from '@/api/Search/searchComp'
import { ElMessage } from 'element-plus'
// 总页数
let total = ref(1)
// 当前页数|数量
let pageNo = ref({
    page: 1,
    pageSize: 10,
    key: ''
})
// 陪诊师数据（数组）
let compUserList = ref([])
// 每个陪诊师的数据(对象)
let compList = reactive({})
// 控制抽屉的开关
const drawer = ref(false)
// 控制dialog的开关
const dialog = ref(false)
// 新增表单实例
const form = ref()
// 封装获取陪诊师的函数
const getCompUser = async () => {
    let res = await compUser(pageNo.value)
    compUserList.value = res.data.records
    total.value = parseInt(res.data.total)
}
// 页面一刷新就获取
onMounted(() => {
    getCompUser()
})
// 点击编辑按钮的回调
const editComp = (row) => {
    drawer.value = !drawer.value
    Object.assign(compList, row)
}
// 点击抽屉确定按钮的回调
const submit = async () => {
    // 修改数据
    await compChange(compList)
    // 提示
    ElMessage.success("修改成功")
    // 拿到最新数据
    getCompUser()
    // 关闭抽屉
    drawer.value = !drawer.value
}
// 点击抽屉取消按钮的回调
const cancel = () => {
    // 关闭抽屉
    drawer.value = !drawer.value
}
// 点击删除按钮的回调
const deletecomp = async (id) => {
    await deleteComp(id)
    // 提示
    ElMessage.success("删除成功")
    // 获取最新数据
    getCompUser()
}
// 点击添加陪诊师按钮的回调
const addUser = async () => {
    // 打开dialog
    dialog.value = !dialog.value
    // 清空表单校验
    await form.value.clearValidate()
    //清空数据
    Object.assign(compList, {
        username: '',
        name: '',
        address: '',
        qualificationid: '',
        password: '',
        cost: '',
        phone: '',
        idNumber: '',
        sex: 1,
    });
}
// 点击确认添加的回调
const subAdd = async () => {
    await form.value.validate()
    await addComp(compList)
    dialog.value = !dialog.value
    ElMessage.success("添加成功")
    getCompUser()
}
// 点击搜索按钮的回调
const searchComp = async () => {
    let res = await searchUser(pageNo.value);
    compUserList.value = res.data
}
// 点击重置的回调
const reset = () => {
    // 清空数据
    window.location.reload();
}
// 分页页数的回调
const changeSize = () => {
    getCompUser()
}
// 表单校验规则
const updateRules = {
    name: [
        { required: true, message: '请输入用户名!', trigger: 'change' },
        { required: true, min: 1, max: 6, message: "用户名长度必须1-6位!", trigger: 'blur' }
    ],
    username: [
        { required: true, message: '请输入员工姓名', trigger: 'blur' }
    ],
    idnumber: [
        { required: true, message: '请输入身份证号码!', trigger: 'blur' },
        { min: 15, max: 18, message: '身份证号码必须18位!', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入手机号!', trigger: 'blur' },
        { required: true, pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误!', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码!', trigger: 'blur' },
        { required: true, min: 6, max: 16, trigger: 'blur', message: '密码必须6-16位!' }
    ],
    address: [
        { required: true, message: '家庭住址不能为空!', trigger: 'blur' }
    ],
    qualificationid: [{ required: true, message: '资格证id不能为空!', trigger: 'blur' }],
}
</script>

<template>
    <!-- 头部 -->
    <el-card style="height: 80px">
        <el-form :inline="true">
            <el-form-item label="陪诊师姓名">
                <el-input placeholder="请输入陪诊师姓名" v-model="pageNo.key"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" title="请添加搜索条件" @click="searchComp">搜索</el-button>
                <el-button size="large" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <!-- main -->
    <!-- table展示用户信息 -->
    <el-card style="margin-top: 10px">
        <el-button type="primary" :icon="Plus" @click="addUser">添加陪诊师</el-button>
        <el-table border style="margin: 10px 0px" :data="compUserList">
            <el-table-column label="序号" width="60px" type="index" align="center"></el-table-column>
            <el-table-column label="地址" prop="address" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="价格" prop="cost" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="陪诊师姓名" prop="name" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户名" prop="username" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="密码" prop="password" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="手机号" prop="phone" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="资格证" prop="qualificationid" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="性别" prop="gender" align="center" width="200px" show-overflow-tooltip>
                <template #default="{ row, $index }">
                    <el-radio-group v-model="row.sex">
                        <el-radio label="0" disabled>男</el-radio>
                        <el-radio label="1" disabled>女</el-radio>
                    </el-radio-group>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center" width="300px">
                <template #default="{ row, $index }">
                    <el-radio-group placeholder="请选择状态" v-model="row.status">
                        <el-radio label="0" border disabled>禁用</el-radio>
                        <el-radio label="1" border disabled>启用</el-radio>
                    </el-radio-group>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="300px">
                <template #default="{ row, $index }">
                    <el-button type="primary" :icon="Edit" @click="editComp(row)">编辑</el-button>
                    <el-popconfirm title="你确定要删除吗?" @confirm="deletecomp(row.id)">
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
            @current-change="getCompUser()" />
        <!-- 抽屉组件(修改用户) -->
        <el-drawer v-model="drawer" title="修改陪诊师信息" direction="rtl">
            <el-form :rules="updateRules" :model="compList" label-position="left" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input placeholder="请输入用户名" v-model="compList.username" />
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input placeholder="请输入手机号" v-model="compList.phone" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group placeholder="请选择状态" v-model="compList.status">
                        <el-radio label="1">启用</el-radio>
                        <el-radio label="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group placeholder="请选择状态" v-model="compList.sex">
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
        <el-dialog v-model="dialog" title="新增陪诊师" width="30%">
            <el-form ref="form" :rules="updateRules" label-position="left" label-width="100px" :model="compList"
                style="max-width: 460px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="compList.name" />
                </el-form-item>
                <el-form-item label="陪诊师姓名" prop="username">
                    <el-input v-model="compList.username" />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="compList.sex">
                        <el-radio label="0">女</el-radio>
                        <el-radio label="1">男</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="身份证号码" prop="idNumber">
                    <el-input v-model="compList.idNumber" />
                </el-form-item>
                <el-form-item label="家庭地址" prop="address">
                    <el-input v-model="compList.address" />
                </el-form-item>
                <el-form-item label="资格证id" prop="qualificationid">
                    <el-input v-model="compList.qualificationid" />
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="compList.phone" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="compList.password" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button>取消</el-button>
                <el-button type="primary" @click="subAdd">确定</el-button>
            </template>
        </el-dialog>
    </el-card>
</template>

<style scoped lang="scss"></style>
