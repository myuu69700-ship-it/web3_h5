<template>
  <div class="trade">
    <!-- 左右布局容器 -->
    <div class="bet-main">
      <!-- 左侧：交易控制面板 (216px) -->
      <div class="bet-main-left">
        <!-- 保证金模式和杠杆 -->
        <div class="margin-leverage">
          <div class="select-btn margin-mode" @click="openMarginModePopup">
            <span>{{ marginMode === "isolated" ? "逐倉" : "全倉" }}</span>
            <van-icon name="arrow-down" size="12" />
          </div>
          <div class="select-btn leverage" @click="openLeveragePopup">
            <span>{{ currentLeverage }}x</span>
            <van-icon name="arrow-down" size="12" />
          </div>
        </div>

        <!-- 订单类型 -->
        <div class="order-type">
          <div class="select-btn2">
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
          <div class="quantity-input-container">
            <input
              type="text"
              class="quantity-input"
              v-model="inputAmount"
              placeholder="0"
            />
            <div class="quantity-unit-selector">
              <span>張</span>
              <van-icon name="arrow-down" size="12" />
            </div>
          </div>
        </div>

        <!-- 可用余额 -->
        <div class="available-balance">
          <span class="balance-label">可用</span>
          <div class="balance-value">
            <span>{{ currentBalance }} USDT</span>
            <van-icon name="exchange" size="14" class="exchange-icon" />
          </div>
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
              @drag-start="handleSliderDragStart"
              @drag="handleSliderDrag"
              @drag-end="handleSliderDragEnd"
            />
            <!-- 自定义工具提示 -->
            <div
              class="custom-tooltip"
              :class="{ show: isSliderDragging }"
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
                  passed: sliderPercent >= mark,
                  covered: Math.abs(sliderPercent - mark) < 2,
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
          <van-checkbox
            v-model="stopLossProfitEnabled"
            shape="square"
            icon-size="13px"
            checked-color="#040303"
          ></van-checkbox>
          <div class="stop-loss-profit-label">止盈止損</div>
        </div>

        <!-- 止盈止损输入框 -->
        <div v-if="stopLossProfitEnabled" class="stop-loss-profit-inputs">
          <div class="profit-loss-input-wrapper">
            <input
              type="text"
              class="profit-loss-input"
              v-model="takeProfitPrice"
              placeholder="0"
            />
            <span class="profit-loss-label">止盈價格</span>
          </div>
          <div class="profit-loss-input-wrapper">
            <input
              type="text"
              class="profit-loss-input"
              v-model="stopLossPrice"
              placeholder="0"
            />
            <span class="profit-loss-label">止損價格</span>
          </div>
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
          <div>價格 (USDT)</div>
          <div style="margin-left: 65px">數量 (ETH)</div>
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
                left: 'auto',
              }"
            ></div>
            <div class="order-content">
              <span class="order-price sell-price">{{
                formatPrice(item.price)
              }}</span>
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
              {{ priceChange >= 0 ? "+" : "" }}{{ priceChange }}%
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
                left: 'auto',
              }"
            ></div>
            <div class="order-content">
              <span class="order-price buy-price">{{
                formatPrice(item.price)
              }}</span>
              <span class="order-amount">{{ formatAmount(item.amount) }}</span>
            </div>
          </div>
        </div>

        <!-- 价格增量选择 -->
        <div class="price-increment">
          <div class="increment-selector" @click="showIncrementPicker = true">
            <span class="increment-value">{{ selectedIncrement }}</span>
            <van-icon name="arrow-down" size="12" class="increment-arrow" />
            <van-icon name="bars" size="14" class="increment-icon" />
          </div>
        </div>

        <!-- 价格增量选择器弹窗 -->
        <van-popup
          v-model:show="showIncrementPicker"
          position="bottom"
          :style="{ height: '40%' }"
          round
        >
          <div class="increment-picker-content">
            <div class="picker-header">
              <div class="picker-drag-handle"></div>
              <van-icon
                name="cross"
                size="16"
                class="picker-close"
                @click="showIncrementPicker = false"
              />
            </div>
            <div class="picker-list">
              <div
                v-for="(option, index) in incrementOptions"
                :key="index"
                class="picker-item"
                :class="{ active: selectedIncrement === option }"
                @click="selectIncrement(option)"
              >
                {{ option }}
              </div>
            </div>
          </div>
        </van-popup>
      </div>
    </div>

    <!-- 杠杆调整弹窗 -->
    <van-popup
      v-model:show="showLeveragePopup"
      position="bottom"
      round
      :style="{ padding: '0' }"
    >
      <div class="leverage-popup">
        <div class="leverage-popup-header">
          <div class="leverage-popup-title">調整槓桿</div>
          <van-icon
            name="cross"
            size="16"
            class="leverage-popup-close"
            @click="showLeveragePopup = false"
          />
        </div>

        <!-- 杠杆输入区域 -->
        <div class="leverage-input-section">
          <button
            class="leverage-btn decrease-btn"
            @click="decreaseLeverage"
            :disabled="tempLeverage <= 1"
          >
            <van-icon name="minus" size="14" />
          </button>
          <div class="leverage-value">{{ tempLeverage }}</div>
          <button
            class="leverage-btn increase-btn"
            @click="increaseLeverage"
            :disabled="tempLeverage >= maxLeverage"
          >
            <van-icon name="plus" size="14" />
          </button>
        </div>

        <!-- 预设杠杆选项 -->
        <div class="leverage-presets">
          <button
            v-for="preset in leveragePresets"
            :key="preset"
            class="leverage-preset-btn"
            :class="{ active: tempLeverage === preset }"
            @click="selectPresetLeverage(preset)"
          >
            {{ preset }}x
          </button>
        </div>

        <!-- 杠杆信息 -->
        <div class="leverage-info">
          <div class="leverage-info-item">
            <span class="info-label">當前最大槓桿倍數</span>
            <span class="info-value">{{ maxLeverage }}x</span>
          </div>
          <div class="leverage-info-item">
            <span class="info-label">最大可開</span>
            <span class="info-value">0 張</span>
          </div>
        </div>

        <!-- 确认按钮 -->
        <div class="leverage-confirm" @click="confirmLeverage">確認</div>

        <!-- 数字键盘 -->
        <div class="leverage-keypad">
          <div class="keypad-row">
            <button
              v-for="num in [1, 2, 3]"
              :key="num"
              class="keypad-btn"
              @click="inputNumber(num)"
            >
              {{ num }}
            </button>
          </div>
          <div class="keypad-row">
            <button
              v-for="num in [4, 5, 6]"
              :key="num"
              class="keypad-btn"
              @click="inputNumber(num)"
            >
              {{ num }}
            </button>
          </div>
          <div class="keypad-row">
            <button
              v-for="num in [7, 8, 9]"
              :key="num"
              class="keypad-btn"
              @click="inputNumber(num)"
            >
              {{ num }}
            </button>
          </div>
          <div class="keypad-row keypad-row-last">
            <button class="keypad-btn" @click="inputNumber(0)">0</button>
            <button class="keypad-btn delete-btn" @click="deleteNumber">
              <van-icon name="cross" size="16" />
            </button>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 保证金模式选择弹窗 -->
    <van-popup
      v-model:show="showMarginModePopup"
      position="bottom"
      round
      :style="{ padding: '0' }"
    >
      <div class="margin-mode-popup">
        <div class="margin-mode-header">
          <div class="margin-mode-title">保證金模式</div>
          <van-icon
            name="cross"
            size="16"
            class="margin-mode-close"
            @click="showMarginModePopup = false"
          />
        </div>

        <div class="margin-mode-selector">
          <div
            class="mode-option"
            :class="{ active: selectedMarginMode === 'isolated' }"
            @click="selectedMarginMode = 'isolated'"
          >
            逐倉
          </div>
          <div
            class="mode-option"
            :class="{ active: selectedMarginMode === 'cross' }"
            @click="selectedMarginMode = 'cross'"
          >
            全倉
          </div>
        </div>

        <div class="margin-mode-notice">
          <div class="notice-text">調整保證金模式僅對目前交易標的生效</div>
          <div class="notice-link">什麼是全倉和逐倉保證金模式</div>
        </div>

        <div class="margin-mode-description">
          <div class="description-item">
            <div class="description-title">全倉模式:</div>
            <div class="description-content">
              保證金資產相同的全倉位共享對應資產的全倉保證金,在強平事件中,交易者可能隨時全部對應保證金和對應保證金資產下的所有全倉位
            </div>
          </div>
          <div class="description-item">
            <div class="description-title">逐倉模式:</div>
            <div class="description-content">
              下單成交後,所形成部位保證金及盈虧獨立核算,逐倉部位風險與全倉位隔離,在強平事件中,交易者只會損失該部位下的全部保證金
            </div>
          </div>
        </div>

        <div class="margin-mode-confirm" @click="confirmMarginMode">確認</div>
      </div>
    </van-popup>
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
const isSliderDragging = ref(false); // 控制滑块工具提示显示（鼠标按下时显示）

