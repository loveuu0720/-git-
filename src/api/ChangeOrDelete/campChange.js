import request from '@/utils/request'
export const compChange = (data) => {
    return request({
        url: '/traineruser/modify',
        method: 'post',
        data
    })
}