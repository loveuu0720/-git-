<script setup>
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
import { silkUser } from '@/api/Alluser/silkUser';
// 引入删除患者接口
import { deleteSilk } from '@/api/DeleteUser/deleteSilk'
// 引入更改|新增患者接口
import { silkChange } from '@/api/ChangeOrDelete/silkChange'
import { addSilk } from '@/api/add/index'
import { ElMessage } from 'element-plus';
// 引入根据用户名搜索患者
import { searchSilk } from '@/api/Search/searchSilk'
// 总页数
let total = ref(1)
// 当前页数|条数
let pageNo = ref({
    page: 1,
    pageSize: 10,
    key: ''
})
// 订单数据（数组）
let silkUserList = ref([])
// 一个病人的数据
let silkList = reactive({})
// 控制抽屉的开关
const drawer = ref(false)
// 控制dialog的开关
const dialog = ref(false)
// 新增表单实例
const form  = ref()
// 封装获取患者的函数
const getSilkUserInfo = async () => {
    let res = await silkUser(pageNo.value)
    silkUserList.value = res.data.records
    total.value = parseInt(res.data.total)
}
// 页面刷新执行
onMounted(() => {
    getSilkUserInfo()
})
// 点击编辑按钮的回调
const editSilk = (row) => {
    drawer.value = !drawer.value
    Object.assign(silkList, row)
}
// 点击删除按钮的回调
const deleteUser = async (id) => {
    let res = await deleteSilk(id)
    if (res.code === '1') {
        ElMessage.success("删除成功")
    } else {
        ElMessage.error("删除失败")
    }
    getSilkUserInfo()
}
// 抽屉点击确定按钮的回调
const submit = async () => {
    await form.value.validate()
    // 修改信息
    await silkChange(silkList)
    // 提示
    ElMessage.success("修改成功！")
    // 页面刷新获取最新数据
    getSilkUserInfo()
    // 关闭抽屉
    drawer.value = !drawer.value

}
// 点击取消按钮的回调
const cancel = () => {
    drawer.value = !drawer.value
}
// 搜索用户
const searchUser = async () => {
    let res = await searchSilk(pageNo.value)
    console.log(res);
    silkUserList.value = res.data.records
}
// 重置按钮的回调
const reset = () => {
    // 清空数据
    window.location.reload();
}
// 新增患者按钮回调
const addUser = async() => {
    // 打开dialog
    dialog.value = !dialog.value
    // 清空校验
    await form.value.clearValidate()
    // 清空数据
    Object.assign(silkList, {
        address: '',
        name: '',
        username: '',
        password: '',
        idnumber: '',
        phone: '',
        sex: 0,
        status: 1
    });
}
// 点击确定新增按钮的回调
const subAdd = async () => {
    await form.value.validate()
    let res = await addSilk(silkList)
    if (res.code === "1") {
        ElMessage.success("添加成功")
        getSilkUserInfo()
    } else {
        ElMessage.error("添加失败")
    }
    dialog.value = !dialog.value
}
// 页面条数改变的回调
const changeSize = () => {
    getSilkUserInfo()
}
// 表单校验规则
const updateRules = {
    name: [
        { required: true, message: '请输入用户名!', trigger: 'blur' },
        { required: true, min: 1, max: 6, message: "用户名长度必须1-6位!", trigger: 'blur' }
    ],
    username: [
        { required: true, message: '请输入患者姓名', trigger: 'blur' }
    ],
    idnumber: [
        { required: true, message: '请输入身份证号码!', trigger: 'blur' },
        {min:15,max:18,message:'请输入合法的身份证号码',trigger:'blur'}
    ],
    phone: [
        { required: true, message: '请输入手机号!', trigger: 'blur' },
        { required: true, pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误!', trigger: 'blur' }
    ],
    address: [
        { required: true, message: '家庭住址不能为空!', trigger: 'blur' }
    ],
}
</script>
<template>
    <!-- 头部 -->
    <el-card style="height: 80px">
        <el-form :inline="true">
            <el-form-item label="患者姓名">
                <el-input placeholder="请输入患者用户名" v-model="pageNo.key"></el-input>
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
        <el-button type="primary" :icon="Plus" @click="addUser">添加患者</el-button>
        <el-table border style="margin: 10px 0px" :data="silkUserList">
            <el-table-column label="序号" width="60px" type="index" align="center"></el-table-column>
            <el-table-column label="患者ID" prop="id" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="患者姓名" prop="name" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户名" prop="username" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="家庭住址" prop="address" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="身份证号码" prop="idnumber" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="手机号" prop="phone" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="性别" prop="gender" align="center" width="200px" show-overflow-tooltip>
                <template #default="{ row, $index }">
                    <el-radio-group v-model="row.sex">
                        <el-radio label="0" disabled>男</el-radio>
                        <el-radio label="1" disabled>女</el-radio>
                    </el-radio-group>
                </template>
            </el-table-column>
            <el-table-column prop="silkUserList.sex" label="状态" align="center" width="300px">
                <template #default="{ row, $index }">
                    <el-radio-group v-model="row.status">
                        <el-radio label="0" border disabled>禁用</el-radio>
                        <el-radio label="1" border disabled>启用</el-radio>
                    </el-radio-group>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="300px">
                <template #="{ row, $index }">
                    <el-button type="primary" :icon="Edit" @click="editSilk(row)">编辑</el-button>
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
            @current-change="getSilkUserInfo()" />

        <!-- 抽屉组件(修改) -->
        <el-drawer v-model="drawer" title="修改患者信息" direction="rtl">
            <el-form :rules="updateRules" :model="silkList" label-position="left" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input placeholder="请输入用户名" v-model="silkList.username" />
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input placeholder="请输入手机号" v-model="silkList.phone" />
                </el-form-item>
                <el-form-item label="家庭住址" prop="address">
                    <el-input placeholder="请输入医生简介" v-model="silkList.address" type="textarea" autosize />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group placeholder="请选择性别" v-model="silkList.sex">
                        <el-radio label="0">男</el-radio>
                        <el-radio label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="submit(silkUserList)">确认</el-button>
                </div>
            </template>
        </el-drawer>

        <!-- 添加用户的dialog -->
        <el-dialog v-model="dialog" title="新增患者" width="30%">
            <el-form ref="form" :rules="updateRules" label-position="left" label-width="100px" :model="silkList"
                style="max-width: 460px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="silkList.name" />
                </el-form-item>
                <el-form-item label="患者姓名" prop="username">
                    <el-input v-model="silkList.username" />
                </el-form-item>
                <el-form-item label="身份证号码" prop="idnumber">
                    <el-input v-model="silkList.idnumber" />
                </el-form-item>
                <el-form-item label="家庭住址" prop="address">
                    <el-input v-model="silkList.address" />
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="silkList.phone" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button>取消</el-button>
                <el-button type="primary" @click="subAdd">确定</el-button>
            </template>
        </el-dialog>
    </el-card>
</template>

<style scoped></style>
