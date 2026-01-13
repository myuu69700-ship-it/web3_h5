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
  min-height: 100vh;
  background-color: #070210;
}
</style>

