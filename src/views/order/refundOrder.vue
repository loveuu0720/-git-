<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { refundOrder } from '../../api/getAllOrder/refundOrder'
import { refundStatus } from '../../api/ChangeStatus/refundStatus'
import { ElMessage } from 'element-plus';
// 获取的页数
const pageNo = ref(1)
// 页面的条数
const limit = ref(5)
// 总共的条数
const total = ref(0)
// 退款订单数据
const refundList = ref([])
onMounted(() => {
  getRefundList()
})
// 封装获取退款订单的接口
const getRefundList = async () => {
  let res = await refundOrder(pageNo.value, limit.value)
  refundList.value = res.data.records
  total.value = parseInt(res.data.total)

}
// 点击更换状态发请求
const changeState = async (row) => {
    getRefundList()
 let res =  await refundStatus(row)
 console.log(res);
 
  ElMessage.success("修改状态成功")
  getRefundList()

}
</script>

<template>
  <el-card style="margin-top: 0px">
    <h1 class="title">退款订单管理</h1>
    <el-table border style="margin: 10px 0px" :data="refundList">
      <el-table-column label="序号" width="60px" type="index" align="center"></el-table-column>
      <el-table-column label="订单ID" prop="orderId" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="订单类型" prop="orderType" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="退款人ID" prop="patientUserId" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="退款人姓名" prop="patientUserName" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="手机号" prop="phone" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="退款理由" prop="refundReason" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="状态" align="center" width="403px">
        <template #default="{ row, $index }">
          <el-radio-group v-model="row.state" @change="changeState(row)">
            <el-radio label="0" border>未处理</el-radio>
            <el-radio label="1" border>申请通过</el-radio>
            <el-radio label="2" border>申请拒绝</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[5, 10, 15]" :background="true"
      layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="getRefundList()"
      @current-change="getRefundList()" />
  </el-card>
</template>

<style scoped>
.title {
  text-align: center;
  font-size: 25px;
  margin-top: -10px;
}
</style>