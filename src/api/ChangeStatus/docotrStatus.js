import request from '@/utils/request'
// 修改订单状态
export const refundStatus = (params) => {
    return request({
        url: `/order/status/${params.id}`,
        method: 'PUT',
        params: {
            status: params.status
        }
    })
}