// 止盈止损价格
const takeProfitPrice = ref("");
const stopLossPrice = ref("");

// 价格增量选择
const selectedIncrement = ref("0.000001");
const showIncrementPicker = ref(false);
const incrementOptions = ref([
  "0.1",
  "0.01",
  "0.001",
  "0.0001",
  "0.00001",
  "0.000001",
]);

// 保证金模式
const marginMode = ref("isolated"); // 'isolated' 逐倉, 'cross' 全倉
const showMarginModePopup = ref(false);
const selectedMarginMode = ref("isolated"); // 弹窗中选择的模式（未确认前）

const openMarginModePopup = () => {
  selectedMarginMode.value = marginMode.value;
  showMarginModePopup.value = true;
};

const confirmMarginMode = () => {
  marginMode.value = selectedMarginMode.value;
  showMarginModePopup.value = false;
};

// 杠杆相关
const currentLeverage = ref(1);
const showLeveragePopup = ref(false);
const tempLeverage = ref(1); // 弹窗中临时选择的杠杆值
const maxLeverage = ref(125); // 最大杠杆倍数
const leveragePresets = ref([1, 3, 5, 10, 30]);

const openLeveragePopup = () => {
  tempLeverage.value = currentLeverage.value;
  showLeveragePopup.value = true;
};

