import request from '@/utils/request'

// 根据用户名搜索病人
export const searchSilk = (params) => {
    return request({
        url: '/patientuser/getpage',
        method: 'get',
        params: {
            page: params.page,
            pageSize: params.pageSize,
            username: params.key
        }
    })
}