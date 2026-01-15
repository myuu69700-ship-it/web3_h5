<template>
  <div id="app">
    <router-view />
    <TabBar />
  </div>
</template>

<script setup>
import TabBar from '@/components/TabBar.vue'
</script>

<style lang="scss">
#app {
  width: 100%;
  // 使用动态可视高度，避免移动端浏览器底部/顶部工具栏伸缩导致 100vh 抖动
  min-height: var(--app-height, 100dvh);
  // 预留底部 TabBar 高度，避免内容被 fixed TabBar 遮挡
  padding-bottom: var(--app-tabbar-height);
  background-color: #070210;
}
</style>

