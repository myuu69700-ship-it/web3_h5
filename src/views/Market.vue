<template>
  <div class="market">
    <van-nav-bar title="市场" fixed placeholder />
    
    <div class="content">
      <van-cell-group inset>
        <van-cell title="市场行情" value="实时数据" />
      </van-cell-group>
      
      <van-divider>市场概览</van-divider>
      
      <van-grid :column-num="2" :gutter="10">
        <van-grid-item>
          <div class="market-item">
            <div class="label">BTC/USDT</div>
            <div class="value up">$45,230.50</div>
            <div class="change">+2.5%</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="market-item">
            <div class="label">ETH/USDT</div>
            <div class="value up">$2,850.30</div>
            <div class="change">+1.8%</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="market-item">
            <div class="label">BNB/USDT</div>
            <div class="value down">$315.20</div>
            <div class="change">-0.5%</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="market-item">
            <div class="label">SOL/USDT</div>
            <div class="value up">$98.50</div>
            <div class="change">+3.2%</div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script setup>
// Market 页面
</script>

<style lang="scss" scoped>
.market {
  min-height: 100vh;
  padding-bottom: 60px;
}

.content {
  padding: 16px;
}

.market-item {
  text-align: center;
  padding: 16px 0;
  
  .label {
    font-size: 14px;
    color: #969799;
    margin-bottom: 8px;
  }
  
  .value {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 4px;
    
    &.up {
      color: #ee0a24;
    }
    
    &.down {
      color: #07c160;
    }
  }
  
  .change {
    font-size: 12px;
    color: #969799;
  }
}
</style>

