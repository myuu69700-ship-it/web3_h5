<template>
  <div class="trade">
    <!-- 左右布局容器 -->
    <div class="bet-main">
      <!-- 左侧：交易控制面板 (216px) -->
      <div class="bet-main-left">
        <!-- 保证金模式和杠杆 -->
        <div class="margin-leverage">
          <div class="select-btn margin-mode">
            <span>逐倉</span>
            <van-icon name="arrow-down" size="12" />
          </div>
          <div class="select-btn leverage">
            <span>1x</span>
            <van-icon name="arrow-down" size="12" />
          </div>
        </div>

        <!-- 订单类型 -->
        <div class="order-type">
          <div class="select-btn">
            <span>市價</span>
            <van-icon name="arrow-down" size="12" />
          </div>
        </div>

        <!-- 价格输入 -->
        <div class="price-input-wrapper">
          <input
            type="text"
            class="price-input"
            :value="displayPrice"
            @input="handlePriceInput"
            placeholder="0"
          />
          <span class="input-unit">USDT</span>
        </div>

        <!-- 数量输入 -->
        <div class="quantity-input-wrapper">
          <div class="input-label">數量</div>
          <div class="quantity-input-group">
            <input
              type="text"
              class="quantity-input"
              v-model="inputAmount"
              placeholder="0"
            />
            <div class="select-btn unit-btn">
              <span>張</span>
              <van-icon name="arrow-down" size="12" />
            </div>
          </div>
        </div>

        <!-- 可用余额 -->
        <div class="available-balance">
          <span class="balance-label">可用</span>
          <span class="balance-value">{{ currentBalance }} USDT</span>
          <van-icon name="exchange" size="14" class="exchange-icon" />
        </div>

        <!-- 百分比滑块 -->
        <div class="slider-wrapper">
          <div class="slider-container">
            <van-slider
              v-model="sliderPercent"
              :min="0"
              :max="100"
              :step="1"
              active-color="#040303"
              inactive-color="#e5e5e5"
              button-size="12px"
              :show-tooltip="false"
              @change="handleSliderMove"
              @drag="handleSliderDrag"
            />
            <!-- 自定义工具提示 -->
            <div 
              class="custom-tooltip" 
              :class="{ 'show': isSliderHovering }"
              :style="{ left: sliderPercent + '%' }"
            >
              <div class="tooltip-content">
                {{ Math.round(sliderPercent) }}%
              </div>
              <div class="tooltip-arrow"></div>
            </div>
            <!-- 节点标记 -->
            <div class="slider-nodes">
              <div 
                v-for="(mark, index) in [0, 25, 50, 75, 100]"
                :key="index"
                class="slider-node"
                :class="{ 
                  'passed': sliderPercent >= mark,
                  'covered': Math.abs(sliderPercent - mark) < 2
                }"
                :style="{ left: mark + '%' }"
              ></div>
            </div>
          </div>
          <div class="slider-marks">
            <span :class="{ active: sliderPercent >= 0 }">0</span>
            <span :class="{ active: sliderPercent >= 25 }">25%</span>
            <span :class="{ active: sliderPercent >= 50 }">50%</span>
            <span :class="{ active: sliderPercent >= 75 }">75%</span>
            <span :class="{ active: sliderPercent >= 100 }">100%</span>
          </div>
        </div>

        <!-- 止盈止损 -->
        <div class="stop-loss-profit">
          <van-checkbox v-model="stopLossProfitEnabled">止盈止損</van-checkbox>
        </div>

        <!-- 买入按钮 -->
        <div class="trade-button buy-button" @click="handleBuy">
          <div class="button-text">買進(做多) 1x</div>
          <div class="button-desc">≈ 0 張</div>
        </div>
        <div class="buy-info">
          <div class="info-item">
            <span class="info-label">可開張數</span>
            <span class="info-value">0 張</span>
          </div>
          <div class="info-item">
            <span class="info-label">保證金</span>
            <span class="info-value">≈ 0 USDT</span>
          </div>
        </div>

        <!-- 卖出按钮 -->
        <div class="trade-button sell-button" @click="handleSell">
          <div class="button-text">賣出(做空) 1x</div>
          <div class="button-desc">≈ 0 張</div>
        </div>
        <div class="sell-info">
          <div class="info-item">
            <span class="info-label">可開張數</span>
            <span class="info-value">0 張</span>
          </div>
          <div class="info-item">
            <span class="info-label">保證金</span>
            <span class="info-value">≈ 0 USDT</span>
          </div>
        </div>
      </div>

      <!-- 右侧：订单簿 (134px) -->
      <div class="bet-main-right">
        <!-- 订单簿标题 -->
        <div class="order-book-header">
          <span>價格 (USDT)</span>
          <span>數量 (ETH)</span>
        </div>

        <!-- 卖盘（绿色，在上方） -->
        <div class="order-list sell-list">
          <div
            v-for="(item, index) in sortedSellList"
            :key="`sell-${item.price}-${index}`"
            class="order-row sell-row"
            @click="handlePriceClick(item.price, 'sell')"
          >
            <div 
              class="order-progress-bar sell-progress" 
              :style="{ 
                width: `${getSellProgress(item.amount)}%`,
                right: 0,
                left: 'auto'
              }"
            ></div>
            <div class="order-content">
              <span class="order-price sell-price">{{ formatPrice(item.price) }}</span>
              <span class="order-amount">{{ formatAmount(item.amount) }}</span>
            </div>
          </div>
        </div>

        <!-- 当前价格 -->
        <div class="current-price-section">
          <div class="current-price-value">{{ displayPrice }}</div>
          <div class="current-price-info">
            ≈ $ {{ displayPrice }}
            <span class="price-change" :class="priceChangeClass">
              {{ priceChange >= 0 ? '+' : '' }}{{ priceChange }}%
            </span>
          </div>
        </div>

        <!-- 买盘（红色，在下方） -->
        <div class="order-list buy-list">
          <div
            v-for="(item, index) in sortedBuyList"
            :key="`buy-${item.price}-${index}`"
            class="order-row buy-row"
            @click="handlePriceClick(item.price, 'buy')"
          >
            <div 
              class="order-progress-bar buy-progress" 
              :style="{ 
                width: `${getBuyProgress(item.amount)}%`,
                right: 0,
                left: 'auto'
              }"
            ></div>
            <div class="order-content">
              <span class="order-price buy-price">{{ formatPrice(item.price) }}</span>
              <span class="order-amount">{{ formatAmount(item.amount) }}</span>
            </div>
          </div>
        </div>

        <!-- 价格增量选择 -->
        <div class="price-increment">
          <div class="select-btn increment-btn">
            <span>0.000001</span>
            <van-icon name="arrow-down" size="10" />
            <van-icon name="apps-o" size="12" class="grid-icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";

