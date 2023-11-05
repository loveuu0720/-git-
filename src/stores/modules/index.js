import { createPinia } from "pinia"
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)
// 暴露出去
export default pinia
