import request from '@/utils/request'
export const silkChange = (data) => {
    return request({
        url: '/patientuser/modify',
        method: 'post',
        data
    })
}