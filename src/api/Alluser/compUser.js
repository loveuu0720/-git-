// 后台陪诊师管理接口
import request from '@/utils/request';
export const compUser = (params) => {
    return request({
        url: '/traineruser/page',
        method: 'get',
        params:{
            page:params.page,
            pageSize:params.pageSize
        }
    })
}