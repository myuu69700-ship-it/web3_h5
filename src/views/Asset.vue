<template>
  <div class="asset">
    <van-nav-bar title="资产" fixed placeholder />
    
    <div class="content">
      <van-cell-group inset>
        <van-cell title="总资产" value="¥125,680.50" />
        <van-cell title="可用余额" value="¥85,230.00" />
        <van-cell title="冻结金额" value="¥40,450.50" />
      </van-cell-group>
      
      <van-divider>资产明细</van-divider>
      
      <van-cell-group inset>
        <van-cell
          v-for="item in assetList"
          :key="item.name"
          :title="item.name"
          :value="item.amount"
          :label="item.value"
          is-link
        />
      </van-cell-group>
      
      <van-divider>快捷操作</van-divider>
      
      <van-grid :column-num="4" :gutter="10">
        <van-grid-item icon="balance-o" text="充值" />
        <van-grid-item icon="cash-out" text="提现" />
        <van-grid-item icon="exchange" text="转账" />
        <van-grid-item icon="records" text="记录" />
      </van-grid>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const assetList = ref([
  { name: 'BTC', amount: '0.5234', value: '¥23,680.50' },
  { name: 'ETH', amount: '5.2345', value: '¥14,920.30' },
  { name: 'USDT', amount: '10,000', value: '¥70,000.00' },
  { name: 'BNB', amount: '15.6789', value: '¥4,940.20' }
])
</script>

<style lang="scss" scoped>
.asset {
  min-height: 100vh;
  padding-bottom: 60px;
}

.content {
  padding: 16px;
}
</style>

