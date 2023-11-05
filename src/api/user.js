import request from '@/utils/request'


// 后台员工登录接口
export const staffUserLogin = ({ username, password })=>{
    return request({
        url: '/employee/login',
        method:'POST',
        data:{
            username,
            password
        }
    })
}

