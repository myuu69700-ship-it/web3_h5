import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/market',
    name: 'Market',
    component: () => import('@/views/Market.vue'),
    meta: {
      title: '市场'
    }
  },
  {
    path: '/trade',
    name: 'Trade',
    component: () => import('@/views/Trade.vue'),
    meta: {
      title: '交易'
    }
  },
  {
    path: '/explore',
    name: 'Explore',
    component: () => import('@/views/Explore.vue'),
    meta: {
      title: '探索'
    }
  },
  {
    path: '/asset',
    name: 'Asset',
    component: () => import('@/views/Asset.vue'),
    meta: {
      title: '资产'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      title: '关于'
    }
  },
  {
    path: '/language-select',
    name: 'LanguageSelect',
    component: () => import('@/views/LanguageSelect.vue'),
    meta: {
      title: '语言选择'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/ForgotPassword.vue'),
    meta: {
      title: '忘记密码'
    }
  },
  {
    path: '/terms-of-service',
    name: 'TermsOfService',
    component: () => import('@/views/TermsOfService/index.vue'),
    meta: {
      title: '服务条款'
    }
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('@/views/PrivacyPolicy.vue'),
    meta: {
      title: '隐私协议'
    }
  },
  {
    path: '/anti-money-laundering',
    name: 'AntiMoneyLaundering',
    component: () => import('@/views/AntiMoneyLaundering.vue'),
    meta: {
      title: '反洗钱协议'
    }
  },
  {
    path: '/coin/:pair',
    name: 'CoinDetail',
    component: () => import('@/views/CoinDetail.vue'),
    meta: {
      title: '币种详情'
    }
  },
  {
    path: '/my-assets',
    name: 'MyAssets',
    component: () => import('@/views/MyAssets.vue'),
    meta: {
      title: '我的资产'
    }
  },
  {
    path: '/deposit-detail',
    name: 'DepositDetail',
    component: () => import('@/views/DepositDetail.vue'),
    meta: {
      title: '儲值'
    }
  },
  {
    path: '/withdraw-detail',
    name: 'WithdrawDetail',
    component: () => import('@/views/WithdrawDetail.vue'),
    meta: {
      title: '提現'
    }
  },
  {
    path: '/transfer-detail',
    name: 'TransferDetail',
    component: () => import('@/views/TransferDetail.vue'),
    meta: {
      title: '劃轉'
    }
  },
  {
    path: '/order-center',
    name: 'OrderCenter',
    component: () => import('@/views/OrderCenter.vue'),
    meta: {
      title: '帳單'
    }
  },
  {
    path: '/product-detail',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail.vue'),
    meta: {
      title: 'DeFi 借幣'
    }
  },
  {
    path: '/tutorial-list',
    name: 'TutorialList',
    component: () => import('@/views/TutorialList.vue'),
    meta: {
      title: '新手教程'
    }
  },
  {
    path: '/tutorial-detail/:id',
    name: 'TutorialDetail',
    component: () => import('@/views/TutorialDetail.vue'),
    meta: {
      title: '新手教程'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 切换页面时自动滚动到顶部
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Vue3 H5 App'
  next()
})

export default router

