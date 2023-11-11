// 提现订单管理接口
import request from '@/utils/request'
export const cashOrder = (pageNo, limit) => {
    return request({
        url: '/withdrawalOrder/page',
        method: 'get',
        params: {
            page: pageNo,
            pageSize: limit
        }
    })
}