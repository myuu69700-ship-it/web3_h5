import { defineStore } from 'pinia'

// 用户信息 store
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      name: '',
      avatar: ''
    },
    token: ''
  }),
  
  getters: {
    isLogin: (state) => !!state.token
  },
  
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    
    setToken(token) {
      this.token = token
    },
    
    logout() {
      this.userInfo = {
        name: '',
        avatar: ''
      }
      this.token = ''
    }
  },
  
  // 如果需要持久化，可以手动实现或安装 pinia-plugin-persistedstate
})

// 应用配置 store
export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'light',
    loading: false
  }),
  
  actions: {
    setTheme(theme) {
      this.theme = theme
    },
    
    setLoading(loading) {
      this.loading = loading
    }
  }
})

// 语言 store
export const useLanguageStore = defineStore('language', {
  state: () => {
    // 从 localStorage 读取，如果没有则使用默认值
    const savedLang = localStorage.getItem('language')
    return {
      currentLang: savedLang || 'zh-TW' // 默认繁体中文
    }
  },
  
  getters: {
    getCurrentLang: (state) => state.currentLang
  },
  
  actions: {
    setLanguage(lang) {
      this.currentLang = lang
      localStorage.setItem('language', lang)
    }
  }
})

