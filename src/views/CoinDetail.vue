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
      <div class="trading-section">
        <!-- 交易类型标签 -->
        <div class="trade-tabs">
          <div
            class="tab-item"
            :class="{ active: tradeType === 'instant' }"
            @click="tradeType = 'instant'"
          >
            立即交易
          </div>
          <div
            class="tab-item"
            :class="{ active: tradeType === 'timed' }"
            @click="tradeType = 'timed'"
          >
            定時交易
          </div>
        </div>

        <!-- 方向选择 -->
        <div class="direction-buttons">
          <button
            class="direction-btn buy-up"
            :class="{ active: direction === 'up' }"
            @click="direction = 'up'"
          >
            買漲
          </button>
          <button
            class="direction-btn buy-down"
            :class="{ active: direction === 'down' }"
            @click="direction = 'down'"
          >
            買跌
          </button>
        </div>

        <!-- 账户信息 -->
        <div class="account-info">
          <div class="info-item">
            <span class="label">當前餘額</span>
            <span class="value">${{ currentBalance }}</span>
          </div>
          <div class="info-item">
            <span class="label">最低買入</span>
            <span class="value">{{ minBuy }}</span>
          </div>
          <div class="info-item">
            <span class="label">最高買入</span>
            <span class="value">{{ maxBuy.toLocaleString() }}</span>
          </div>
        </div>

        <!-- 交易参数 -->
        <div class="trading-params">
          <van-field
            v-model="tradingInterval"
            label="交易區間"
            placeholder="30s-15%"
            readonly
            is-link
            @click="showIntervalPicker = true"
          />
          <van-field
            v-if="tradeType === 'timed'"
            v-model="selectedTime"
            label="選擇時間"
            placeholder="請選擇時間"
            readonly
            is-link
            @click="showTimePicker = true"
          />
          <van-field
            v-model="amount"
            label="投入金額"
            type="number"
            placeholder="0"
          />
          <div class="slider-container">
            <van-slider v-model="sliderValue" :min="0" :max="100" />
            <div class="slider-marks">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <!-- 交易按钮 -->
        <button
          class="trade-button"
          :class="direction === 'up' ? 'buy-up-btn' : 'buy-down-btn'"
          @click="handleTrade"
        >
          {{ direction === 'up' ? '買漲' : '買跌' }}
        </button>
      </div>

      <!-- 右侧：订单簿区域 -->
      <div class="order-book">
        <div class="order-book-content">
          <div class="order-section buy-section">
            <div class="order-header">買盤</div>
            <div class="order-list">
              <div
                v-for="(order, index) in buyOrders"
                :key="index"
                class="order-item buy-order"
              >
                <span class="order-price">{{ order.price.toFixed(4) }}</span>
                <span class="order-amount">{{ order.amount }}</span>
              </div>
            </div>
          </div>

          <div class="current-price">
            <div class="price-value">{{ currentPrice.toFixed(4) }}</div>
            <div class="price-info">
              ≈ ${{ currentPrice.toFixed(4) }}
              <span class="price-change" :class="priceChange >= 0 ? 'positive' : 'negative'">
                {{ priceChange >= 0 ? '+' : '' }}{{ priceChange }}%
              </span>
            </div>
          </div>

          <div class="order-section sell-section">
            <div class="order-header">賣盤</div>
            <div class="order-list">
              <div
                v-for="(order, index) in sellOrders"
                :key="index"
                class="order-item sell-order"
              >
                <span class="order-price">{{ order.price.toFixed(4) }}</span>
                <span class="order-amount">{{ order.amount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  { price: 1.5911, amount: 148.6 },
  { price: 1.5893, amount: 318.7359 },
  { price: 1.5899, amount: 750.99 },
  { price: 1.5924, amount: 148.8 },
  { price: 1.5889, amount: 318.7354 },
  { price: 1.5897, amount: 247.9009 },
])

const sellOrders = ref([
  { price: 1.5847, amount: 148.8 },
  { price: 1.5874, amount: 467.2352 },
  { price: 1.5879, amount: 31.8739 },
  { price: 1.5864, amount: 1742.1762 },
  { price: 1.5844, amount: 148.3 },
  { price: 1.5856, amount: 630.1997 },
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

const handleTrade = () => {
  console.log('交易:', {
    coinPair: coinPair.value,
    tradeType: tradeType.value,
    direction: direction.value,
    amount: amount.value,
    tradingInterval: tradingInterval.value,
    sliderValue: sliderValue.value,
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
    
    // 更新订单簿价格
    buyOrders.value = buyOrders.value.map(order => ({
      price: order.price + (Math.random() - 0.5) * 0.001,
      amount: order.amount
    }))
    
    sellOrders.value = sellOrders.value.map(order => ({
      price: order.price + (Math.random() - 0.5) * 0.001,
      amount: order.amount
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

.trading-section {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  flex: 1;
  min-width: 0;
}

.trade-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;

  .tab-item {
    flex: 1;
    padding: 8px 16px;
    text-align: center;
    border-radius: 4px;
    font-size: 14px;
    color: #7e7e7e;
    background-color: #f3f3f3;
    cursor: pointer;
    transition: all 0.3s;

    &.active {
      background-color: #040303;
      color: #fff;
    }
  }
}

.direction-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;

  .direction-btn {
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 0.3s;

    &.buy-up {
      background-color: #f3f3f3;
      color: #7e7e7e;

      &.active {
        background-color: #26a69a;
        color: #fff;
      }
    }

    &.buy-down {
      background-color: #f3f3f3;
      color: #7e7e7e;

      &.active {
        background-color: #ef5350;
        color: #fff;
      }
    }
  }
}

.account-info {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-top: 1px solid #ebedf0;
  border-bottom: 1px solid #ebedf0;
  margin-bottom: 16px;

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .label {
      font-size: 12px;
      color: #969799;
    }

    .value {
      font-size: 14px;
      font-weight: 500;
      color: #040303;
    }
  }
}

.trading-params {
  margin-bottom: 16px;

  :deep(.van-field) {
    padding: 12px 0;
  }

  .slider-container {
    margin-top: 16px;

    .slider-marks {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      font-size: 12px;
      color: #969799;
    }
  }
}

.trade-button {
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s;

  &:active {
    opacity: 0.8;
  }

  &.buy-up-btn {
    background-color: #26a69a;
    color: #fff;
  }

  &.buy-down-btn {
    background-color: #ef5350;
    color: #fff;
  }
}

.order-book {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  flex: 1;
  min-width: 0;
  max-width: 300px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
}

.order-book-content {
  display: flex;
  flex-direction: column;
}

.order-section {
  flex: 1;

  .order-header {
    font-size: 14px;
    font-weight: 500;
    color: #040303;
    margin-bottom: 8px;
  }

  .order-list {
    .order-item {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      font-size: 13px;

      &.buy-order {
        .order-price {
          color: #26a69a;
        }
      }

      &.sell-order {
        .order-price {
          color: #ef5350;
        }
      }

      .order-price {
        font-weight: 500;
      }

      .order-amount {
        color: #969799;
      }
    }
  }
}

.current-price {
  text-align: center;
  padding: 16px 0;
  border-top: 1px solid #ebedf0;
  border-bottom: 1px solid #ebedf0;
  margin: 12px 0;

  .price-value {
    font-size: 24px;
    font-weight: 600;
    color: #26a69a;
    margin-bottom: 4px;
  }

  .price-info {
    font-size: 12px;
    color: #969799;

    .price-change {
      margin-left: 8px;

      &.positive {
        color: #26a69a;
      }

      &.negative {
        color: #ef5350;
      }
    }
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

