import request from '@/utils/request'// 获取退款订单接口
export const refundOrder = (pageNo,limit) => {
    return request({
        url: "/order-refund/page",
        method: 'get',
        params:{
            page: pageNo,
            pageSize: limit
        }
    })
}