const props = defineProps({
  currentBalance: {
    type: Number,
    default: 0,
  },
  minBuy: {
    type: Number,
    default: 1,
  },
  maxBuy: {
    type: Number,
    default: 5000000,
  },
  tradingInterval: {
    type: String,
    default: "30s-15%",
  },
  selectedTime: {
    type: String,
    default: "",
  },
  tradeType: {
    type: String,
    default: "instant",
  },
  direction: {
    type: String,
    default: "up",
  },
  amount: {
    type: [String, Number],
    default: "0",
  },
  sliderValue: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits([
  "show-interval-picker",
  "show-time-picker",
  "trade",
  "update:tradeType",
  "update:direction",
  "update:amount",
  "update:sliderValue",
]);

// 将 props 映射到内部状态
const tab = computed({
  get: () => (props.tradeType === "instant" ? "now" : "time"),
  set: (val) => emit("update:tradeType", val === "now" ? "instant" : "timed"),
});

const type = computed({
  get: () => (props.direction === "up" ? "buy" : "sell"),
  set: (val) => emit("update:direction", val === "buy" ? "up" : "down"),
});

const price = ref("3257.16");
const priceChange = ref(1.44);
const isSyncing = ref(false); // 防止循环更新的标志
const stopLossProfitEnabled = ref(false);
const isSliderHovering = ref(false); // 控制滑块工具提示显示

// 处理滑块移动事件
const handleSliderMove = () => {
  // 滑块值变化时的处理逻辑
};

// 处理滑块拖拽事件（用于实时更新工具提示）
const handleSliderDrag = () => {
  // 工具提示会通过 sliderPercent 自动更新
};

// 格式化显示价格（带逗号）
const displayPrice = computed(() => {
  const numPrice = parseFloat(price.value) || 0;
  return numPrice.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
});

const inputAmount = computed({
  get: () => String(props.amount || ""),
  set: (val) => emit("update:amount", val),
});

const sliderPercent = computed({
  get: () => props.sliderValue || 0,
  set: (val) => emit("update:sliderValue", val),
});

const buyList = ref([
  { price: 3252.64, amount: 3.0453 },
  { price: 3250.68, amount: 2.8287 },
  { price: 3248.91, amount: 3.5163 },
  { price: 3253.81, amount: 2.0264 },
  { price: 3249.62, amount: 1.3452 },
  { price: 3255.48, amount: 4.917 },
  { price: 3247.43, amount: 0.6109 },
  { price: 3255.89, amount: 3.5059 },
  { price: 3248.62, amount: 1.695 },
  { price: 3256.57, amount: 0.9216 },
]);

const sellList = ref([
  { price: 3257.73, amount: 2.0328 },
  { price: 3266.75, amount: 4.911 },
  { price: 3266.42, amount: 1.841 },
  { price: 3262.03, amount: 0.5406 },
  { price: 3262.79, amount: 3.8308 },
  { price: 3262.43, amount: 0.8297 },
  { price: 3258.25, amount: 2.8815 },
  { price: 3260.64, amount: 2.7389 },
  { price: 3260.30, amount: 3.1998 },
  { price: 3259.94, amount: 3.1075 },
]);

// 保存初始数据用于平滑变化
const buyListBase = buyList.value.map((item) => ({ ...item }));
const sellListBase = sellList.value.map((item) => ({ ...item }));

// 排序后的买盘列表（按价格从高到低，最接近当前价格的在上方）
const sortedBuyList = computed(() => {
  return [...buyList.value].sort((a, b) => b.price - a.price);
});

// 排序后的卖盘列表（按价格从低到高，最接近当前价格的在上方）
const sortedSellList = computed(() => {
  return [...sellList.value].sort((a, b) => a.price - b.price);
});

const buyMax = computed(() =>
  Math.max(...buyList.value.map((i) => i.amount), 1)
);
const sellMax = computed(() =>
  Math.max(...sellList.value.map((i) => i.amount), 1)
);

const priceChangeClass = computed(() => {
  return priceChange.value >= 0 ? "up" : "down";
});

const calcPercent = (val, max) => {
  if (!max || max === 0) return 0;
  const percent = (val / max) * 100;
  return Math.min(100, Math.max(0, percent)).toFixed(2);
};

// 计算卖盘进度百分比（从右到左）
const getSellProgress = (amount) => {
  if (!sellMax.value || sellMax.value === 0) return 0;
  const percent = (amount / sellMax.value) * 100;
  return Math.min(100, Math.max(0, percent));
};

// 计算买盘进度百分比（从左到右）
const getBuyProgress = (amount) => {
  if (!buyMax.value || buyMax.value === 0) return 0;
  const percent = (amount / buyMax.value) * 100;
  return Math.min(100, Math.max(0, percent));
};

const formatNumber = (num) => {
  return num.toLocaleString("en-US");
};

const formatAmount = (amount) => {
  return amount.toLocaleString("en-US", { maximumFractionDigits: 4 });
};

const formatPrice = (price) => {
  if (typeof price === 'string') {
    return price;
  }
  return price.toLocaleString("en-US", { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  });
};

const handleBuy = () => {
  emit("update:direction", "up");
  handleSubmit();
};

const handleSell = () => {
  emit("update:direction", "down");
  handleSubmit();
};

const handlePriceInput = (event) => {
  // 移除逗号，只保留数字和小数点
  const value = event.target.value.replace(/,/g, '');
  if (value === '' || /^\d*\.?\d*$/.test(value)) {
    price.value = value;
  }
};

// 点击订单簿价格时，填充到价格输入框
const handlePriceClick = (clickedPrice, type) => {
  price.value = String(clickedPrice);
};

// 监听输入金额变化，同步更新滑块
watch(
  () => props.amount,
  (newValue) => {
    if (isSyncing.value || !props.currentBalance || !newValue) return;
    const percent = (parseFloat(newValue) / props.currentBalance) * 100;
    const roundedPercent = Math.min(
      100,
      Math.max(0, Math.round(percent))
    );
    if (roundedPercent !== props.sliderValue) {
      isSyncing.value = true;
      emit("update:sliderValue", roundedPercent);
      nextTick(() => {
        isSyncing.value = false;
      });
    }
  }
);

// 监听滑块变化，同步更新输入金额
watch(
  () => props.sliderValue,
  (newValue) => {
    if (isSyncing.value || !props.currentBalance) return;
    const calculatedAmount = ((props.currentBalance * newValue) / 100).toFixed(
      2
    );
    const currentAmount = String(props.amount || "0");
    if (calculatedAmount !== currentAmount) {
      isSyncing.value = true;
      emit("update:amount", calculatedAmount);
      nextTick(() => {
        isSyncing.value = false;
      });
    }
  }
);

const handleSubmit = () => {
  emit("trade", {
    tradeType: props.tradeType,
    direction: props.direction,
    amount: props.amount,
    sliderValue: props.sliderValue,
    tradingInterval: props.tradingInterval,
    selectedTime: props.selectedTime,
  });
};

let updateTimer = null;

/* 优化后的实时变动 - 确保柱状图平滑动画，进度条从右到左动态变化 */
onMounted(() => {
  updateTimer = setInterval(() => {
    // 平滑更新买盘数据，确保响应式更新，进度条从右到左变化
    buyList.value = buyList.value.map((item, index) => {
      const baseAmount = buyListBase[index]?.amount || item.amount;
      // 在基础值附近波动，变化幅度控制在 ±60%，增大变化幅度
      const variation = Math.random() * 1.2 - 0.6; // -0.6 到 0.6
      const newAmount = baseAmount * (1 + variation);
      return {
        ...item,
        amount: Math.max(0.01, newAmount),
      };
    });

    // 平滑更新卖盘数据，确保响应式更新，进度条从右到左变化
    sellList.value = sellList.value.map((item, index) => {
      const baseAmount = sellListBase[index]?.amount || item.amount;
      // 在基础值附近波动，变化幅度控制在 ±60%，增大变化幅度
      const variation = Math.random() * 1.2 - 0.6; // -0.6 到 0.6
      const newAmount = baseAmount * (1 + variation);
      return {
        ...item,
        amount: Math.max(0.01, newAmount),
      };
    });

    // 平滑更新价格
    const basePrice = 3257.16;
    const variation = (Math.random() - 0.5) * 10;
    const newPrice = (basePrice + variation).toFixed(2);
    price.value = newPrice;
    priceChange.value = Number((Math.random() * 3).toFixed(2));
  }, 1000); // 更新频率300ms，加快变化速度，保证动画流畅且实时
});

onUnmounted(() => {
  if (updateTimer) {
    clearInterval(updateTimer);
  }
});
</script>

<style lang="scss" scoped>
.trade {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
}

.bet-main {
  display: flex;
  gap: 0;
  width: 100%;
  max-width: 350px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.bet-main-left {
  width: 216px;
  padding: 12px;
  background: #fff;
  border-right: 1px solid #ebedf0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bet-main-right {
  width: 134px;
  padding: 8px 4px;
  background: #fff;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  position: relative;
  flex-shrink: 0;
}
// 左侧面板样式
.margin-leverage {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}

.select-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  background: #f7f8fa;
  border-radius: 4px;
  font-size: 12px;
  color: #040303;
  cursor: pointer;
  border: 1px solid #ebedf0;
  transition: all 0.2s;

  &:active {
    opacity: 0.7;
  }

  span {
    flex: 1;
  }
}

.margin-mode {
  flex: 1;
}

.leverage {
  flex: 1;
}

.order-type {
  margin-bottom: 8px;
}

.price-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding: 8px;
  background: #f7f8fa;
  border-radius: 4px;
  border: 1px solid #ebedf0;
}

.price-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 13px;
  color: #040303;
  outline: none;

  &::placeholder {
    color: #c8c9cc;
  }
}