const confirmLeverage = () => {
  currentLeverage.value = tempLeverage.value;
  showLeveragePopup.value = false;
};

const decreaseLeverage = () => {
  if (tempLeverage.value > 1) {
    tempLeverage.value--;
  }
};

const increaseLeverage = () => {
  if (tempLeverage.value < maxLeverage.value) {
    tempLeverage.value++;
  }
};

const selectPresetLeverage = (preset) => {
  if (preset <= maxLeverage.value) {
    tempLeverage.value = preset;
  }
};

const inputNumber = (num) => {
  const newValue = parseInt(String(tempLeverage.value) + String(num));
  if (newValue <= maxLeverage.value) {
    tempLeverage.value = newValue;
  }
};

const deleteNumber = () => {
  const str = String(tempLeverage.value);
  if (str.length > 1) {
    tempLeverage.value = parseInt(str.slice(0, -1));
  } else {
    tempLeverage.value = 1;
  }
};

const selectIncrement = (value) => {
  selectedIncrement.value = value;
  showIncrementPicker.value = false;
};

// 处理滑块移动事件
const handleSliderMove = () => {
  // 滑块值变化时的处理逻辑
};

// 处理滑块开始拖拽事件（鼠标按下）
const handleSliderDragStart = () => {
  isSliderDragging.value = true;
};

// 处理滑块拖拽事件（用于实时更新工具提示）
const handleSliderDrag = () => {
  // 工具提示会通过 sliderPercent 自动更新
};

// 处理滑块结束拖拽事件（鼠标松开）
const handleSliderDragEnd = () => {
  isSliderDragging.value = false;
};

// 格式化显示价格（带逗号）
const displayPrice = computed(() => {
  const numPrice = parseFloat(price.value) || 0;
  return numPrice.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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
  { price: 3260.3, amount: 3.1998 },
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
  if (typeof price === "string") {
    return price;
  }
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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
  const value = event.target.value.replace(/,/g, "");
  if (value === "" || /^\d*\.?\d*$/.test(value)) {
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
    const roundedPercent = Math.min(100, Math.max(0, Math.round(percent)));
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
  // max-width: 350px;
  background: #fff;
  border-radius: 8px;
  justify-content: space-between;
  padding: 0 3.2vw 8vw;
  // overflow: hidden;
}

.bet-main-left {
  width: 228.55px;
  // padding: 12px;
  background: #fff;
  // border-right: 1px solid #ebedf0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bet-main-right {
  width: 141.72px;
  // padding: 0px 4px;
  background: #fff;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  font-size: 3.2vw;
  position: relative;
  flex-shrink: 0;
  padding-left: 4px;
}
// 左侧面板样式
.margin-leverage {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}

.select-btn2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.13333vw;
  padding: 0 3vw;
  background: #f3f3f3;
  border: 0;
  border-radius: 1.6vw;
  width: 100%;
  height: 8.53333vw;
  line-height: 8.53333vw;
  margin-bottom: 2vw;
  line-height: 1;
  font-size: 16px;
}

.select-btn {
  width: 50%;
  height: 10.66667vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 22px;
  background: #f3f3f3;
  border-radius: 4px;
  font-size: 16px;
  color: #040303;
  cursor: pointer;
  border: 1px solid #ebedf0;
  transition: all 0.2s;
  font-weight: 500;

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

.price-input-wrapper {
  background-color: #f3f3f3;
  width: 100%;
  height: 8.8vw;
  border: 1px solid transparent;
  border-radius: 2.13333vw;
  // padding: 0 2.13333vw;
  padding-left: 2vw;
  margin-bottom: 2vw;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  color: #040303;
}

.price-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 4vw;
  color: #040303;
  outline: none;

  &::placeholder {
    color: #c8c9cc;
  }
}

.input-unit {
  font-size: 3.2vw;
  color: #040303;
}

.quantity-input-wrapper {
  margin-bottom: 8px;
}

.input-label {
  font-size: 11px;
  color: #040303;
  margin-bottom: 4px;
}

.quantity-input-container {
  background-color: #f3f3f3;
  width: 100%;
  height: 8.8vw;
  border: 1px solid transparent;
  border-radius: 2.13333vw;
  padding: 0 2vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #040303;
}

.quantity-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 4vw;
  color: #040303;
  outline: none;
  padding: 0;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #c8c9cc;
  }
}

