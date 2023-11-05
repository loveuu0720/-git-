// 医生预约订单管理接口
// 引入封装的request
import request from '@/utils/request'
export const doctorOrder = (pageNo,limit) => {
    return request({
        url: '/order/page',
        method: 'get', 
        params:{
            page:pageNo,
            pageSize:limit
        }
    })
}