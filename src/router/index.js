import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 登录页
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      // 架子
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/order/doctorOrder',
      children: [
        {
          path: '/order/doctorOrder',
          component: () => import('@/views/order/doctorOrder.vue')
        },
        {
          path: '/order/escortOrder',
          component: () => import('@/views/order/escortOrder.vue')
        },
        {
          path: 'user/clintUser',
          component: () => import('@/views/user/clintUser.vue')
        },
        {
          path: 'user/staffUser',
          component: () => import('@/views/user/staffUser.vue')
        }
      ]
    }
  ],
  // 滚动行为 为了防止页面在滚动的时候元素偏移
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router