.quantity-unit-selector {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 3.2vw;
  color: #040303;
  cursor: pointer;
  flex-shrink: 0;
  // padding-left: 8px;

  span {
    font-size: 3.2vw;
  }
}

.available-balance {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .balance-label {
    color: #040303;
    font-size: 12px;
  }
  .balance-value {
    color: #040303;
    font-size: 12px;
  }
  .exchange-icon {
    color: #040303;
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
  opacity: 0;
  visibility: hidden;

  &.show {
    opacity: 1;
    visibility: visible;
  }
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
  color: #040303;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  .stop-loss-profit-label {
    color: #040303;
    font-size: 12px;
  }
}

.stop-loss-profit-inputs {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}

.profit-loss-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profit-loss-input {
  background-color: #f3f3f3;
  width: 100%;
  height: 8.8vw;
  border: 1px solid transparent;
  border-radius: 2.13333vw;
  padding: 0 2vw;
  font-size: 4vw;
  color: #040303;
  outline: none;

  &::placeholder {
    color: #c8c9cc;
  }
}

.profit-loss-label {
  font-size: 3.2vw;
  color: #040303;
  padding-left: 2vw;
}

.trade-button {
  width: 100%;
  min-height: 13.33333vw;
  line-height: 4vw;
  text-align: center;
  border-radius: 26.66667vw;
  font-size: 3.73333vw;
  color: var(--font-btn);
  display: flex;
  flex-wrap: initial;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: column;
  color: #ffffff;

  &:active {
    opacity: 0.8;
  }

  .button-text {
    // font-size: 13px;
    font-size: 3.73333vw;
    font-weight: 600;
    margin-bottom: 2px;
    color: #ffffff;
  }

  .button-desc {
    // font-size: 10px;
    font-size: 3.73333vw;
    opacity: 0.8;
    color: #ffffff;
  }
}

