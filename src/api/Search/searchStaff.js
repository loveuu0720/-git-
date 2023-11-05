import request from '@/utils/request'

// 根据用户名搜索员工
export const searchStaff = (params) => {
    return request({
        url: '/employee/getpage',
        method: 'get',
        params: {
            page: params.page,
            pageSize: params.pageSize,
            username:params.key
        }
    })  
}