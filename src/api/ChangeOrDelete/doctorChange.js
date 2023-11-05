import  request  from '@/utils/request'
export const docotrChange = (data) => {
    return request({
        url: '/doctor/modify',
        method: 'post',
        data
    })
}