.buy-button {
  background: #1dbf73;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.sell-button {
  background: #ec4b6d;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.buy-info,
.sell-info {
  font-size: 10px;
  color: #040303;
  margin-bottom: 8px;

  .info-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    font-size: 3.2vw;

    .info-label {
      color: #040303;
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
  color: #040303;
  margin-bottom: 8px;
  padding: 0 4px;
  font-weight: 400;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: initial;
  align-items: initial;
  justify-content: initial;
  height: 4.8vw;
  line-height: 4.8vw;
  margin-bottom: 1px;
  width: 100%;
  font-size: 3.2vw;
  margin-bottom: 5.5vw;
}

.order-list {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 250px;
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
  // font-size: 10px;
  font-size: 3.2vw;
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
    font-size: 3.2vw;
  }
}

.buy-row {
  .buy-price {
    color: #e84545;
    font-size: 3.2vw;
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
  font-size: 3.2vw;
}

.current-price-section {
  // text-align: center;
  padding: 5px 0px;
  // border-top: 1px solid #ebedf0;
  // border-bottom: 1px solid #ebedf0;
  margin: 8px 0;
  flex-shrink: 0;
  background: #fff;
  z-index: 2;
  position: relative;
}

.current-price-value {
  font-size: 3.73333vw;
  font-weight: 600;
  color: #3abf74;
  margin-bottom: 3px;
  line-height: 1.2;
  // font-size: 3.2vw;
}

.current-price-info {
  font-size: 3.2vw;
  color: #040303;
  line-height: 1.2;
  font-weight: 700;

  .price-change {
    margin-left: 4px;
    font-weight: 500;

    &.up {
      color: #ec4b6d;
    }

    &.down {
      color: #e84545;
    }
  }
}

.price-increment {
  margin-top: 6px;
  flex-shrink: 0;
}

.increment-selector {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  cursor: pointer;
  font-size: 3.2vw;
  color: #040303;
  position: relative;
}

.increment-value {
  flex: 1;
  font-size: 3.2vw;
}

.increment-arrow {
  color: #040303;
  flex-shrink: 0;
}

.increment-icon {
  color: #040303;
  margin-left: auto;
  flex-shrink: 0;
}

.increment-picker-content {
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.picker-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebedf0;
  margin-bottom: 16px;
}

.picker-drag-handle {
  width: 40px;
  height: 4px;
  background: #ebedf0;
  border-radius: 2px;
  margin: 0 auto;
}

.picker-close {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #323233;
  cursor: pointer;
  padding: 8px;
}

.picker-list {
  flex: 1;
  overflow-y: auto;
}

.picker-item {
  padding: 16px;
  text-align: center;
  font-size: 16px;
  color: #323233;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 4px;

  &:active {
    background-color: #f7f8fa;
  }

  &.active {
    background-color: #f7f8fa;
    color: #040303;
    font-weight: 500;
  }
}

// 保证金模式弹窗样式
.margin-mode-popup {
  background: #fff;
  border-radius: 16px 16px 0 0;
  padding: 20px;
  max-height: 80vh;
  overflow-y: auto;
}

.margin-mode-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebedf0;
}

.margin-mode-title {
  font-size: 18px;
  font-weight: 600;
  color: #040303;
  text-align: center;
}

.margin-mode-close {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #323233;
  cursor: pointer;
  padding: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f3f3f3;
}

.margin-mode-selector {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.mode-option {
  flex: 1;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 500;
  color: #040303;
  background: #fff;
  border: 1px solid #ebedf0;
  cursor: pointer;
  transition: all 0.3s;

  &.active {
    background: #040303;
    color: #fff;
    border-color: #040303;
  }

  &:active {
    opacity: 0.8;
  }
}

.margin-mode-notice {
  margin-bottom: 20px;
  padding: 12px;
  background: #f7f8fa;
  border-radius: 8px;
}

.notice-text {
  font-size: 13px;
  color: #646566;
  line-height: 1.5;
  margin-bottom: 8px;
}

.notice-link {
  font-size: 13px;
  color: #1989fa;
  cursor: pointer;
  line-height: 1.5;
}

.margin-mode-description {
  margin-bottom: 24px;
}

.description-item {
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
}

.description-title {
  font-size: 14px;
  font-weight: 600;
  color: #040303;
  margin-bottom: 8px;
}

.description-content {
  font-size: 13px;
  color: #646566;
  line-height: 1.6;
}

.margin-mode-confirm {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #040303;
  color: #fff;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s;

  &:active {
    opacity: 0.8;
  }
}

// 杠杆调整弹窗样式
.leverage-popup {
  background: #fff;
  border-radius: 16px 16px 0 0;
  padding: 20px;
  max-height: 90vh;
  overflow-y: auto;
}

.leverage-popup-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
}

.leverage-popup-title {
  font-size: 18px;
  font-weight: 600;
  color: #040303;
  text-align: center;
}

.leverage-popup-close {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #040303;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #040303;
  color: #fff;
}

.leverage-input-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 0 20px;
}

.leverage-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #040303;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: opacity 0.3s;

  &:active {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}

.leverage-value {
  flex: 1;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #040303;
  min-width: 60px;
}

.leverage-presets {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  padding: 0 20px;
  justify-content: space-between;
}

.leverage-preset-btn {
  flex: 1;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 14px;
  font-weight: 500;
  color: #040303;
  background: #fff;
  border: 1px solid #ebedf0;
  cursor: pointer;
  transition: all 0.3s;

  &.active {
    border-color: #1dbf73;
    border-width: 2px;
    background: #fff;
  }

  &:active {
    opacity: 0.8;
  }
}

.leverage-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  padding: 0 20px;
}

.leverage-info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #969799;

  .info-label {
    color: #969799;
  }

  .info-value {
    color: #040303;
    font-weight: 500;
  }
}

.leverage-confirm {
  width: calc(100% - 40px);
  margin: 0 20px 20px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #040303;
  color: #fff;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s;

  &:active {
    opacity: 0.8;
  }
}

.leverage-keypad {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px 20px;
}

.keypad-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.keypad-row-last {
  grid-template-columns: 2fr 1fr;
}

.keypad-btn {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f3f3;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  color: #040303;
  cursor: pointer;
  transition: background-color 0.3s;

  &:active {
    background-color: #e5e5e5;
  }
}

.delete-btn {
  background: #969799;
  color: #fff;
}
</style>
