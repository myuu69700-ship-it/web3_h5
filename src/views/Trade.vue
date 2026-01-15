<template>
  <div class="trade-page">
    <!-- 顶部导航栏 -->
    <div class="top-nav-bar">
      <img
        :src="tubiaoIcon"
        class="menu-icon"
        @click="showMenu = true"
        alt="菜单"
      />
      <div class="logo-text">
        <div class="logo-text-title">WEB3</div>
        <div class="logo-text-title2">LOGO</div>
      </div>
      <div class="top-right-icons">
        <img
          :src="searchIcon"
          class="search-icon"
          @click="handleSearch"
          alt="搜索"
        />
        <img
          :src="kefuIcon"
          class="kefu-icon"
          @click="handleService"
          alt="客服"
        />
      </div>
    </div>

    <!-- 交易对信息 -->
    <div class="coin-pair-section">
      <div class="coin-pair-header">
        <div class="coin-pair-info" @click="showCoinPairModal = true">
          <div class="btc-logo">B</div>
          <span class="pair-name">BTC/USDT</span>
          <img :src="allowDownIcon" class="dropdown-icon" alt="" />
        </div>
        <van-icon name="star-o" class="star-icon" />
      </div>

      <div class="price-section">
        <div class="current-price">92,073.75</div>
        <div class="price-info">
          <span class="price-usd">≈$92,073.75</span>
          <span class="price-change positive">+1.49%</span>
        </div>
      </div>

      <div class="market-stats">
        <div class="stat-item">
          <div class="stat-label">24H最高价</div>
          <div class="stat-value">92,681.91</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">24H最低价</div>
          <div class="stat-value">90,133.92</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">24H成交量</div>
          <div class="stat-value">5,650.596422</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">24H交易额</div>
          <div class="stat-value">5.17亿</div>
        </div>
      </div>
    </div>

    <!-- 主标签页 -->
    <div class="main-tabs">
      <div
        class="tab-item"
        :class="{ active: activeMainTab === 'chart' }"
        @click="activeMainTab = 'chart'"
      >
        图表
      </div>
      <div
        class="tab-item"
        :class="{ active: activeMainTab === 'orders' }"
        @click="activeMainTab = 'orders'"
      >
        委托订单
      </div>
      <div
        class="tab-item"
        :class="{ active: activeMainTab === 'trades' }"
        @click="activeMainTab = 'trades'"
      >
        最新成交
      </div>
      <div
        class="tab-item"
        :class="{ active: activeMainTab === 'fluctuations' }"
        @click="activeMainTab = 'fluctuations'"
      >
        市场异动
      </div>
    </div>

    <!-- 图表区域 -->
    <div v-if="activeMainTab === 'chart'" class="chart-section">
      <!-- 时间周期选择 -->
      <div class="timeframe-selector">
        <div
          v-for="timeframe in timeframes"
          :key="timeframe.key"
          class="timeframe-item"
          :class="{ active: activeTimeframe === timeframe.key }"
          @click="activeTimeframe = timeframe.key"
        >
          {{ timeframe.label }}
        </div>
        <van-icon name="arrow" class="more-arrow" />
      </div>

      <!-- MA指标显示 -->
      <div class="ma-indicators">
        <span class="ma-item ma5">MA5 91,955.00</span>
        <span class="ma-item ma10">MA10 91,955.00</span>
        <span class="ma-item ma30">MA30 91,955.00</span>
        <span class="ma-item ma60">MA60 91,955.00</span>
      </div>

      <!-- K线图 -->
      <div ref="chartContainer" class="chart-wrapper"></div>

      <!-- 成交量图 -->
      <div class="volume-section">
        <div class="volume-indicators">
          <span class="volume-item vol-ma5">MA5 49.657K</span>
          <span class="volume-item vol-ma10">MA10 158.633K</span>
          <span class="volume-item vol-ma30">MA30 157.651K</span>
          <span class="volume-item vol-current">VOLUME 96.728K</span>
        </div>
        <div ref="volumeContainer" class="volume-chart"></div>
      </div>

      <!-- 指标选择 -->
      <div class="indicator-selector">
        <div class="indicator-group">
          <span class="indicator-label">主图</span>
          <span
            class="indicator-item"
            :class="{ active: mainIndicator === 'MA' }"
            @click="mainIndicator = 'MA'"
          >
            MA
          </span>
          <span
            class="indicator-item"
            :class="{ active: mainIndicator === 'EAM' }"
            @click="mainIndicator = 'EAM'"
          >
            EAM
          </span>
          <span
            class="indicator-item"
            :class="{ active: mainIndicator === 'BOLL' }"
            @click="mainIndicator = 'BOLL'"
          >
            BOLL
          </span>
        </div>
        <div class="indicator-group">
          <span class="indicator-label">幅图</span>
          <span
            class="indicator-item"
            :class="{ active: subIndicator === 'VOL' }"
            @click="subIndicator = 'VOL'"
          >
            VOL
          </span>
          <span
            class="indicator-item"
            :class="{ active: subIndicator === 'MACD' }"
            @click="subIndicator = 'MACD'"
          >
            MACD
          </span>
          <span
            class="indicator-item"
            :class="{ active: subIndicator === 'KDJ' }"
            @click="subIndicator = 'KDJ'"
          >
            KDJ
          </span>
        </div>
        <van-icon name="arrow" class="more-arrow" />
      </div>

      <!-- 委托订单区域 - 在图表下方显示 -->
      <div class="orders-section-below-chart">
        <div class="order-tabs">
          <div
            class="order-tab"
            :class="{ active: activeOrderTab === 'current' }"
            @click="activeOrderTab = 'current'"
          >
            当前委托 ({{ currentOrdersCount }})
          </div>
          <div
            class="order-tab"
            :class="{ active: activeOrderTab === 'filled' }"
            @click="activeOrderTab = 'filled'"
          >
            成交委托
          </div>
          <div
            class="order-tab"
            :class="{ active: activeOrderTab === 'canceled' }"
            @click="activeOrderTab = 'canceled'"
          >
            撤销委托
          </div>
        </div>

        <div class="order-content">
          <van-empty
            v-if="currentOrdersCount === 0"
            description="暂无委托订单"
          />
          <div v-else class="orders-list">
            <!-- 订单列表 -->
          </div>
        </div>
      </div>
    </div>

    <!-- 委托订单区域 - 独立显示 -->
    <div v-if="activeMainTab === 'orders'" class="orders-section">
      <div class="order-tabs">
        <div
          class="order-tab"
          :class="{ active: activeOrderTab === 'current' }"
          @click="activeOrderTab = 'current'"
        >
          当前委托 ({{ currentOrdersCount }})
        </div>
        <div
          class="order-tab"
          :class="{ active: activeOrderTab === 'filled' }"
          @click="activeOrderTab = 'filled'"
        >
          成交委托
        </div>
        <div
          class="order-tab"
          :class="{ active: activeOrderTab === 'canceled' }"
          @click="activeOrderTab = 'canceled'"
        >
          撤销委托
        </div>
      </div>

      <div class="order-content">
        <van-empty v-if="currentOrdersCount === 0" description="暂无委托订单" />
        <div v-else class="orders-list">
          <!-- 订单列表 -->
        </div>
      </div>
    </div>

    <!-- 最新成交 -->
    <div v-if="activeMainTab === 'trades'" class="trades-section">
      <van-empty description="暂无成交记录" />
    </div>

    <!-- 市场异动 -->
    <div v-if="activeMainTab === 'fluctuations'" class="fluctuations-section">
      <van-empty description="暂无市场异动" />
    </div>

    <!-- 账户余额提示 -->
    <div class="balance-prompt">
      <div class="prompt-text">
        您的现货账户中 USDT 余额为0,快去充值开启数字之旅吧
      </div>
      <van-button type="primary" class="recharge-btn" @click="handleRecharge">
        充值
      </van-button>
    </div>

    <!-- 交易按钮和快捷入口 -->
    <div class="trade-actions">
      <van-button type="primary" class="trade-btn" @click="handleTrade">
        交易
      </van-button>
      <div class="quick-actions">
        <div class="quick-action-item" @click="handleContract">
          <div class="action-icon">📊</div>
          <span class="action-label">合约</span>
        </div>
        <div class="quick-action-item" @click="handleOptions">
          <div class="action-icon">📈</div>
          <span class="action-label">期权</span>
        </div>
      </div>
    </div>

    <!-- 菜单抽屉 -->
    <MenuDrawer v-model="showMenu" />

    <!-- 币对选择弹窗 -->
    <CoinPairSearchModal
      v-model="showCoinPairModal"
      @select="handleCoinPairSelect"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { createChart, ColorType } from "lightweight-charts";
