// 删除医院
import request from '@/utils/request'
export const deleteHspAndPart = (id) => {
    return request({
        url: `/hospital/removeAll/${id}`,
        method: 'get',
    })
}