.input-unit {
  font-size: 12px;
  color: #969799;
}

.quantity-input-wrapper {
  margin-bottom: 8px;
}

.input-label {
  font-size: 11px;
  color: #969799;
  margin-bottom: 4px;
}

.quantity-input-group {
  display: flex;
  gap: 6px;
}

.quantity-input {
  flex: 1;
  padding: 6px 8px;
  border: 1px solid #ebedf0;
  border-radius: 4px;
  font-size: 12px;
  background: #fff;
  outline: none;

  &:focus {
    border-color: #1dbf73;
  }

  &::placeholder {
    color: #c8c9cc;
  }
}

.unit-btn {
  min-width: 40px;
  padding: 6px 8px;
}

.available-balance {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #969799;
  margin-bottom: 8px;

  .balance-label {
    color: #969799;
  }

  .balance-value {
    color: #040303;
    font-weight: 500;
  }

  .exchange-icon {
    color: #969799;
    cursor: pointer;
  }
}

.slider-wrapper {
  position: relative;
  padding: 8px 0 20px 0;
  margin-bottom: 8px;
}

.slider-container {
  position: relative;
  width: 100%;
  padding: 8px 0;
  display: flex;
  align-items: center;
}

/* Vant Slider 样式覆盖 */
.slider-container :deep(.van-slider) {
  width: 100%;
  height: 4px;
  position: relative;
  z-index: 1;
}

