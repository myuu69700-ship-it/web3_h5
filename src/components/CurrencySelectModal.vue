<template>
  <van-popup
    v-model:show="visible"
    position="bottom"
    :style="{ height: '60%' }"
    round
    @close="handleClose"
  >
    <div class="currency-modal">
      <!-- 頂部拖拽條和關閉按鈕 -->
      <div class="modal-header">
        <div class="drag-handle"></div>
        <van-icon name="cross" class="close-icon" @click="handleClose" />
      </div>

      <!-- 貨幣列表 -->
      <div class="currency-list">
        <div
          v-for="currency in currencies"
          :key="currency.symbol"
          class="currency-item"
          :class="{ selected: selected === currency.symbol }"
          @click="handleSelect(currency.symbol)"
        >
          <img
            :src="getCurrencyIcon(currency.symbol)"
            class="currency-logo"
            alt=""
          />
          <span
            class="currency-symbol"
            :class="{ 'currency-usdt': currency.symbol === 'USDT' }"
          >
            {{ currency.symbol }}
          </span>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: String,
    default: "USDT",
  },
});

const emit = defineEmits(["update:show", "select"]);

const visible = computed({
  get: () => props.show,
  set: (val) => emit("update:show", val),
});

// 貨幣列表
const currencies = [
  { symbol: "USDT" },
  { symbol: "BTC" },
  { symbol: "ETH" },
  { symbol: "BCH" },
  { symbol: "XRP" },
  { symbol: "LTC" },
  { symbol: "YFI" },
];

// 處理選擇
const handleSelect = (symbol) => {
  emit("select", symbol);
  visible.value = false;
};

// 處理關閉
const handleClose = () => {
  visible.value = false;
};

// 獲取貨幣圖標
const getCurrencyIcon = (symbol) => {
  // 這裡可以根據實際需求返回對應的圖標
  // 暫時使用SVG生成不同顏色的圓形圖標
  const colors = {
    USDT: "#26a17b", // 綠色
    BTC: "#f7931a", // 橙色
    ETH: "#627eea", // 藍色
    BCH: "#0ac18e", // 淺綠色
    XRP: "#000000", // 黑色
    LTC: "#345d9d", // 藍色
    YFI: "#0074fa", // 藍色
  };

  const icons = {
    USDT: "T",
    BTC: "B",
    ETH: "Ξ",
    BCH: "B",
    XRP: "X",
    LTC: "Ł",
    YFI: "$",
  };

  const color = colors[symbol] || "#969799";
  const icon = icons[symbol] || symbol[0];

  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='15' fill='${encodeURIComponent(
    color
  )}'/%3E%3Ctext x='16' y='20' font-size='16' fill='white' text-anchor='middle' font-weight='bold'%3E${encodeURIComponent(
    icon
  )}%3C/text%3E%3C/svg%3E`;
};
</script>

<style lang="scss" scoped>
.currency-modal {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  position: relative;

  .drag-handle {
    width: 40px;
    height: 4px;
    background-color: #d7d8da;
    border-radius: 2px;
  }

  .close-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    color: #323233;
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f7f8fa;
    border-radius: 50%;
  }
}

.currency-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 16px 24px;
}

.currency-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  cursor: pointer;
  transition: background-color 0.2s;

  &:active {
    background-color: #f7f8fa;
  }

  .currency-logo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: contain;
  }

  .currency-symbol {
    font-size: 16px;
    color: #323233;
    font-weight: 500;

    &.currency-usdt {
      color: #26a17b;
    }
  }

  &.selected {
    .currency-symbol {
      font-weight: bold;
    }
  }
}
</style>

