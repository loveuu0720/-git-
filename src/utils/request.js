import axios from 'axios'
// 引入用户相关的仓库
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL: baseURL,
  timeout: 5000
})

// request实例添加请求与响应式拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    let userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)
// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 4. 摘取核心响应数据
    if (res.data.code == 0) {
      return res
    }
    // TODO 3. 处理业务失败
    // 处理业务失败（抛出错误）
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 5. 处理401错误
    //提示错误信息 =>401权限不足 或 token过期 ==>跳转到login
    if (err.response?.status === 401) {
      router.push('./login')
    }

    // 错误的默认情况 =>只需要给到提示
    ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  }
)

export default instance
