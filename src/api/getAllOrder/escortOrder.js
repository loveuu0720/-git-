import request from '@/utils/request'// 获取陪诊订单管理接口
export const cescortOrder = () => { 
    return request({
        url: `/accompanyingorder/page`,
        method: 'get',
    })
}