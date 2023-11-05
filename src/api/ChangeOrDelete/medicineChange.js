// 修改药品
import request from '@/utils/request'
export const medicineChange = (data) => {
    return request({
        url: '/drug/update',
        method: 'post',
        data
    })
}

// 删除药品
export const medicineDelete = (id)=>{
    return request({
        url:`/drug/remove/${id}`,
        method:'get'
    })
}

