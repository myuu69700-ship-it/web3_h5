<template>
  <div class="trade">
    <van-nav-bar title="交易" fixed placeholder />
    
    <div class="content">
      <van-cell-group inset>
        <van-cell title="交易对" value="BTC/USDT" />
        <van-cell title="当前价格" value="$45,230.50" />
        <van-cell title="24h涨跌" value="+2.5%" />
      </van-cell-group>
      
      <van-divider>交易操作</van-divider>
      
      <div class="trade-actions">
        <van-button type="danger" block size="large" class="action-btn">
          买入
        </van-button>
        <van-button type="success" block size="large" class="action-btn">
          卖出
        </van-button>
      </div>
      
      <van-divider>订单记录</van-divider>
      
      <van-empty description="暂无订单记录" />
    </div>
  </div>
</template>

<script setup>
// Trade 页面
</script>

<style lang="scss" scoped>
.trade {
  min-height: 100vh;
  padding-bottom: 60px;
}

.content {
  padding: 16px;
}

.trade-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  
  .action-btn {
    flex: 1;
  }
}
</style>

