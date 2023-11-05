// 引入定义API仓库
import { defineStore } from "pinia"
// 引入登录接口
import { staffUserLogin } from '@/api/user'

// 创建小仓库
let useUserStore = defineStore('name',{
    state:() =>{
       return{
        username:''
       }
   },
    // 异步|逻辑地方
    actions:{
        async userInfo(){
          let res =  await staffUserLogin()
          console.log(res);
        }
    }
})

export default useUserStore