.slider-container :deep(.van-slider__track) {
  height: 4px;
  background-color: #e5e5e5;
  border-radius: 2px;
}

.slider-container :deep(.van-slider__bar) {
  height: 4px;
  background-color: #040303;
  border-radius: 2px 0 0 2px;
}

.slider-container :deep(.van-slider__button) {
  width: 12px;
  height: 12px;
  background: #fff;
  border: 2px solid #040303;
  box-shadow: 0 0 8px rgba(4, 3, 3, 0.15);
}

.slider-container :deep(.van-slider__button-wrapper) {
  width: 12px;
  height: 12px;
  z-index: 4;
}

/* 节点标记 */
.slider-nodes {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  height: 4px;
  pointer-events: none;
  z-index: 2;
}

.slider-node {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #e5e5e5;
  transform: translate(-50%, -50%);
  top: 50%;
  transition: all 0.2s ease;
}

.slider-node.passed {
  border-color: #040303;
}

.slider-node.covered {
  opacity: 0;
  z-index: 1;
}

/* 自定义工具提示样式 */
.custom-tooltip {
  position: absolute;
  top: -36px;
  transform: translateX(-50%);
  z-index: 10;
  pointer-events: none;
  transition: left 0.1s ease-out;
}

.tooltip-content {
  background: #323233;
  color: #fff;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  white-space: nowrap;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  text-align: center;
  font-weight: 400;
  line-height: 1.2;
}

