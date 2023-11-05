import request from '@/utils/request'
export const sendChange = (params) => {
    return request({
        url: `/sendMedicine/send/${params.id}`,
        method: 'get',
        params:{
            id:params.id,
            trackingNumber:params.trackingNumber
        }
    })
}