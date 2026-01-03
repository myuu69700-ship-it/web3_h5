<template>
  <div class="home">
    <van-nav-bar title="首页" fixed placeholder />
    
    <div class="content">
      <van-cell-group inset>
        <van-cell title="欢迎使用 Vue3 H5" value="Vite + Pinia + Vant" />
        <van-cell title="当前用户" :value="userStore.userInfo.name || '未登录'" />
        <van-cell title="登录状态" :value="userStore.isLogin ? '已登录' : '未登录'" />
      </van-cell-group>
      
      <div class="button-group">
        <van-button type="primary" block @click="handleLogin">
          {{ userStore.isLogin ? '退出登录' : '登录' }}
        </van-button>
        <van-button type="success" block @click="goToAbout">前往关于页面</van-button>
      </div>
      
      <van-divider>功能演示</van-divider>
      
      <van-grid :column-num="3" :gutter="10">
        <van-grid-item icon="photo-o" text="图片" />
        <van-grid-item icon="goods-collect-o" text="商品" />
        <van-grid-item icon="chat-o" text="聊天" />
        <van-grid-item icon="setting-o" text="设置" />
        <van-grid-item icon="location-o" text="位置" />
        <van-grid-item icon="like-o" text="点赞" />
      </van-grid>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const userStore = useUserStore()
const router = useRouter()

const handleLogin = () => {
  if (userStore.isLogin) {
    userStore.logout()
    showToast('已退出登录')
  } else {
    userStore.setToken('mock-token-' + Date.now())
    userStore.setUserInfo({
      name: '用户' + Math.floor(Math.random() * 1000),
      avatar: ''
    })
    showToast('登录成功')
  }
}

const goToAbout = () => {
  router.push('/about')
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  padding-bottom: 20px;
}

.content {
  padding: 16px;
}

.button-group {
  margin-top: 16px;
  
  .van-button {
    margin-bottom: 12px;
  }
}
</style>