import MenuDrawer from "@/components/Home/MenuDrawer.vue";
import CoinPairSearchModal from "@/components/Home/CoinPairSearchModal.vue";
import tubiaoIcon from "@/assets/image/tubiao.svg";
import searchIcon from "@/assets/image/search.png";
import kefuIcon from "@/assets/image/kefu.png";
import allowDownIcon from "@/assets/image/allow_down.svg";

const showMenu = ref(false);
const showCoinPairModal = ref(false);
const activeMainTab = ref("chart");
const activeOrderTab = ref("current");
const activeTimeframe = ref("1m");
const mainIndicator = ref("MA");
const subIndicator = ref("VOL");
const currentOrdersCount = ref(0);

const chartContainer = ref(null);
const volumeContainer = ref(null);
let chart = null;
let volumeChart = null;
let candlestickSeries = null;
let volumeSeries = null;
let resizeHandler = null;
let volumeResizeHandler = null;

const timeframes = [
  { key: "1m", label: "1分" },
  { key: "5m", label: "5分" },
  { key: "15m", label: "15分" },
  { key: "30m", label: "30分" },
  { key: "1d", label: "1日" },
  { key: "1w", label: "1周" },
  { key: "1M", label: "1月" },
];

// 生成模拟K线数据
const generateMockData = () => {
  const data = [];
  const now = Math.floor(Date.now() / 1000);
  const basePrice = 92073.75;

  for (let i = 100; i >= 0; i--) {
    const time = now - i * 60;
    const open = basePrice + (Math.random() - 0.5) * 200;
    const close = open + (Math.random() - 0.5) * 100;
    const high = Math.max(open, close) + Math.random() * 50;
    const low = Math.min(open, close) - Math.random() * 50;

    data.push({
      time: time,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
    });
  }

  return data;
};

