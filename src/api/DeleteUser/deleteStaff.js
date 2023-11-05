// 删除员工
import request from '@/utils/request'
export const deleteStaff = (id) => {
    return request({
        url: `/employee/remove/${id}`,
        method: 'get',
    })
}