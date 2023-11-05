import request from '@/utils/request';

// 新增医生
export const addDoctor = (data) => {
    return request({
        url: '/doctor/add',
        method: 'post',
        data
    })
}

// 新增陪诊师
export const addComp = (data) => {
    return request({
        url: '/traineruser',
        method: 'post',
        data
    })
}

// 新增患者
export const addSilk = (data) => {
    return request({
        url: '/patientuser',
        method: 'post',
        data
    })
}

// 新增员工
export const addStaff = (data) => {
    return request({
        url: '/employee',
        method: 'post',
        data
    })
}

// 新增药品
export const medicineAdd = (data) => {
    return request({
        url: '/drug/add',
        method: "post",
        data
    })
}


