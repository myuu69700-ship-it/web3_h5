<template>
  <div class="chart-container">
    <div class="chart-header">
      <div class="chart-title">{{ coinPair }} 圖表</div>
      <div class="chart-expand" @click="toggleExpand">
        {{ isExpanded ? '隱藏' : '展開' }}<span class="arrow">{{ isExpanded ? '↑' : '↓' }}</span>
      </div>
    </div>
    <div v-if="isExpanded" class="chart-timeframes">
      <div
        v-for="timeframe in timeframes"
        :key="timeframe.key"
        class="timeframe-item"
        :class="{ active: activeTimeframe === timeframe.key }"
        @click="activeTimeframe = timeframe.key"
      >
        {{ timeframe.label }}
      </div>
    </div>
    <div v-if="isExpanded" ref="chartContainer" class="chart-wrapper"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { createChart, ColorType } from 'lightweight-charts'

const props = defineProps({
  coinPair: {
    type: String,
    default: 'BTC/USDT'
  }
})

const chartContainer = ref(null)
const isExpanded = ref(true)
const activeTimeframe = ref('5m')
let chart = null
let candlestickSeries = null
let resizeHandler = null

const timeframes = [
  { key: 'tick', label: '分時' },
  { key: '1m', label: '1分' },
  { key: '5m', label: '5分' },
  { key: '15m', label: '15分' },
  { key: '30m', label: '30分' },
  { key: '1d', label: '日線' },
  { key: '1w', label: '周線' },
  { key: '1M', label: '月線' }
]

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
  if (isExpanded.value && chartContainer.value) {
    nextTick(() => {
      chart?.timeScale().fitContent()
    })
  }
}

// 根据币种对获取基础价格
const getBasePrice = () => {
  const pair = props.coinPair.toUpperCase()
  if (pair.includes('FIL')) {
    return 1.5885 // FIL/USDT 价格范围
  } else if (pair.includes('BTC')) {
    return 93826.26 // BTC/USDT 价格范围
  } else {
    return 1.5885 // 默认 FIL 价格
  }
}

// 生成模拟K线数据
const generateMockData = () => {
  const data = []
  const now = Math.floor(Date.now() / 1000)
  const basePrice = getBasePrice()
  const isLowPrice = basePrice < 100 // 判断是否为低价币种（如 FIL）
  const priceRange = isLowPrice ? 0.02 : 200 // 价格波动范围
  const priceStep = isLowPrice ? 0.01 : 50 // 价格步进
  
  for (let i = 100; i >= 0; i--) {
    const time = now - i * 60 // 每分钟一根K线
    const open = basePrice + (Math.random() - 0.5) * priceRange
    const close = open + (Math.random() - 0.5) * (priceRange * 0.5)
    const high = Math.max(open, close) + Math.random() * priceStep
    const low = Math.min(open, close) - Math.random() * priceStep
    
    const decimals = isLowPrice ? 4 : 2
    
    data.push({
      time: time,
      open: Number(open.toFixed(decimals)),
      high: Number(high.toFixed(decimals)),
      low: Number(low.toFixed(decimals)),
      close: Number(close.toFixed(decimals))
    })
  }
  
  return data
}

const initChart = () => {
  if (!chartContainer.value) return

  // 创建图表
  chart = createChart(chartContainer.value, {
    layout: {
      background: { type: ColorType.Solid, color: '#FFFFFF' },
      textColor: '#333',
    },
    grid: {
      vertLines: { color: '#f0f0f0' },
      horzLines: { color: '#f0f0f0' },
    },
    width: chartContainer.value.clientWidth,
    height: 300,
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
    },
    rightPriceScale: {
      borderColor: '#d1d4dc',
    },
  })

  // 创建K线系列
  candlestickSeries = chart.addCandlestickSeries({
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
  })

  // 加载数据
  const data = generateMockData()
  candlestickSeries.setData(data)

  // 添加当前价格线
  const currentPrice = getBasePrice()
  candlestickSeries.createPriceLine({
    price: currentPrice,
    color: '#ef5350',
    lineWidth: 1,
    lineStyle: 2, // 虚线
    axisLabelVisible: true,
  })

  // 响应式调整
  resizeHandler = () => {
    if (chartContainer.value && chart) {
      chart.applyOptions({
        width: chartContainer.value.clientWidth,
      })
    }
  }

  window.addEventListener('resize', resizeHandler)
}

// 清理函数
onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
  if (chart) {
    chart.remove()
    chart = null
  }
})

// 监听时间周期变化
watch(activeTimeframe, () => {
  // 这里可以重新加载对应周期的数据
  if (candlestickSeries) {
    const data = generateMockData()
    candlestickSeries.setData(data)
    chart?.timeScale().fitContent()
  }
})

onMounted(() => {
  nextTick(() => {
    initChart()
  })
})
</script>

<style lang="scss" scoped>
.chart-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  .chart-title {
    font-size: 14px;
    font-weight: 500;
    color: #040303;
  }

  .chart-expand {
    font-size: 12px;
    color: #040303;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;

    .arrow {
      font-size: 10px;
    }
  }
}

.chart-timeframes {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;

  .timeframe-item {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    color: #7e7e7e;
    cursor: pointer;
    background-color: #f3f3f3;
    transition: all 0.3s;
    white-space: nowrap;

    &.active {
      background-color: #e0e0e0;
      color: #040303;
      font-weight: 500;
    }
  }
}

.chart-wrapper {
  width: 100%;
  height: 300px;
  position: relative;
}
</style>

