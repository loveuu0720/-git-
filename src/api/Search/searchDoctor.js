import request from '@/utils/request'

// 根据用户名搜索员工
export const searchDoctor = (params) => {
    return request({
        url: '/doctor/pageByUsername',
        method: 'post',
        params: {
            page: params.page,
            pageSize: params.pageSize,
            username:params.key
        }
    })
}