.tooltip-arrow {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #323233;
}

.slider-marks {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 10px;
  color: #969799;
}

.slider-marks span {
  transition: color 0.3s;
}

.slider-marks span.active {
  color: #1dbf73;
  font-weight: 500;
}

.stop-loss-profit {
  margin-bottom: 8px;
  font-size: 11px;
}

.trade-button {
  padding: 10px;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-bottom: 6px;

  &:active {
    opacity: 0.8;
  }

  .button-text {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 2px;
  }

  .button-desc {
    font-size: 10px;
    opacity: 0.8;
  }
}

.buy-button {
  background: #1dbf73;
  color: #fff;
}

.sell-button {
  background: #e84545;
  color: #fff;
}

.buy-info,
.sell-info {
  font-size: 10px;
  color: #969799;
  margin-bottom: 8px;

  .info-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;

    .info-label {
      color: #969799;
    }

    .info-value {
      color: #040303;
    }
  }
}

// 右侧订单簿样式
.order-book-header {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #969799;
  margin-bottom: 8px;
  padding: 0 4px;
  font-weight: 400;
}

.order-list {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 220px;
  min-height: 140px;
  
  &::-webkit-scrollbar {
    width: 2px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ebedf0;
    border-radius: 1px;
  }
}

.order-row {
  position: relative;
  padding: 3px 4px;
  font-size: 10px;
  transition: background-color 0.2s;
  overflow: hidden;
  cursor: pointer;
  min-height: 18px;
  display: flex;
  align-items: center;
  border-radius: 0;
  margin: 2px 0;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
  
  &:active {
    background-color: rgba(0, 0, 0, 0.04);
  }
}

.order-progress-bar {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  opacity: 0.15;
  transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 0;
  border-radius: 0;
  will-change: width;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.sell-progress {
  background-color: #1dbf73;
  right: 0;
  left: auto;
  // 确保从右到左的进度条动画
  transform-origin: right center;
}

.buy-progress {
  background-color: #e84545;
  right: 0;
  left: auto;
  // 确保从右到左的进度条动画（与卖盘一致）
  transform-origin: right center;
}

.order-content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 2px;
  pointer-events: none;
}

.sell-row {
  .sell-price {
    color: #1dbf73;
  }
}

.buy-row {
  .buy-price {
    color: #e84545;
  }
}

.order-price {
  font-weight: 500;
  flex: 1;
  font-size: 10px;
  line-height: 1.2;
}

.order-amount {
  color: #040303;
  text-align: right;
  flex: 1;
  font-size: 10px;
  line-height: 1.2;
}

.current-price-section {
  text-align: center;
  padding: 10px 4px;
  border-top: 1px solid #ebedf0;
  border-bottom: 1px solid #ebedf0;
  margin: 8px 0;
  flex-shrink: 0;
  background: #fff;
  z-index: 2;
  position: relative;
}

.current-price-value {
  font-size: 14px;
  font-weight: 600;
  color: #040303;
  margin-bottom: 3px;
  line-height: 1.2;
}

.current-price-info {
  font-size: 9px;
  color: #969799;
  line-height: 1.2;

  .price-change {
    margin-left: 4px;
    font-weight: 500;

    &.up {
      color: #1dbf73;
    }

    &.down {
      color: #e84545;
    }
  }
}

.price-increment {
  margin-top: 6px;
}

.increment-btn {
  font-size: 9px;
  padding: 4px 6px;
  display: flex;
  align-items: center;
  gap: 4px;

  .grid-icon {
    margin-left: auto;
  }
}
</style>
