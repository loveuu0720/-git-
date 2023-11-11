<script setup>
import {
    Check,
    Delete,
    Edit,
    CreditCard,
    Search,
    Star,
} from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
// 引入提现订单信息接口
import { cashOrder } from '@/api/getAllOrder/cashOrder'
// 引入打款的接口
import { payMoney } from '@/api/ChangeStatus/cashOrder'
// 总页数
let total = ref(1)
// 当前页数
let pageNo = ref(1)
// 每页的数量
let limit = ref(10)
// 提现订单数据（数组）
let cashList = ref([])
/**
 * 
 */
onMounted(() => {
    getCashOrder()
})
// 封装获取提现订单管理的方法
const getCashOrder = async () => {
    let res = await cashOrder(pageNo.value, limit.value)
    cashList.value = res.data.records
    total.value = Number(res.data.total)
}
// 分页器页面条数切换的回调
const changeSize = () => {
    getCashOrder()
}
// 点击打款的回调
const changeStatus = async(id)=>{
   let res =  await payMoney(id)
   if(res.data === '操作成功') {
    ElMessage.success('打款成功')
   }else {
    ElMessage.error('打款失败！！！')
   }
   getCashOrder()
}
</script>

<template>
    <transition name="el-zoom-in-center">
        <div>
            <!-- main -->
            <!-- table展示用户信息 -->
            <el-card style="margin-top: 0px">
                <h1 class="title">提现订单管理</h1>
                <el-table border style="margin: 10px 0px" :data="cashList">
                    <el-table-column label="序号" width="60px" type="index" align="center"></el-table-column>
                    <el-table-column label="提现账户" prop="account" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="账户实名" prop="accountRealName" align="center"
                        show-overflow-tooltip></el-table-column>
                    <el-table-column label="到账时间" prop="accountTime" align="center" show-overflow-tooltip>
                        <template #="{row,$index}">
                            <span v-if="row.accountTime">{{ row.accountTime }}</span>
                            <span v-else>暂未到账</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="提现金额" prop="amountOfMoney" align="center"
                        show-overflow-tooltip></el-table-column>
                    <el-table-column label="创建时间" prop="createTime" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="订单id" prop="id" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="状态" align="center" width="383px">
                        <template #default="{ row, $index }">
                            <el-select v-model="row.status" disabled>
                                <el-option label="已取消订单" value="-1">已取消订单</el-option>
                                <el-option label="待到帐" value="1">待到帐</el-option>
                                <el-option label="已到帐" value="2">已到帐</el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="确认打款" align="center">
                        <template #default="{ row, $index }">
                            <el-button class="btn_pay" type="success" :icon="CreditCard" @click="changeStatus(row.id)" :disabled="row.status == -1 || row.status == 2 ">确认打款</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[5, 10, 15]"
                    :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total"
                    @size-change="changeSize()" @current-change="getCashOrder()" />
            </el-card>
        </div>
    </transition>
</template>

<style scoped lang="scss" >
:deep() .el-radio__input {
    &[ is-disabled] {
        opacity: 0.8;
        cursor: not-allowed;
        background: red;
    }
}

.title {
    text-align: center;
    font-size: 25px;
    margin-top: -10px;
}
.btn_pay {
    background: #7c83a5;
    border: none;
}
.btn_pay:disabled {
    background: #d3d3d3;
    border: none;
}
.btn_pay:disabled:hover {
    background: #d3d3d3;
    border: none;
}
.btn_pay:hover {
    background: #404455;
}
</style>
 