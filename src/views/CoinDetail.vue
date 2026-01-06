<template>
  <div class="coin-detail">
    <!-- 顶部导航栏 -->
    <div class="top-bar">
      <van-icon name="arrow-left" class="back-icon" @click="goBack" />
      <div class="coin-pair-title">
        <span>{{ coinPair }} 期權</span>
        <van-icon name="arrow-down" class="dropdown-icon" />
      </div>
      <div class="top-actions">
        <van-icon name="setting-o" class="action-icon" />
        <van-icon name="star-o" class="action-icon" />
        <!-- <span class="hide-text" @click="toggleChart">
          {{ isChartHidden ? '展開' : '隱藏' }}
          <van-icon :name="isChartHidden ? 'arrow-down' : 'arrow-up'" class="hide-arrow" />
        </span> -->
      </div>
    </div>

    <!-- 图表区域 -->
    <div v-if="!isChartHidden" class="chart-section">
      <ChartComponent :coin-pair="coinPair" />
    </div>

    <!-- 主要内容区域：交易控制和订单簿 -->
    <div class="main-content">
      <!-- 左侧：交易控制区域 -->
      <TradingPanel
        v-model:trade-type="tradeType"
        v-model:direction="direction"
        v-model:amount="amount"
        v-model:slider-value="sliderValue"
        :current-balance="currentBalance"
        :min-buy="minBuy"
        :max-buy="maxBuy"
        :trading-interval="tradingInterval"
        :selected-time="selectedTime"
        @show-interval-picker="showIntervalPicker = true"
        @show-time-picker="showTimePicker = true"
        @trade="handleTrade"
      />

      <!-- 右侧：订单簿区域 -->
      <OrderBook
        :buy-orders="buyOrders"
        :sell-orders="sellOrders"
        :current-price="currentPrice"
        :price-change="priceChange"
      />
    </div>

    <!-- 订单历史标签 -->
    <div class="order-history-tabs">
      <div
        class="history-tab"
        :class="{ active: activeHistoryTab === 'options' }"
        @click="activeHistoryTab = 'options'"
      >
        期權訂單
      </div>
      <div
        class="history-tab"
        :class="{ active: activeHistoryTab === 'history' }"
        @click="activeHistoryTab = 'history'"
      >
        歷史訂單
      </div>
    </div>

    <!-- 订单历史内容 -->
    <div class="order-history-content">
      <div v-if="orderList.length === 0" class="empty-orders">
        <van-icon name="orders-o" size="48" color="#c8c9cc" />
        <p>暫無數據</p>
      </div>
      <div v-else class="orders-list">
        <!-- 订单列表 -->
      </div>
    </div>

    <!-- 时间选择器 -->
    <van-popup v-model:show="showTimePicker" position="bottom">
      <van-date-picker
        v-model="currentDate"
        type="datetime"
        title="選擇時間"
        @confirm="confirmTime"
        @cancel="showTimePicker = false"
      />
    </van-popup>

    <!-- 区间选择器 -->
    <van-popup v-model:show="showIntervalPicker" position="bottom">
      <van-picker
        :columns="intervalColumns"
        @confirm="confirmInterval"
        @cancel="showIntervalPicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ChartComponent from '@/components/Home/ChartComponent.vue'
import TradingPanel from '@/components/CoinDetail/TradingPanel.vue'
import OrderBook from '@/components/CoinDetail/OrderBook.vue'

const route = useRoute()
const router = useRouter()

// 从路由参数获取币种信息
const coinPair = computed(() => {
  const pair = route.params.pair || 'FIL/USDT'
  return decodeURIComponent(pair)
})

const tradeType = ref('instant') // 'instant' | 'timed'
const direction = ref('up') // 'up' | 'down'
const currentBalance = ref(0)
const minBuy = ref(1)
const maxBuy = ref(5000000)
const tradingInterval = ref('30s-15%')
const selectedTime = ref('')
const amount = ref('0')
const sliderValue = ref(0)
const showTimePicker = ref(false)
const showIntervalPicker = ref(false)
const currentDate = ref(new Date())
const isChartHidden = ref(false)
const activeHistoryTab = ref('options')
const orderList = ref([])

// 当前价格和涨跌幅 - 根据图片使用 FIL/USDT 的价格范围
const currentPrice = ref(1.5885)
const priceChange = ref(5.94)

