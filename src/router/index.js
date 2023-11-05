import { ElMenuItem, ElMessage } from 'element-plus';
import { createRouter, createWebHistory } from 'vue-router'
// 引入封装的nprogress.js
import { start, close } from '@/utils/nprogress';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 登录页
      path: '/login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      // 架子
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/index/index',
      children: [
        {
          path:'/index/index',
          component:()=>import('@/views/index/index.vue')
        },
        {
          path: '/order/doctorOrder',
          component: () => import('@/views/order/doctorOrder.vue')
        },
        {
          path: '/order/escortOrder',
          component: () => import('@/views/order/escortOrder.vue')
        },
        {
          path: '/order/refundOrder',
          component: () => import('@/views/order/refundOrder.vue')
        },
        {
          path: '/order',
          redirect: '/order/sendOrder',
          children:[
            {
              path:'/order/sendOrder',
              component:()=>import('@/views/order/sendOrder.vue')
            },
            {
              path:'/order/buyOrder',
              component:()=>import('@/views/order/buyOrder.vue')
            }
          ]
        },
        {
          path: '/user/allUser',
          redirect: '/user/allUser/doctorUser',
          children: [
            {
              path: '/user/allUser/doctorUser',
              component: () => import('@/views/user/allUser/doctorUser.vue')
            },
            {
              path: '/user/allUser/compUser',
              component: () => import('@/views/user/allUser/compUser.vue')
            },
            {
              path: '/user/allUser/silkUser',
              component: () => import('@/views/user/allUser/silkUser.vue')
            }
          ]
        },
        {
          path: '/user/staffUser',
          component: () => import('@/views/user/staffUser.vue')
        },
        {
          path: '/map',
          component: () => import('@/views/map/index.vue')
        },
        {
          path: '/medicine',
          component: () => import('@/views/medicine/index.vue')
        },
        {
          path:'/hospital',
          component:()=>import('@/views/hospital/index.vue')
        },
        
      ]
    },

  ],
  // 滚动行为 为了防止页面在滚动的时候元素偏移
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})
// 全局前置守卫
router.beforeEach((to, from, next) => {
    // 开始进度条
    start()
  // 在这里可以进行需要的判断和逻辑处理
  // 如果满足条件，调用next()继续路由导航，否则调用next('/login')进行跳转
  const token = localStorage.getItem('user_token')
  if (!token) {
    // 检查当前路由是否已经是登录页
    if (to.path === '/login') {
      next();
    } else {
      alert("token异常")
      ElMessage.error("token异常,请重新登录")
      next('/login');
    }
  } else {
    next();
  }
  // 进度条结束
  close()
});

export default router
