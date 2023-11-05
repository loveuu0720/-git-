// 后台陪诊师管理接口
import request from '@/utils/request';
export const silkUser = (pageNo) => {
    return request({
        url: '/patientuser/page',
        method: 'get',
        params: {
            page: pageNo.page,
            pageSize: pageNo.pageSize
        }
    })
}