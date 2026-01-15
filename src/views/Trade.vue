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

      <div class="price-market-container">
        <div class="price-section">
          <div class="current-price">92,073.75</div>
          <div class="price-info">
            <span class="price-usd">≈$92,073.75</span>
            <span class="price-change positive">+1.49%</span>
          </div>
        </div>

        <div class="market-stats">
          <div class="stat-item">
            <span class="stat-label">24H最高价</span>
            <span class="stat-value">92,681.91</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">24H最低价</span>
            <span class="stat-value">90,133.92</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">24H成交量</span>
            <span class="stat-value">5,650.596422</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">24H交易额</span>
            <span class="stat-value">5.17亿</span>
          </div>
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

      <!-- K线图 -->
      <div class="chart-wrapper">
        <!-- MA指标显示（图内浮层） -->
        <div class="ma-indicators ma-indicators--overlay">
          <span class="ma-item ma5">MA5 91,955.00</span>
          <span class="ma-item ma10">MA10 91,955.00</span>
          <span class="ma-item ma30">MA30 91,955.00</span>
          <span class="ma-item ma60">MA60 91,955.00</span>
        </div>
        <div ref="chartContainer" class="chart-canvas"></div>
      </div>

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
        <!-- 账户余额提示（按截图：文案两行 + 按钮在文案下方居中） -->
        <div class="balance-prompt">
          <div class="prompt-text">
            <div>您的现货账户中 USDT 余额为 0，快去充值开启</div>
            <div>数字之旅吧</div>
          </div>
          <van-button
            type="primary"
            class="recharge-btn"
            @click="handleRecharge"
          >
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
              <div class="action-icon">
                <img class="action-icon-img" :src="heyueIcon" alt="合约" />
              </div>
              <span class="action-label">合约</span>
            </div>
            <div class="quick-action-item" @click="handleOptions">
              <div class="action-icon">
                <img class="action-icon-img" :src="qiquanIcon" alt="期权" />
              </div>
              <span class="action-label">期权</span>
            </div>
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
import heyueIcon from "@/assets/personalCenter/heyue.svg";
import qiquanIcon from "@/assets/personalCenter/qiquan.svg";
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
let volumeMA5Series = null;
let volumeMA10Series = null;
let volumeMA30Series = null;
let resizeHandler = null;
let volumeResizeHandler = null;
let isSyncingCrosshair = false;
let lastKlineData = [];
let lastVolumeData = [];
let klineCloseByTime = new Map();
let volumeByTime = new Map();

// 成交量刻度格式化（y轴显示 400K、800K 这种形式）
const formatVolumeTick = (value) => {
  const v = Number(value);
  if (!Number.isFinite(v)) return "";
  // 隐藏 0 刻度，避免出现 0 影响视觉（截图只展示 400K、800K）
  if (v === 0) return "";
  if (Math.abs(v) >= 1000) {
    const k = v / 1000;
    // 这里不保留小数，确保 400K / 800K 的显示
    return `${Math.round(k)}K`;
  }
  return `${Math.round(v)}`;
};

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

