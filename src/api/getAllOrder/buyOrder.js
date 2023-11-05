import request from '@/utils/request'// 获取买药
export const buyMedicine = (params) => {
    return request({
        url: `/buyMedicine/page`,
        method: 'get',
        params: {
            page: params.page,
            pageSize: params.pageSize
        }

    })
}

export const getDetail = (id)=>{
    return request({
        url:`/buyMedicine/drugList/${id}`,
        method:'get',
        params:{
            id:id
        }
    })
}