// 生成成交量数据
const generateVolumeData = () => {
  const data = [];
  const now = Math.floor(Date.now() / 1000);

  for (let i = 100; i >= 0; i--) {
    const time = now - i * 60;
    const value = Math.random() * 800000;

    data.push({
      time: time,
      value: Math.floor(value),
      color: Math.random() > 0.5 ? "#26a69a" : "#ef5350",
    });
  }

  return data;
};

// 初始化图表
const initChart = () => {
  if (!chartContainer.value) return;

  // 如果图表已存在，先销毁
  if (chart || volumeChart) {
    destroyChart();
  }

  chart = createChart(chartContainer.value, {
    layout: {
      background: { type: ColorType.Solid, color: "#141517" },
      textColor: "#A4A4A4",
      fontSize: 12,
    },
    grid: {
      vertLines: { color: "#1E1F29", visible: true },
      horzLines: { color: "#1E1F29", visible: true },
    },
    width: chartContainer.value.clientWidth,
    height: 300,
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
      borderColor: "#1E1F29",
    },
    rightPriceScale: {
      borderColor: "#1E1F29",
      scaleMargins: {
        top: 0.1,
        bottom: 0.1,
      },
    },
    leftPriceScale: {
      visible: false,
    },
  });

  // 创建K线系列
  candlestickSeries = chart.addCandlestickSeries({
    upColor: "#00D4AA",
    downColor: "#FF5B5A",
    borderUpColor: "#00D4AA",
    borderDownColor: "#FF5B5A",
    wickUpColor: "#00D4AA",
    wickDownColor: "#FF5B5A",
  });

  // 加载数据
  const data = generateMockData();
  candlestickSeries.setData(data);

  // 添加当前价格线
  const latestData = data[data.length - 1];
  candlestickSeries.createPriceLine({
    price: latestData.close,
    color: "#00D4AA",
    lineWidth: 1,
    lineStyle: 2,
    axisLabelVisible: true,
    title: latestData.close.toFixed(2),
  });

  // 响应式调整
  resizeHandler = () => {
    if (chartContainer.value && chart) {
      chart.applyOptions({
        width: chartContainer.value.clientWidth,
      });
    }
  };

  window.addEventListener("resize", resizeHandler);

  // 初始化成交量图
  initVolumeChart();
};