// 计算简单移动平均（SMA）
const calcSMA = (data, period) => {
  const out = [];
  if (!Array.isArray(data) || data.length === 0) return out;
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += Number(data[i]?.value ?? 0);
    if (i >= period) {
      sum -= Number(data[i - period]?.value ?? 0);
    }
    if (i >= period - 1) {
      out.push({
        time: data[i].time,
        value: sum / period,
      });
    }
  }
  return out;
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
  lastKlineData = data;
  klineCloseByTime = new Map(data.map((d) => [d.time, d.close]));

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
      ticksVisible: true,
    },
    leftPriceScale: {
      visible: false,
    },
  });

  volumeSeries = volumeChart.addHistogramSeries({
    // 用自定义 formatter，把 y 轴刻度显示成 400K / 800K
    priceFormat: {
      type: "custom",
      formatter: formatVolumeTick,
    },
    scaleMargins: {
      top: 0.1,
      bottom: 0,
    },
    // 固定纵轴范围，让刻度稳定出现 400K / 800K
    autoscaleInfoProvider: () => {
      return {
        priceRange: {
          minValue: 0,
          maxValue: 800000,
        },
      };
    },
  });

  const volumeData = generateVolumeData();
  volumeSeries.setData(volumeData);
  lastVolumeData = volumeData;
  volumeByTime = new Map(volumeData.map((d) => [d.time, d.value]));

  // 成交量均线（折线叠加到柱状图上）
  volumeMA5Series = volumeChart.addLineSeries({
    color: "#ff5b5a",
    lineWidth: 1,
    priceLineVisible: false,
    lastValueVisible: false,
  });
  volumeMA10Series = volumeChart.addLineSeries({
    color: "#9c27b0",
    lineWidth: 1,
    priceLineVisible: false,
    lastValueVisible: false,
  });
  volumeMA30Series = volumeChart.addLineSeries({
    color: "#2196f3",
    lineWidth: 1,
    priceLineVisible: false,
    lastValueVisible: false,
  });

  volumeMA5Series.setData(calcSMA(volumeData, 5));
  volumeMA10Series.setData(calcSMA(volumeData, 10));
  volumeMA30Series.setData(calcSMA(volumeData, 30));

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

  // 同步十字线（让主图与成交量图交互“连在一起”）
  if (chart && volumeChart && candlestickSeries && volumeSeries) {
    chart.subscribeCrosshairMove((param) => {
      if (isSyncingCrosshair) return;
      isSyncingCrosshair = true;
      try {
        if (!param || !param.time || param.point == null) {
          volumeChart.clearCrosshairPosition();
          return;
        }
        const t = param.time;
        const v = volumeByTime.get(t);
        if (v == null) {
          volumeChart.clearCrosshairPosition();
          return;
        }
        volumeChart.setCrosshairPosition(v, t, volumeSeries);
      } finally {
        isSyncingCrosshair = false;
      }
    });

    volumeChart.subscribeCrosshairMove((param) => {
      if (isSyncingCrosshair) return;
      isSyncingCrosshair = true;
      try {
        if (!param || !param.time || param.point == null) {
          chart.clearCrosshairPosition();
          return;
        }
        const t = param.time;
        const close = klineCloseByTime.get(t);
        if (close == null) {
          chart.clearCrosshairPosition();
          return;
        }
        chart.setCrosshairPosition(close, t, candlestickSeries);
      } finally {
        isSyncingCrosshair = false;
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
  volumeMA5Series = null;
  volumeMA10Series = null;
  volumeMA30Series = null;
  isSyncingCrosshair = false;
  lastKlineData = [];
  lastVolumeData = [];
  klineCloseByTime = new Map();
  volumeByTime = new Map();
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
  // 预留空间：底部 TabBar(17.6vw) + trade-actions(约120px) + 安全区（不再额外留 28px 间隙）
  padding-bottom: calc(17.6vw + 120px + env(safe-area-inset-bottom));
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
    margin-bottom: 26px;

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

  .price-market-container {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    margin-bottom: 16px;
    justify-content: space-between;
  }

  .price-section {
    flex: 0 0 auto;

    .current-price {
      color: #1df388;
      font-family: Inter;
      font-size: 40px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      margin-bottom: 4px;
    }

    .price-info {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;

      .price-usd {
        color: #909090;
        font-family: Inter;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      .price-change {
        color: #1df388;
        font-family: Inter;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        &.positive {
          color: #1df388;
        }

        &.negative {
          color: #ff5b5a;
        }
      }
    }
  }

  .market-stats {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    max-width: 300px;

    .stat-item {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .stat-label {
        color: #909090;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      .stat-value {
        color: #909090;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-align: right;
      }
    }
  }
}

.main-tabs {
  display: flex;
  background-color: #141517;
  border-bottom: 1px solid #1e1f29;
  padding: 15px 148px 0 32px;
  position: relative;

  .tab-item {
    color: #909090;
    font-family: "PingFang SC";
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-right: 50px;
    text-wrap: nowrap;
    cursor: pointer;
    position: relative;
    padding-bottom: 24px;

    &.active {
      color: #f1f1f1;
      font-weight: 500;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 6px;
        background-color: #1df388;
        border-radius: 999px;
      }
    }
  }
}

.chart-section {
  background-color: #141517;
  padding: 16px 0px;
  position: relative;
  overflow: hidden;

  .timeframe-selector {
    display: flex;
    align-items: center;
    height: 74px;
    // gap: 8px;
    margin-bottom: 12px;
    padding: 0 32px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }

    .timeframe-item {
      color: #979797;
      font-family: "PT Sans Caption";
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      padding-right: 50px;

      &.active {
        color: #1df388;
        font-weight: 500;
      }
    }

    .more-arrow {
      font-size: 26px;
      color: #3f4450;
      margin-left: auto;
      font-weight: 700;
    }
  }

  .ma-indicators {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;

    .ma-item {
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;

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
        padding-right: 141px;
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

  .chart-canvas {
    width: 100%;
    height: 100%;
  }

  .ma-indicators--overlay {
    position: absolute;
    top: 10px;
    left: 12px;
    z-index: 5;
    pointer-events: none;
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
    flex-wrap: nowrap;
    font-size: 12px;
    margin-bottom: 16px;
    margin-top: 16px;
    position: relative;
    z-index: 10;
    width: 100%;
    background-color: #141517;
    padding: 13px 32px;

    .indicator-group {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1 1 auto;
      min-width: 0;
      // flex-wrap: wrap;

      .indicator-label {
        color: #909090;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding-right: 36px;
        white-space: nowrap;
      }

      .indicator-item {
        // padding: px 8px;
        border-radius: 4px;
        cursor: pointer;
        color: #909090;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding-right: 36px;
        white-space: nowrap;

        &.active {
          // background-color: #00d4aa;
          color: #1df388;
          font-family: Inter;
          font-size: 20px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
    }

    .more-arrow {
      font-size: 26px;
      color: #3f4450;
      margin-left: auto;
      font-weight: 700;
      flex: 0 0 auto;
      white-space: nowrap;
      padding-top: 6px;
    }
  }

  .orders-section-below-chart {
    margin-top: 16px;
    padding-top: 0;
    border-top: none;
    position: relative;
    z-index: 10;
    width: 100%;
    background-color: #141517;
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
  background-color: transparent;
  margin: 0;
  padding: 90px 32px 16px;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  .prompt-text {
    color: #929292;
    text-align: center;
    font-family: "PingFang SC";
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .recharge-btn {
    width: 138px;
    height: 54px;
    border-radius: 10px;
    background: #1df388;
    color: #121212;
    font-family: "PingFang SC";
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 97px;
  }
}

.trade-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background-color: #141517;
  position: fixed;
  left: 0;
  right: 0;
  // 紧贴底部 TabBar 顶部（TabBar 高度为 17.6vw）
  bottom: calc(17.6vw + env(safe-area-inset-bottom));
  z-index: 98;

  .trade-btn {
    color: #121212;
    font-family: "PingFang SC";
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 508px;
    height: 90px;
    border-radius: 10px;
    background: #1df388;
    margin-right: 48px;
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
      &:nth-child(1) {
        margin-right: 56px;
      }

      .action-icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .action-icon-img {
        width: 28px;
        height: 33px;
        display: block;
        // margin-bottom: 4px;
      }

      .action-label {
        color: #f9f9f9;
        font-family: "PingFang SC";
        font-size: 22px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-wrap: nowrap;
        margin-top: 4px;
      }
    }
  }
}
</style>
