// 删除医生
import request from '@/utils/request'
export const deleteDoctor = (id) => {
    return request({
        url: `/doctor/delDoc/${id}`,
        method: 'get',
    })
}