// 初始化成交量图
const initVolumeChart = () => {
  if (!volumeContainer.value) return;

  volumeChart = createChart(volumeContainer.value, {
    layout: {
      background: { type: ColorType.Solid, color: "#141517" },
      textColor: "#A4A4A4",
      fontSize: 12,
    },
    grid: {
      vertLines: { color: "#1E1F29", visible: true },
      horzLines: { color: "#1E1F29", visible: true },
    },
    width: volumeContainer.value.clientWidth,
    height: 150,
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
      borderColor: "#1E1F29",
    },
    rightPriceScale: {
      borderColor: "#1E1F29",
      scaleMargins: {
        top: 0.1,
        bottom: 0.1,
      },
    },
    leftPriceScale: {
      visible: false,
    },
  });

  volumeSeries = volumeChart.addHistogramSeries({
    priceFormat: {
      type: "volume",
    },
    priceScaleId: "",
    scaleMargins: {
      top: 0.1,
      bottom: 0,
    },
  });

  const volumeData = generateVolumeData();
  volumeSeries.setData(volumeData);

  // 同步时间轴
  if (chart && volumeChart) {
    volumeChart.timeScale().subscribeVisibleTimeRangeChange((timeRange) => {
      if (timeRange) {
        chart.timeScale().setVisibleRange(timeRange);
      }
    });

    chart.timeScale().subscribeVisibleTimeRangeChange((timeRange) => {
      if (timeRange) {
        volumeChart.timeScale().setVisibleRange(timeRange);
      }
    });
  }

  // 响应式调整
  volumeResizeHandler = () => {
    if (volumeContainer.value && volumeChart) {
      volumeChart.applyOptions({
        width: volumeContainer.value.clientWidth,
      });
    }
  };

  window.addEventListener("resize", volumeResizeHandler);
};

// 处理币对选择
const handleCoinPairSelect = (coin) => {
  console.log("选择币对:", coin);
  showCoinPairModal.value = false;
};

// 处理搜索
const handleSearch = () => {
  console.log("搜索");
};

// 处理客服
const handleService = () => {
  console.log("客服");
};

// 处理充值
const handleRecharge = () => {
  console.log("充值");
};

// 处理交易
const handleTrade = () => {
  console.log("交易");
};

// 处理合约
const handleContract = () => {
  console.log("合约");
};

// 处理期权
const handleOptions = () => {
  console.log("期权");
};

// 销毁图表
const destroyChart = () => {
  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler);
    resizeHandler = null;
  }
  if (volumeResizeHandler) {
    window.removeEventListener("resize", volumeResizeHandler);
    volumeResizeHandler = null;
  }
  if (chart) {
    chart.remove();
    chart = null;
  }
  if (volumeChart) {
    volumeChart.remove();
    volumeChart = null;
  }
  candlestickSeries = null;
  volumeSeries = null;
};

