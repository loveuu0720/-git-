import request from '@/utils/request'// 获取寄药订单接口
export const sendMedicine = (params) => {
    return request({
        url: `/sendMedicine/page`,
        method: 'get',
        params: {
            page: params.page,
            pageSize: params.pageSize
        }

    })
}