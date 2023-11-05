// 后台医生管理接口
import  request  from '@/utils/request';
export const doctorUser = (params) => {
    return request({
        url: '/doctor/page',
        method: 'get',
        params:{
            page:params.page,
            pageSize: params.pageSize
        }
    })
}