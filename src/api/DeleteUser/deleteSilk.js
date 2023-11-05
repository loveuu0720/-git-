// 删除患者订单
import request from '@/utils/request'
export const deleteSilk = (id) => {
    return request({
        url: `/patientuser/remove/${id}`,
        method: 'get',
    })
}