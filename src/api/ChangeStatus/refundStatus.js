import request from '@/utils/request'
// 修改订单状态
export const refundStatus = (params) => {
    return request({
        url: '/order-refund/AgreeToRefund',
        method: 'GET',
        params:{
            id: params.orderId,
            state:params.state
        }
    })
}
