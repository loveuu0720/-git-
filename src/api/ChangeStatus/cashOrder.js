import request from '@/utils/request'
// 确认打款
export const payMoney = (id) => {
    return request({
        url: `/withdrawalOrder/complete/${id}`,
        method: 'get',
    })
}
