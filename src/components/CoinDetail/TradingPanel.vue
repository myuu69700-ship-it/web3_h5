<template>
    <div class="trade">
      <!-- 头部 -->
      <div class="top">
        <div class="pair-info">
          <div class="pair">
            TRX/USDT <span class="tag">期权 <van-icon name="arrow-down" class="tag-arrow" /></span>
          </div>
          <div class="chart-link">
            TRX/USDT 图表 <span class="expand">展开 <van-icon name="arrow-down" class="expand-arrow" /></span>
          </div>
        </div>
        <div class="icons">
          <van-icon name="setting-o" class="icon" />
          <van-icon name="star-o" class="icon" />
        </div>
      </div>
  
      <!-- tab -->
      <div class="tabs">
        <span :class="{active: tab==='now'}" @click="tab='now'">立即交易</span>
        <span :class="{active: tab==='time'}" @click="tab='time'">定时交易</span>
      </div>
  
      <!-- 买涨 买跌 -->
      <div class="type">
        <div
          class="btn buy"
          :class="{active: type==='buy'}"
          @click="type='buy'"
        >买涨</div>
        <div
          class="btn sell"
          :class="{active: type==='sell'}"
          @click="type='sell'"
        >买跌</div>
      </div>
  
      <!-- 账户信息 -->
      <div class="account-info">
        <div class="info-item">
          <span class="label">当前余额</span>
          <span class="value">${{ currentBalance }}</span>
        </div>
        <div class="info-item">
          <span class="label">最低买入</span>
          <span class="value">{{ minBuy }}</span>
        </div>
        <div class="info-item">
          <span class="label">最高买入</span>
          <span class="value">{{ formatNumber(maxBuy) }}</span>
        </div>
      </div>
  
      <!-- 交易区间选择 -->
      <div class="interval-select" @click="$emit('show-interval-picker')">
        <span class="label">交易区间</span>
        <span class="value">{{ tradingInterval }} <van-icon name="arrow-down" class="arrow" /></span>
      </div>
  
      <!-- 定时交易 - 选择时间 -->
      <div v-if="tab === 'time'" class="time-select" @click="$emit('show-time-picker')">
        <span class="label">选择时间</span>
        <span class="value">{{ selectedTime || '请选择时间' }} <van-icon name="arrow-down" class="arrow" /></span>
      </div>
  
      <!-- 深度 -->
      <div class="depth">
        <!-- 买盘 -->
        <div class="list buy">
          <div class="list-title">买盘</div>
          <div
            class="row"
            v-for="(item, index) in buyList"
            :key="`buy-${item.price}-${index}`"
          >
            <div
              class="bar"
              :style="{ width: calcPercent(item.amount, buyMax) + '%' }"
            ></div>
            <span class="price">{{ item.price }}</span>
            <span class="amount">{{ formatAmount(item.amount) }}</span>
          </div>
        </div>

        <!-- 当前价 -->
        <div class="price-center">
          <div class="price-main" :class="priceChangeClass">{{ price }}</div>
          <div class="price-desc">≈ ${{ price }} <span class="change" :class="priceChange >= 0 ? 'up' : 'down'">{{ priceChange >= 0 ? '+' : '' }}{{ priceChange }}%</span></div>
        </div>

        <!-- 卖盘 -->
        <div class="list sell">
          <div class="list-title">卖盘</div>
          <div
            class="row"
            v-for="(item, index) in sellList"
            :key="`sell-${item.price}-${index}`"
          >
            <div
              class="bar"
              :style="{ width: calcPercent(item.amount, sellMax) + '%' }"
            ></div>
            <span class="price">{{ item.price }}</span>
            <span class="amount">{{ formatAmount(item.amount) }}</span>
          </div>
        </div>
      </div>
  
      <!-- 输入 -->
      <div class="form">
        <div class="input-wrapper">
          <input 
            v-model="inputAmount" 
            type="number" 
            placeholder="投入金额" 
            class="amount-input"
          />
        </div>
        <div class="slider-wrapper">
          <input 
            type="range" 
            min="0" 
            max="100" 
            step="25"
            v-model="sliderPercent"
            class="slider"
          />
          <div class="slider-marks">
            <span :class="{ active: sliderPercent >= 0 }">0%</span>
            <span :class="{ active: sliderPercent >= 25 }">25%</span>
            <span :class="{ active: sliderPercent >= 50 }">50%</span>
            <span :class="{ active: sliderPercent >= 75 }">75%</span>
            <span :class="{ active: sliderPercent >= 100 }">100%</span>
          </div>
        </div>
      </div>
  
      <!-- 按钮 -->
      <div class="submit" :class="type" @click="handleSubmit">
        {{ type === 'buy' ? '买涨' : '买跌' }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
  
  const props = defineProps({
    currentBalance: {
      type: Number,
      default: 0
    },
    minBuy: {
      type: Number,
      default: 1
    },
    maxBuy: {
      type: Number,
      default: 5000000
    },
    tradingInterval: {
      type: String,
      default: '30s-15%'
    },
    selectedTime: {
      type: String,
      default: ''
    },
    tradeType: {
      type: String,
      default: 'instant'
    },
    direction: {
      type: String,
      default: 'up'
    },
    amount: {
      type: [String, Number],
      default: '0'
    },
    sliderValue: {
      type: Number,
      default: 0
    }
  })
  
  const emit = defineEmits(['show-interval-picker', 'show-time-picker', 'trade', 'update:tradeType', 'update:direction', 'update:amount', 'update:sliderValue'])
  
  // 将 props 映射到内部状态
  const tab = computed({
    get: () => props.tradeType === 'instant' ? 'now' : 'time',
    set: (val) => emit('update:tradeType', val === 'now' ? 'instant' : 'timed')
  })
  
  const type = computed({
    get: () => props.direction === 'up' ? 'buy' : 'sell',
    set: (val) => emit('update:direction', val === 'buy' ? 'up' : 'down')
  })
  
  const price = ref('0.292917')
  const priceChange = ref(-0.51)
  const isSyncing = ref(false) // 防止循环更新的标志
  
  const inputAmount = computed({
    get: () => String(props.amount || ''),
    set: (val) => emit('update:amount', val)
  })
  
  const sliderPercent = computed({
    get: () => props.sliderValue || 0,
    set: (val) => emit('update:sliderValue', val)
  })
  
  const buyList = ref([
    { price: '0.293494', amount: 2160.7 },
    { price: '0.293260', amount: 1541.99 },
    { price: '0.293091', amount: 37.51 },
    { price: '0.293292', amount: 2892.33 },
    { price: '0.293295', amount: 7207.99 },
    { price: '0.292958', amount: 24147.7 }
  ])
  
  const sellList = ref([
    { price: '0.292159', amount: 2160.1 },
    { price: '0.292888', amount: 1537.57 },
    { price: '0.292405', amount: 958.25 },
    { price: '0.292724', amount: 725.02 },
    { price: '0.292401', amount: 2428.98 },
    { price: '0.292597', amount: 3234.69 }
  ])
  
  // 保存初始数据用于平滑变化
  const buyListBase = buyList.value.map(item => ({ ...item }))
  const sellListBase = sellList.value.map(item => ({ ...item }))
  
  const buyMax = computed(() =>
    Math.max(...buyList.value.map(i => i.amount), 1)
  )
  const sellMax = computed(() =>
    Math.max(...sellList.value.map(i => i.amount), 1)
  )
  
  const priceChangeClass = computed(() => {
    return priceChange.value >= 0 ? 'up' : 'down'
  })
  
  const calcPercent = (val, max) => {
    if (!max || max === 0) return 0
    const percent = (val / max) * 100
    return Math.min(100, Math.max(0, percent)).toFixed(2)
  }
  
  const formatNumber = (num) => {
    return num.toLocaleString('en-US')
  }
  
  const formatAmount = (amount) => {
    return amount.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  
  // 监听输入金额变化，同步更新滑块
  watch(() => props.amount, (newValue) => {
    if (isSyncing.value || !props.currentBalance || !newValue) return
    const percent = (parseFloat(newValue) / props.currentBalance) * 100
    const roundedPercent = Math.min(100, Math.max(0, Math.round(percent / 25) * 25))
    if (roundedPercent !== props.sliderValue) {
      isSyncing.value = true
      emit('update:sliderValue', roundedPercent)
      nextTick(() => {
        isSyncing.value = false
      })
    }
  })
  
  // 监听滑块变化，同步更新输入金额
  watch(() => props.sliderValue, (newValue) => {
    if (isSyncing.value || !props.currentBalance) return
    const calculatedAmount = ((props.currentBalance * newValue) / 100).toFixed(2)
    const currentAmount = String(props.amount || '0')
    if (calculatedAmount !== currentAmount) {
      isSyncing.value = true
      emit('update:amount', calculatedAmount)
      nextTick(() => {
        isSyncing.value = false
      })
    }
  })
  
  const handleSubmit = () => {
    emit('trade', {
      tradeType: props.tradeType,
      direction: props.direction,
      amount: props.amount,
      sliderValue: props.sliderValue,
      tradingInterval: props.tradingInterval,
      selectedTime: props.selectedTime
    })
  }
  
  let updateTimer = null
  
  /* 优化后的实时变动 - 确保柱状图平滑动画 */
  onMounted(() => {
    updateTimer = setInterval(() => {
      // 使用 nextTick 确保 DOM 更新完成后再进行下一次更新
      nextTick(() => {
        // 平滑更新买盘数据，确保响应式更新
        buyList.value = buyList.value.map((item, index) => {
          const baseAmount = buyListBase[index].amount
          // 在基础值附近波动，变化幅度控制在 ±20%
          const variation = (Math.random() * 0.4 - 0.2) // -0.2 到 0.2
          const newAmount = baseAmount * (1 + variation)
          return {
            ...item,
            amount: Math.max(10, newAmount)
          }
        })
        
        // 平滑更新卖盘数据，确保响应式更新
        sellList.value = sellList.value.map((item, index) => {
          const baseAmount = sellListBase[index].amount
          // 在基础值附近波动，变化幅度控制在 ±20%
          const variation = (Math.random() * 0.4 - 0.2) // -0.2 到 0.2
          const newAmount = baseAmount * (1 + variation)
          return {
            ...item,
            amount: Math.max(10, newAmount)
          }
        })
        
        // 平滑更新价格
        const newPrice = (0.292 + Math.random() * 0.002).toFixed(6)
        price.value = newPrice
        priceChange.value = Number((Math.random() * 2 - 1).toFixed(2))
      })
    }, 800) // 更新频率800ms，保证动画流畅
  })
  
  onUnmounted(() => {
    if (updateTimer) {
      clearInterval(updateTimer)
    }
  })
  </script>
  
  <style scoped>
  .trade {
    padding: 12px;
    font-size: 14px;
    background: #fff;
    border-radius: 8px;
  }
  
  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }
  
  .pair-info {
    flex: 1;
  }
  
  .pair {
    font-size: 16px;
    font-weight: 600;
    color: #040303;
    margin-bottom: 4px;
  }
  
  .tag {
    background: #f0f0f0;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 4px;
    margin-left: 4px;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    color: #666;
  }
  
  .tag-arrow {
    font-size: 10px;
  }
  
  .chart-link {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
  }
  
  .expand {
    margin-left: 4px;
    display: inline-flex;
    align-items: center;
    gap: 2px;
  }
  
  .expand-arrow {
    font-size: 10px;
  }
  
  .icons {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  
  .icon {
    font-size: 18px;
    color: #040303;
    cursor: pointer;
  }
  
  .tabs {
    display: flex;
    margin: 12px 0;
    border-bottom: 1px solid #ebedf0;
  }
  
  .tabs span {
    flex: 1;
    text-align: center;
    padding: 8px 0;
    color: #999;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .tabs .active {
    color: #040303;
    font-weight: 500;
    border-bottom: 2px solid #040303;
    margin-bottom: -1px;
  }
  
  .type {
    display: flex;
    gap: 8px;
    margin: 12px 0;
  }
  
  .btn {
    flex: 1;
    text-align: center;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 500;
  }
  
  .btn.buy {
    color: #1dbf73;
    background: #f0f9f5;
    border: 1px solid transparent;
  }
  
  .btn.sell {
    color: #e84545;
    background: #fef0f0;
    border: 1px solid transparent;
  }
  
  .btn.buy.active {
    background: #1dbf73;
    color: #fff;
  }
  
  .btn.sell.active {
    background: #e84545;
    color: #fff;
  }
  
  .account-info {
    margin: 12px 0;
    padding: 12px;
    background: #f7f8fa;
    border-radius: 6px;
  }
  
  .info-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 13px;
  }
  
  .info-item:last-child {
    margin-bottom: 0;
  }
  
  .info-item .label {
    color: #666;
  }
  
  .info-item .value {
    color: #040303;
    font-weight: 500;
  }
  
  .interval-select,
  .time-select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    background: #f7f8fa;
    border-radius: 6px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 13px;
  }
  
  .interval-select .label,
  .time-select .label {
    color: #666;
  }
  
  .interval-select .value,
  .time-select .value {
    color: #040303;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .arrow {
    font-size: 12px;
    color: #999;
  }
  
  .depth {
    margin: 16px 0;
  }
  
  .list-title {
    font-size: 12px;
    color: #666;
    margin-bottom: 6px;
    font-weight: 500;
  }
  
  .list.buy .list-title {
    color: #1dbf73;
  }
  
  .list.sell .list-title {
    color: #e84545;
  }
  
  .list .row {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 6px 8px;
    overflow: hidden;
    border-radius: 4px;
    margin-bottom: 2px;
    transition: transform 0.2s ease;
    min-height: 28px; /* 确保行高一致，避免布局抖动 */
  }
  
  .list.buy .bar {
    background: rgba(29, 191, 115, 0.15);
    background-image: linear-gradient(to right, rgba(29, 191, 115, 0.1), rgba(29, 191, 115, 0.2));
  }
  
  .list.sell .bar {
    background: rgba(232, 69, 69, 0.15);
    background-image: linear-gradient(to left, rgba(232, 69, 69, 0.1), rgba(232, 69, 69, 0.2));
  }
  
  .bar {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
    will-change: width;
    transform: translateZ(0); /* 启用硬件加速 */
    backface-visibility: hidden; /* 优化渲染性能 */
  }
  
  .list.sell .bar {
    left: 0;
    right: auto;
  }
  
  .price {
    z-index: 1;
    color: #1dbf73;
    font-size: 13px;
    font-weight: 500;
    transition: color 0.2s ease;
  }
  
  .list.sell .price {
    color: #e84545;
  }
  
  .amount {
    z-index: 1;
    color: #040303;
    font-size: 13px;
    transition: color 0.2s ease;
  }
  
  .price-center {
    text-align: center;
    margin: 12px 0;
    padding: 12px 0;
    border-top: 1px solid #ebedf0;
    border-bottom: 1px solid #ebedf0;
  }
  
  .price-main {
    color: #1dbf73;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 4px;
    transition: color 0.3s ease;
  }
  
  .price-main.up {
    color: #1dbf73;
  }
  
  .price-main.down {
    color: #e84545;
  }
  
  .price-desc {
    font-size: 12px;
    color: #666;
  }
  
  .change {
    margin-left: 4px;
    font-weight: 500;
  }
  
  .change.up {
    color: #1dbf73;
  }
  
  .change.down {
    color: #e84545;
  }
  
  .form {
    margin-top: 16px;
  }
  
  .input-wrapper {
    margin-bottom: 12px;
  }
  
  .amount-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ebedf0;
    border-radius: 6px;
    font-size: 14px;
    background: #fff;
    box-sizing: border-box;
  }
  
  .amount-input:focus {
    outline: none;
    border-color: #1dbf73;
  }
  
  .slider-wrapper {
    position: relative;
    padding: 8px 0 24px 0;
  }
  
  .slider {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: #ebedf0;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
  }
  
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #1dbf73;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .slider::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #1dbf73;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .slider-marks {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 11px;
    color: #999;
  }
  
  .slider-marks span {
    transition: color 0.3s;
  }
  
  .slider-marks span.active {
    color: #1dbf73;
    font-weight: 500;
  }
  
  .submit {
    margin-top: 16px;
    text-align: center;
    padding: 14px;
    border-radius: 8px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.3s;
  }
  
  .submit:hover {
    opacity: 0.9;
  }
  
  .submit:active {
    opacity: 0.8;
  }
  
  .submit.buy {
    background: #1dbf73;
  }
  
  .submit.sell {
    background: #e84545;
  }
  </style>
  