// 删除陪诊师订单
import request from '@/utils/request'
export const deleteComp = (id) => {
    return request({
        url: `/traineruser/remove/${id}`,
        method: 'get',
    })
}