import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(persist)

// 默认导出
export default pinia

export * from '@/stores/user.js'
