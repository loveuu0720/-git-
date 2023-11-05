import request from '@/utils/request'


// 后台员工登录接口
export const addressLaAndLong = (address)=>{
    return request({
        url: `/getLonLat/${address}`,
        method:'get',
    })
}

// 获取全部医院的数据
export const getAllHosptal = ()=>{
    return  request ({
        url:'/hospital/list',
        method:'get'
    })
}
