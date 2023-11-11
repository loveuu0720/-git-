<script setup>
import { ref, onMounted } from 'vue'
// 引入医生预约管理接口
import { doctorOrder } from '@/api/getAllOrder/doctorOrder'
// 引入更改状态的接口
import { refundStatus } from '@/api/ChangeStatus/docotrStatus'
import { ElMessage } from 'element-plus';
// 引入baseURL
import { baseURL } from '../../utils/request'
// 总页数
const total = ref(1)
// 医生数据（数组）
let doctorList = ref([])
// 当前的页码
const pageNo = ref(1)
// 条数
const limit = ref(5)
// 页面一刷新就获取数据
onMounted(() => {
  getDoctorInfo()
})
// 封装获取医生预约数据
const getDoctorInfo = async () => {
  let res = await doctorOrder(pageNo.value, limit.value)
  console.log(res);
  doctorList.value = res.data.records
  total.value = parseInt(res.data.total)
}
// 更改订单状态
const changeDoctor = async (row) => {
  console.log(row);
  await refundStatus(row)
  ElMessage.success("修改状态成功")
  // 刷新数据
  getDoctorInfo()
}
</script>

<template>
  <!-- main -->
  <!-- table展示用户信息 -->
  <el-card style="margin-top: 0px">
    <h1 class="title">医生预约订单管理</h1>
    <el-table stripe border style="margin: 10px 0px" :data="doctorList">
      <el-table-column label="序号" width="60px" type="index" align="center"></el-table-column>
      <el-table-column label="订单id" prop="id" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="医院" prop="hospital" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="科室" prop="department" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="医生姓名" prop="doctorname" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="医生电话" prop="phone" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="患者姓名" prop="patientuser" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="花费" prop="cost" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="医生头像" width="180px" prop="avatar" align="center" show-overflow-tooltip>
        <template #="{ row, $index }">
          <img :src="`${row.img}`" style="width: 150px; height: 180px" />
        </template>
      </el-table-column>
      <el-table-column label="预约时间" prop="reservationtime" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="是否需要陪诊" prop="comp" align="center" show-overflow-tooltip width="250px">
        <template #default="{ row, $index }">
          <el-radio-group v-model="row.status" @change="changeDoctor(row)">
            <el-radio class="qwq" label="1" border>需要</el-radio>
            <el-radio label="0" border>不需要</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[5, 10, 15]" :background="true"
      layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="getDoctorInfo()"
      @current-change="getDoctorInfo()" />
  </el-card>
</template>

<style scoped lang="scss">
.title {
  text-align: center;
  font-size: 25px;
  margin: -10px 0px 10px 0px;
}

</style>
