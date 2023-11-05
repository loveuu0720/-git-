// 后台员工信息接口
import request from '@/utils/request';
export const staffUser = (pageNo) => {
    return request({
        url: '/employee/page',
        method: 'get',
        params: {
            page: pageNo.page,
            pageSize: pageNo.pageSize
        }
    })
}