<template>
  <div class="about">
    <van-nav-bar title="关于" left-arrow @click-left="goBack" fixed placeholder />
    
    <div class="content">
      <van-card
        title="Vue3 H5 项目"
        desc="基于 Vue3 + Vite + Pinia + Vant 构建"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      >
        <template #tags>
          <van-tag type="primary">Vue3</van-tag>
          <van-tag type="success">Vite</van-tag>
          <van-tag type="warning">Pinia</van-tag>
          <van-tag type="danger">Vant</van-tag>
        </template>
      </van-card>
      
      <van-cell-group inset title="技术栈">
        <van-cell title="Vue" value="3.4.0" />
        <van-cell title="Vite" value="5.0.0" />
        <van-cell title="Pinia" value="2.1.7" />
        <van-cell title="Vant" value="4.8.0" />
      </van-cell-group>
      
      <van-cell-group inset title="功能特性">
        <van-cell title="✅ 响应式设计" />
        <van-cell title="✅ 状态管理" />
        <van-cell title="✅ 路由配置" />
        <van-cell title="✅ UI 组件库" />
      </van-cell-group>
      
      <div class="footer">
        <van-button type="primary" block @click="showDialog">显示对话框</van-button>
      </div>
    </div>
    
    <van-dialog
      v-model:show="show"
      title="提示"
      message="这是一个使用 Vant 组件库的对话框示例"
      confirm-button-text="确定"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const show = ref(false)

const goBack = () => {
  router.back()
}

const showDialog = () => {
  show.value = true
}
</script>

<style lang="scss" scoped>
.about {
  min-height: 100vh;
  padding-bottom: 20px;
}

.content {
  padding: 16px;
}

.footer {
  margin-top: 20px;
}
</style>