// 监听主标签页变化，初始化或销毁图表
watch(activeMainTab, (newTab) => {
  if (newTab === "chart") {
    nextTick(() => {
      if (!chart && chartContainer.value) {
        initChart();
      } else if (chart && chartContainer.value) {
        // 如果图表已存在但可能无效，重新初始化
        destroyChart();
        initChart();
      }
    });
  } else {
    // 切换离开图表tab时，销毁图表以释放资源
    destroyChart();
  }
});

onMounted(() => {
  if (activeMainTab.value === "chart") {
    nextTick(() => {
      initChart();
    });
  }
});

onUnmounted(() => {
  destroyChart();
});
</script>

<style lang="scss" scoped>
.trade-page {
  min-height: 100vh;
  background-color: #141517;
  padding-bottom: 80px;
  color: #fff;
}

.top-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 42px 32px 0;
  background-color: #141517;
  position: sticky;
  top: 0;
  z-index: 100;

  .menu-icon {
    width: 28px;
    height: 30px;
    cursor: pointer;
  }

  .logo-text {
    color: #1df388;
    font-family: "PT Sans Caption";
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: flex;
    .logo-text-title2 {
      color: #f3f4f6;
    }
  }

  .top-right-icons {
    display: flex;
    align-items: center;
    gap: 31px;

    .search-icon,
    .kefu-icon {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }
}

.coin-pair-section {
  padding: 65px 32px 0;
  background-color: #141517;

  .coin-pair-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .coin-pair-info {
      display: flex;
      align-items: center;
      gap: 15px;
      cursor: pointer;

      .btc-logo {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: linear-gradient(135deg, #f7931a 0%, #ffa500 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
      }

      .pair-name {
        color: #f1f1f1;
        font-family: Inter;
        font-size: 40px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }

      .dropdown-icon {
        width: 14px;
        height: 8px;
        color: #f3f4f6;
      }
    }

    .star-icon {
      font-size: 22px;
      color: #00d4aa;
      cursor: pointer;
    }
  }

  .price-section {
    margin-bottom: 16px;

    .current-price {
      font-size: 32px;
      font-weight: bold;
      color: #00d4aa;
      margin-bottom: 4px;
    }

    .price-info {
      display: flex;
      align-items: center;
      gap: 12px;

      .price-usd {
        font-size: 14px;
        color: #a4a4a4;
      }

      .price-change {
        font-size: 14px;
        font-weight: 500;

        &.positive {
          color: #00d4aa;
        }

        &.negative {
          color: #ff5b5a;
        }
      }
    }
  }

  .market-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;

    .stat-item {
      .stat-label {
        font-size: 12px;
        color: #a4a4a4;
        margin-bottom: 4px;
      }

      .stat-value {
        font-size: 14px;
        color: #fff;
        font-weight: 500;
      }
    }
  }
}

.main-tabs {
  display: flex;
  background-color: #141517;
  border-bottom: 1px solid #1e1f29;
  padding: 0 16px;

  .tab-item {
    padding: 12px 16px;
    font-size: 14px;
    color: #a4a4a4;
    cursor: pointer;
    position: relative;
    transition: color 0.3s;

    &.active {
      color: #00d4aa;
      font-weight: 500;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #00d4aa;
      }
    }
  }
}

