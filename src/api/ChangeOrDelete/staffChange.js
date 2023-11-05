import request from '@/utils/request'
export const staffChange = (data) => {
    return request({
        url: '/employee',
        method: 'post',
        data
    })
}