// 订单簿数据 - 根据图片调整价格范围
const buyOrders = ref([
  { price: 1.5911, amount: 148.6, highlight: false },
  { price: 1.5893, amount: 318.7359, highlight: true },
  { price: 1.5899, amount: 750.99, highlight: false },
  { price: 1.5924, amount: 148.8, highlight: false },
  { price: 1.5889, amount: 318.7354, highlight: true },
  { price: 1.5897, amount: 247.9009, highlight: false },
])

const sellOrders = ref([
  { price: 1.5847, amount: 148.8, highlight: false },
  { price: 1.5874, amount: 467.2352, highlight: true },
  { price: 1.5879, amount: 31.8739, highlight: false },
  { price: 1.5864, amount: 1742.1762, highlight: true },
  { price: 1.5844, amount: 148.3, highlight: false },
  { price: 1.5856, amount: 630.1997, highlight: false },
])

const intervalColumns = [
  { text: '30s-15%', value: '30s-15%' },
  { text: '1m-20%', value: '1m-20%' },
  { text: '5m-30%', value: '5m-30%' },
  { text: '15m-50%', value: '15m-50%' },
]

let priceUpdateInterval = null

const goBack = () => {
  router.back()
}

// const toggleChart = () => {
//   isChartHidden.value = !isChartHidden.value
// }

const handleTrade = (tradeData) => {
  console.log('交易:', {
    coinPair: coinPair.value,
    ...tradeData
  })
  // 这里可以添加交易逻辑
}

const confirmTime = (value) => {
  const date = new Date(value)
  selectedTime.value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  showTimePicker.value = false
}

const confirmInterval = ({ selectedValues }) => {
  tradingInterval.value = selectedValues[0].text
  showIntervalPicker.value = false
}

// 模拟实时更新价格
onMounted(() => {
  priceUpdateInterval = setInterval(() => {
    // 模拟价格波动 - FIL/USDT 价格范围
    const change = (Math.random() - 0.5) * 0.01
    currentPrice.value = Math.max(1.58, Math.min(1.60, currentPrice.value + change))
    priceChange.value = Number((Math.random() * 6).toFixed(2))
    
    // 更新订单簿价格 - 随机高亮某些订单
    buyOrders.value = buyOrders.value.map((order, index) => ({
      price: order.price + (Math.random() - 0.5) * 0.001,
      amount: order.amount,
      highlight: Math.random() > 0.7 // 随机高亮
    }))
    
    sellOrders.value = sellOrders.value.map((order, index) => ({
      price: order.price + (Math.random() - 0.5) * 0.001,
      amount: order.amount,
      highlight: Math.random() > 0.7 // 随机高亮
    }))
  }, 3000)
})

onUnmounted(() => {
  if (priceUpdateInterval) {
    clearInterval(priceUpdateInterval)
  }
})
</script>

<style lang="scss" scoped>
.coin-detail {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding-bottom: 80px;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  .back-icon {
    font-size: 20px;
    color: #040303;
    cursor: pointer;
  }

  .coin-pair-title {
    font-size: 16px;
    font-weight: 600;
    color: #040303;
    flex: 1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    .dropdown-icon {
      font-size: 14px;
      color: #969799;
    }
  }

  .top-actions {
    display: flex;
    align-items: center;
    gap: 12px;

    .action-icon {
      font-size: 20px;
      color: #040303;
      cursor: pointer;
    }

    .hide-text {
      font-size: 14px;
      color: #040303;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 2px;

      .hide-arrow {
        font-size: 12px;
      }
    }
  }
}

.chart-section {
  background-color: #fff;
  margin: 12px;
  border-radius: 8px;
  overflow: hidden;
}

.main-content {
  display: flex;
  gap: 12px;
  padding: 0 12px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.order-history-tabs {
  display: flex;
  background-color: #fff;
  margin: 12px;
  border-radius: 8px 8px 0 0;
  padding: 0;
  border-bottom: 1px solid #ebedf0;

  .history-tab {
    flex: 1;
    padding: 12px 16px;
    text-align: center;
    font-size: 14px;
    color: #7e7e7e;
    cursor: pointer;
    transition: all 0.3s;
    border-bottom: 2px solid transparent;

    &.active {
      color: #040303;
      font-weight: 500;
      border-bottom-color: #040303;
    }
  }
}

.order-history-content {
  background-color: #fff;
  margin: 0 12px 12px;
  border-radius: 0 0 8px 8px;
  min-height: 200px;
  padding: 40px 20px;

  .empty-orders {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #c8c9cc;
    gap: 12px;

    p {
      font-size: 14px;
      color: #969799;
    }
  }
}
</style>

