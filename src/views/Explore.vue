<template>
  <div class="explore">
    <van-nav-bar title="探索" fixed placeholder />
    
    <div class="content">
      <van-cell-group inset>
        <van-cell title="发现" value="更多内容" />
      </van-cell-group>
      
      <van-divider>热门推荐</van-divider>
      
      <van-grid :column-num="3" :gutter="10">
        <van-grid-item icon="fire-o" text="热门" />
        <van-grid-item icon="star-o" text="收藏" />
        <van-grid-item icon="new-o" text="最新" />
        <van-grid-item icon="hot-o" text="趋势" />
        <van-grid-item icon="like-o" text="推荐" />
        <van-grid-item icon="share-o" text="分享" />
      </van-grid>
      
      <van-divider>内容列表</van-divider>
      
      <van-list>
        <van-cell
          v-for="item in list"
          :key="item"
          :title="`内容 ${item}`"
          :label="`这是第 ${item} 条内容描述`"
          is-link
        />
      </van-list>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const list = ref([1, 2, 3, 4, 5, 6, 7, 8])
</script>

<style lang="scss" scoped>
.explore {
  min-height: 100vh;
  padding-bottom: 60px;
}

.content {
  padding: 16px;
}
</style>

