<script setup>
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
// 引入接口
import { doctorUser } from '@/api/Alluser/doctorUser'
// 引入更改医生信息接口
import { docotrChange } from '@/api/ChangeOrDelete/doctorChange'
import { ElMessage } from 'element-plus';
import { addDoctor } from '@/api/add/index'
import { searchDoctor } from '@/api/Search/searchDoctor'
import { deleteDoctor } from '@/api/DeleteUser/deleteDoctor'
// 总页数
let total = ref(0)
// 当前页数|条数
let pageNo = ref({
    page: 1,
    pageSize: 10,
    key: ''
})
// 医生数据
let orderList = ref([])
// 每一个医生的数据(对象)
let doctorList = reactive({})
//控制抽屉的显示
const drawer = ref(false)
// 控制添加用户的弹框
const dialog = ref(false)
// 表单实例
const form = ref()
// 页面刷新就获取
onMounted(() => {
    getDoctorUser()
})
// 封装请求医生管理数据的方法
const getDoctorUser = async () => {
    let res = await doctorUser(pageNo.value)
    orderList.value = res.data.records
    total.value = parseInt(res.data.total);
}
// 分页切换页面数量的时候
const handleSizeChange = () => {
    getDoctorUser()
}
// 分页切换页面的时候
const handleCurrentChange = () => {
    getDoctorUser()
}
// 点击搜索医生的回调
const searchUser = async () => {
    let res = await searchDoctor(pageNo.value)
    console.log(res);
    orderList.value = res.data
}
// 点击重置按钮的回调
const reset = () => {
    // 清空数据
    window.location.reload();
}
// 点击编辑按钮的回调
const editDoctor = (row) => {
    drawer.value = !drawer.value
    Object.assign(doctorList, row)
}
// 抽屉里点击确定按钮的回调
const submit = async () => {
    await docotrChange(doctorList)
    // 提示
    ElMessage.success("修改成功")
    // 重新获取数据
    getDoctorUser()
    // 关闭抽屉
    drawer.value = !drawer.value
}
// 抽屉里点击取消按钮的回调
const cancel = () => {
    // 关闭抽屉
    drawer.value = !drawer.value
}
// 添加医生按钮的回调
const addUser = async () => {
    // 显示dialog框
    dialog.value = !dialog.value
    // 清空上一次的校验
    await form.value.clearValidate()
    //清空数据
    Object.assign(doctorList, {
        username: '',
        name: '',
        password: '',
        idnumber: '',
        hospitalname: '',
        departmentname: '',
        phone: '',
        briefIntroduction: '',
        sex: 0,
        idleState: 0,
    });
    

}
// 点击添加医生确定按钮的回调
const subAdd = async () => {
    // 关闭dialog框
    // dialog.value = !dialog.value
    await form.value.validate()
    let res = await addDoctor(doctorList)
    if (res.code === "1") {
        ElMessage.success("添加成功")
    } else {
        ElMessage.error("添加失败")
    }
    getDoctorUser()
    // 关闭dialog
    dialog.value = !dialog.value
}
// 点击删除按钮的回调
const deleteUser = async (id) => {
    let res = await deleteDoctor(id)
    if(res.code === "1") {
        ElMessage.success("删除成功")
        getDoctorUser()
    }else {
        ElMessage.error("删除失败")
    }

}
// 校验用户名字的回调函数
const validatorUsername = (_rule, value, callback) => {
    if (value === '') {
        callback(new Error('用户名不能为空！'))
    } else if (value.trim().length < 2) {
        callback(new Error('用户名至少2位！'))
    } else {
        callback()
    }
}
// 校验用户昵称的回调函数
const validatorPhone = (_rule, value, callback) => {
    if (value === '') {
        callback(new Error('手机号不能为空!'))
    } else if (value.trim().length < 2) {
        callback(new Error('手机号必须11位!'))
    } else {
        callback()
    }
}
// 表单校验的规则对象
const rules = {
    // 医生用户名
    username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
    // 医生手机
    phone: [{ required: true, trigger: 'blur', validator: validatorPhone }],
    // 医生简介
    briefIntroduction: [{ required: true, trigger: 'blur', message: '请填写医生简介！' }],

}
// 表单校验规则
const updateRules = {
    name: [{ required: true, message: '请输入用户名!', trigger: 'blur' }],
    username: [{ required: true, message: '请输入医生姓名', trigger: 'blur' }],
    idnumber:[{ required: true, message: '请输入合法的身份证号码!', trigger: 'blur' }],
    phone: [
        { required: true, message: '请输入手机号!', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误!', trigger: 'blur'}
    ],
    briefIntroduction:[{required:true,message:'医生简介不能为空!',trigger:'blur'}],
    hospitalname:[{required:true,message:'医院不能为空!',trigger:'blur'}],
    departmentname: [{ required: true, message: '科室不能为空!', trigger: 'blur' }]
}
</script>

<template>
    <!-- 头部 -->
    <el-card style="height: 80px">
        <el-form :inline="true">
            <el-form-item label="医生姓名">
                <el-input placeholder="请输入医生姓名" v-model="pageNo.key"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" @click="searchUser" title="请添加搜索条件">搜索</el-button>
                <el-button size="large" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <!-- main -->
    <!-- table展示用户信息 -->
    <el-card style="margin-top: 10px">
        <el-button type="primary" :icon="Plus" @click="addUser">新增医生</el-button>
        <el-table border style="margin: 10px 0px" :data="orderList" stripe>
            <el-table-column label="序号" width="60px" type="index" align="center"></el-table-column>
            <el-table-column label="医院" prop="hospitalname" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="科室" width="60px" prop="departmentname" align="center"
                show-overflow-tooltip></el-table-column>
            <el-table-column label="医生名" width="70px" prop="name" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户名" width="80px" prop="username" align="center"
                show-overflow-tooltip></el-table-column>
            <el-table-column label="身份证号码" prop="idnumber" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="手机号" prop="phone" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="医生简介" width="260px" prop="briefIntroduction" align="center"
                show-overflow-tooltip></el-table-column>
            <el-table-column label="性别" prop="sex" align="center" width="130px" show-overflow-tooltip>
                <template #default="{ row, $index }">
                    <el-radio-group v-model="row.sex">
                        <el-radio label="0" disabled>女</el-radio>
                        <el-radio label="1" disabled>男</el-radio>
                    </el-radio-group>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center" width="220px" prop="status">
                <template #default="{ row, $index }">
                    <el-radio-group v-model="row.status">
                        <el-radio label="0" border disabled>禁用</el-radio>
                        <el-radio label="1" border disabled>启用</el-radio>
                    </el-radio-group>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="220px">
                <template #default="{ row, $index }">
                    <el-button type="primary" :icon="Edit" @click="editDoctor(row)" class="btn">编辑</el-button>
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
            :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />

        <!-- 抽屉组件(修改) -->
        <el-drawer v-model="drawer" title="修改医生信息" direction="rtl">
            <el-form :rules="rules" :model="doctorList" label-position="left" label-width="80px">
                <el-form-item label="用户名" :rules="rules" prop="username">
                    <el-input placeholder="请输入用户名" v-model="doctorList.username" />
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input placeholder="请输入手机号" v-model="doctorList.phone" />
                </el-form-item>
                <el-form-item label="医生简介" prop="briefIntroduction">
                    <el-input placeholder="请输入医生简介" v-model="doctorList.briefIntroduction" type="textarea" autosize />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group placeholder="请选择性别" v-model="doctorList.sex">
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
            <el-form ref="form" :rules="updateRules" label-position="left" label-width="100px" :model="doctorList" style="max-width: 460px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="doctorList.name" />
                </el-form-item>
                <el-form-item label="医生姓名" prop="username">
                    <el-input v-model="doctorList.username" />
                </el-form-item>
                <el-form-item label="身份证号码" prop="idnumber">
                    <el-input v-model="doctorList.idnumber" />
                </el-form-item>
                <el-form-item label="医院" prop="hospitalname">
                    <el-input v-model="doctorList.hospitalname" />
                </el-form-item>
                <el-form-item label="科室" prop="departmentname">
                    <el-input v-model="doctorList.departmentname" />
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="doctorList.phone" />
                </el-form-item>
                <el-form-item label="医生简介" prop="briefIntroduction">
                    <el-input v-model="doctorList.briefIntroduction" type="textarea" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button>取消</el-button>
                <el-button type="primary" @click="subAdd">确定</el-button>
            </template>
        </el-dialog>
    </el-card>
</template>

<style scoped lang="scss">

.btn {
    background: #7c83a5;
    border: none;
}

.btn:hover {
    background: #404455;
}
</style>
