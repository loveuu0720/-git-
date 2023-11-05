import request from '@/utils/request'

// 根据用户名搜索员工
export const searchUser = (params) => {
    return request({
        url: '/traineruser/getpage',
        method: 'get',
        params: {
            page: params.page,
            pageSize: params.pageSize,
            username: params.key
        }
    })
}