.chart-section {
  background-color: #141517;
  padding: 16px;
  position: relative;
  overflow: hidden;

  .timeframe-selector {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }

    .timeframe-item {
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 12px;
      color: #a4a4a4;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.3s;

      &.active {
        background-color: #00d4aa;
        color: #141517;
        font-weight: 500;
      }
    }

    .more-arrow {
      font-size: 14px;
      color: #a4a4a4;
      margin-left: auto;
    }
  }

  .ma-indicators {
    display: flex;
    gap: 16px;
    margin-bottom: 8px;
    flex-wrap: wrap;

    .ma-item {
      font-size: 12px;

      &.ma5 {
        color: #ff5b5a;
      }

      &.ma10 {
        color: #9c27b0;
      }

      &.ma30 {
        color: #2196f3;
      }

      &.ma60 {
        color: #ffc107;
      }
    }
  }

  .chart-wrapper {
    width: 100%;
    height: 300px;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
    z-index: 0;
  }

  .volume-section {
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
    z-index: 0;

    .volume-indicators {
      display: flex;
      gap: 16px;
      margin-bottom: 8px;
      flex-wrap: wrap;

      .volume-item {
        font-size: 12px;

        &.vol-ma5 {
          color: #ff5b5a;
        }

        &.vol-ma10 {
          color: #9c27b0;
        }

        &.vol-ma30 {
          color: #2196f3;
        }

        &.vol-current {
          color: #ffc107;
        }
      }
    }

    .volume-chart {
      width: 100%;
      height: 150px;
      position: relative;
      overflow: hidden;
    }
  }

  .indicator-selector {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    font-size: 12px;
    margin-bottom: 16px;
    margin-top: 16px;
    position: relative;
    z-index: 10;
    width: 100%;
    background-color: #141517;

    .indicator-group {
      display: flex;
      align-items: center;
      gap: 8px;

      .indicator-label {
        color: #a4a4a4;
      }

      .indicator-item {
        padding: 4px 8px;
        border-radius: 4px;
        color: #a4a4a4;
        cursor: pointer;
        transition: all 0.3s;

        &.active {
          background-color: #00d4aa;
          color: #141517;
          font-weight: 500;
        }
      }
    }

    .more-arrow {
      font-size: 14px;
      color: #a4a4a4;
      margin-left: auto;
    }
  }

  .orders-section-below-chart {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #1e1f29;
    position: relative;
    z-index: 10;
    width: 100%;
    background-color: #141517;

    .order-tabs {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
      border-bottom: 1px solid #1e1f29;

      .order-tab {
        padding: 12px 0;
        font-size: 14px;
        color: #a4a4a4;
        cursor: pointer;
        position: relative;
        transition: color 0.3s;

        &.active {
          color: #00d4aa;
          font-weight: 500;

          &::after {
            content: "";
            position: absolute;
            bottom: -1px;
            left: 0;
            right: 0;
            height: 2px;
            background-color: #00d4aa;
          }
        }
      }
    }

    .order-content {
      min-height: 150px;
    }
  }
}

.orders-section {
  background-color: #141517;
  padding: 16px;

  .order-tabs {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid #1e1f29;

    .order-tab {
      padding: 12px 0;
      font-size: 14px;
      color: #a4a4a4;
      cursor: pointer;
      position: relative;
      transition: color 0.3s;

      &.active {
        color: #00d4aa;
        font-weight: 500;

        &::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #00d4aa;
        }
      }
    }
  }

  .order-content {
    min-height: 200px;
  }
}

.trades-section,
.fluctuations-section {
  background-color: #141517;
  padding: 16px;
  min-height: 200px;
}

.balance-prompt {
  background-color: #1e1f29;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  .prompt-text {
    font-size: 14px;
    color: #a4a4a4;
    flex: 1;
  }

  .recharge-btn {
    background-color: #00d4aa;
    border: none;
    color: #141517;
    font-weight: 500;
    padding: 8px 24px;
  }
}

.trade-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: #141517;

  .trade-btn {
    flex: 1;
    background-color: #00d4aa;
    border: none;
    color: #141517;
    font-weight: 600;
    font-size: 16px;
    height: 48px;
  }

  .quick-actions {
    display: flex;
    gap: 16px;

    .quick-action-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      cursor: pointer;

      .action-icon {
        font-size: 24px;
      }

      .action-label {
        font-size: 12px;
        color: #a4a4a4;
      }
    }
  }
}
</style>
