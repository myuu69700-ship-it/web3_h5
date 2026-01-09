<template>
  <div class="quick-buy">
    <!-- 顶部导航栏 -->
    <div class="header">
      <van-icon name="arrow-left" class="back-icon" @click="goBack" />
      <div class="header-title">{{ t("quickBuy") }}</div>
      <div class="history-btn" @click="goToHistory">{{ t("orderHistory") }}</div>
    </div>

    <!-- 介绍文字 -->
    <div class="intro-section">
      <div class="intro-title">{{ t("quickBuyIntro1") }}</div>
      <div class="intro-subtitle">{{ t("quickBuyIntro2") }}</div>
    </div>

    <!-- 标签页 -->
    <div class="tabs">
      <div
        class="tab-item"
        :class="{ active: activeTab === 'buy' }"
        @click="activeTab = 'buy'"
      >
        {{ t("buy") }}
      </div>
      <div
        class="tab-item"
        :class="{ active: activeTab === 'sell' }"
        @click="activeTab = 'sell'"
      >
        {{ t("sell") }}
      </div>
    </div>

    <!-- 购买页面 -->
    <div v-if="activeTab === 'buy'" class="content buy-content">
      <!-- 我要支付 -->
      <div class="input-section">
        <div class="input-wrapper">
          <div class="input-content">
            <div class="input-label">{{ t("iWantToPay") }}</div>
            <input
              v-model="buyPayAmount"
              type="number"
              class="amount-input"
              placeholder="0.00"
              @input="calculateBuyReceive"
            />
          </div>
          <div class="currency-selector" @click="showPayCurrencyPicker = true">
            <div class="currency-icon jpy-icon"></div>
            <span class="currency-text">{{ payCurrency }}</span>
            <van-icon name="arrow-down" class="arrow-icon" />
          </div>
        </div>
        <div class="amount-range">
          {{ t("amountRange") }}: {{ formatRange(buyMinAmount, buyMaxAmount) }} {{ payCurrency }}
        </div>
      </div>

      <!-- 我将收到 -->
      <div class="input-section">
        <div class="input-wrapper">
          <div class="input-content">
            <div class="input-label">{{ t("iWillReceive") }}</div>
            <input
              v-model="buyReceiveAmount"
              type="number"
              class="amount-input"
              placeholder="0.00"
              @input="calculateBuyPay"
            />
          </div>
          <div class="currency-selector" @click="showReceiveCurrencyPicker = true">
            <div class="currency-icon usdt-icon"></div>
            <span class="currency-text">{{ receiveCurrency }}</span>
            <van-icon name="arrow-down" class="arrow-icon" />
          </div>
        </div>
      </div>

      <!-- 汇率显示 -->
      <div class="exchange-rate">
        <div class="rate-text">
          1 {{ receiveCurrency }} ≈ {{ exchangeRate }} {{ payCurrency }}
        </div>
        <van-icon name="replay" class="refresh-icon" @click="refreshRate" />
      </div>

      <!-- 购买按钮 -->
      <div class="action-button buy-button" @click="handleBuy">
        {{ t("buy") }}{{ receiveCurrency }}
      </div>
    </div>

    <!-- 出售页面 -->
    <div v-if="activeTab === 'sell'" class="content sell-content">
      <!-- 我要出售 -->
      <div class="input-section">
        <div class="input-wrapper">
          <div class="input-content">
            <div class="input-label">{{ t("iWantToSell") }}</div>
            <input
              v-model="sellPayAmount"
              type="number"
              class="amount-input"
              placeholder="0.00"
              @input="calculateSellReceive"
            />
          </div>
          <div class="currency-selector" @click="showSellCurrencyPicker = true">
            <div class="currency-icon usdt-icon"></div>
            <span class="currency-text">{{ receiveCurrency }}</span>
            <van-icon name="arrow-down" class="arrow-icon" />
          </div>
        </div>
        <div class="available-balance">
          {{ t("availableBalance") }}: {{ availableBalance }} {{ receiveCurrency }}
        </div>
      </div>

      <!-- 我将收到 -->
      <div class="input-section">
        <div class="input-wrapper">
          <div class="input-content">
            <div class="input-label">{{ t("iWillReceive") }}</div>
            <input
              v-model="sellReceiveAmount"
              type="number"
              class="amount-input"
              placeholder="0.00"
              @input="calculateSellPay"
            />
          </div>
          <div class="currency-selector" @click="showReceiveCurrencyPicker = true">
            <div class="currency-icon jpy-icon"></div>
            <span class="currency-text">{{ payCurrency }}</span>
            <van-icon name="arrow-down" class="arrow-icon" />
          </div>
        </div>
      </div>

      <!-- 汇率显示 -->
      <div class="exchange-rate">
        <div class="rate-text">
          1 {{ receiveCurrency }} ≈ {{ exchangeRate }} {{ payCurrency }}
        </div>
        <van-icon name="replay" class="refresh-icon" @click="refreshRate" />
        <van-icon name="question-o" class="question-icon" />
      </div>

      <!-- 出售按钮 -->
      <div class="action-button sell-button" @click="handleSell">
        {{ t("sell") }}{{ receiveCurrency }}
      </div>
    </div>

    <!-- 货币选择器 -->
    <van-popup
      v-model:show="showPayCurrencyPicker"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        :columns="payCurrencyOptions"
        @confirm="onPayCurrencyConfirm"
        @cancel="showPayCurrencyPicker = false"
      />
    </van-popup>

    <van-popup
      v-model:show="showReceiveCurrencyPicker"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        :columns="receiveCurrencyOptions"
        @confirm="onReceiveCurrencyConfirm"
        @cancel="showReceiveCurrencyPicker = false"
      />
    </van-popup>

    <van-popup
      v-model:show="showSellCurrencyPicker"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        :columns="receiveCurrencyOptions"
        @confirm="onSellCurrencyConfirm"
        @cancel="showSellCurrencyPicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "@/i18n";

const router = useRouter();
const { t } = useI18n();

// 标签页状态
const activeTab = ref("buy");

// 购买相关
const buyPayAmount = ref("");
const buyReceiveAmount = ref("");
const buyMinAmount = ref(50000);
const buyMaxAmount = ref(99999999999);

// 出售相关
const sellPayAmount = ref("");
const sellReceiveAmount = ref("");
const availableBalance = ref(0);

// 货币
const payCurrency = ref("JPY");
const receiveCurrency = ref("USDT");
const exchangeRate = ref(156.9);

// 货币选择器
const showPayCurrencyPicker = ref(false);
const showReceiveCurrencyPicker = ref(false);
const showSellCurrencyPicker = ref(false);

const payCurrencyOptions = [
  { text: "JPY", value: "JPY" },
  { text: "USD", value: "USD" },
  { text: "CNY", value: "CNY" },
];

const receiveCurrencyOptions = [
  { text: "USDT", value: "USDT" },
  { text: "BTC", value: "BTC" },
  { text: "ETH", value: "ETH" },
];

// 计算购买收到的金额
const calculateBuyReceive = () => {
  if (buyPayAmount.value && !isNaN(buyPayAmount.value)) {
    buyReceiveAmount.value = (
      parseFloat(buyPayAmount.value) / exchangeRate.value
    ).toFixed(2);
  } else {
    buyReceiveAmount.value = "";
  }
};

// 计算购买支付的金额
const calculateBuyPay = () => {
  if (buyReceiveAmount.value && !isNaN(buyReceiveAmount.value)) {
    buyPayAmount.value = (
      parseFloat(buyReceiveAmount.value) * exchangeRate.value
    ).toFixed(2);
  } else {
    buyPayAmount.value = "";
  }
};

// 计算出售收到的金额
const calculateSellReceive = () => {
  if (sellPayAmount.value && !isNaN(sellPayAmount.value)) {
    sellReceiveAmount.value = (
      parseFloat(sellPayAmount.value) * exchangeRate.value
    ).toFixed(2);
  } else {
    sellReceiveAmount.value = "";
  }
};

// 计算出售支付的金额
const calculateSellPay = () => {
  if (sellReceiveAmount.value && !isNaN(sellReceiveAmount.value)) {
    sellPayAmount.value = (
      parseFloat(sellReceiveAmount.value) / exchangeRate.value
    ).toFixed(2);
  } else {
    sellPayAmount.value = "";
  }
};

// 刷新汇率
const refreshRate = () => {
  // 这里可以调用API获取最新汇率
  console.log("刷新汇率");
};

// 格式化范围
const formatRange = (min, max) => {
  return `${min.toLocaleString()}-${max.toLocaleString()}`;
};

// 货币选择确认
const onPayCurrencyConfirm = ({ selectedOptions }) => {
  payCurrency.value = selectedOptions[0].value;
  showPayCurrencyPicker.value = false;
  calculateBuyReceive();
};

const onReceiveCurrencyConfirm = ({ selectedOptions }) => {
  receiveCurrency.value = selectedOptions[0].value;
  showReceiveCurrencyPicker.value = false;
  if (activeTab.value === "buy") {
    calculateBuyReceive();
  } else {
    calculateSellReceive();
  }
};

const onSellCurrencyConfirm = ({ selectedOptions }) => {
  receiveCurrency.value = selectedOptions[0].value;
  showSellCurrencyPicker.value = false;
  calculateSellReceive();
};

// 购买操作
const handleBuy = () => {
  if (!buyPayAmount.value || parseFloat(buyPayAmount.value) <= 0) {
    return;
  }
  console.log("购买", {
    pay: buyPayAmount.value,
    receive: buyReceiveAmount.value,
    currency: receiveCurrency.value,
  });
  // 这里可以调用购买API
};

// 出售操作
const handleSell = () => {
  if (!sellPayAmount.value || parseFloat(sellPayAmount.value) <= 0) {
    return;
  }
  console.log("出售", {
    pay: sellPayAmount.value,
    receive: sellReceiveAmount.value,
    currency: receiveCurrency.value,
  });
  // 这里可以调用出售API
};

// 返回
const goBack = () => {
  router.back();
};

// 跳转到历史订单
const goToHistory = () => {
  router.push("/order-center");
};
</script>

<style lang="scss" scoped>
.quick-buy {
  min-height: 100vh;
  background-color: #ffffff;
  padding-bottom: 80px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #ebedf0;

  .back-icon {
    font-size: 20px;
    color: #323233;
    cursor: pointer;
  }

  .header-title {
    font-size: 18px;
    font-weight: 600;
    color: #323233;
    flex: 1;
    text-align: center;
  }

  .history-btn {
    font-size: 14px;
    color: #323233;
    cursor: pointer;
  }
}

.intro-section {
  padding: 24px 16px 16px;
  text-align: center;

  .intro-title {
    font-size: 18px;
    font-weight: 600;
    color: #323233;
    margin-bottom: 8px;
  }

  .intro-subtitle {
    font-size: 14px;
    color: #969799;
    line-height: 1.5;
  }
}

.tabs {
  display: flex;
  padding: 0 16px;
  border-bottom: 1px solid #ebedf0;
  margin-bottom: 24px;

  .tab-item {
    flex: 1;
    text-align: center;
    padding: 16px 0;
    font-size: 16px;
    color: #969799;
    cursor: pointer;
    position: relative;
    transition: color 0.3s;

    &.active {
      color: #323233;
      font-weight: 600;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #323233;
      }
    }
  }
}

.content {
  padding: 0 16px;
  max-width: 100%;
}

.input-section {
  margin-bottom: 32px;

  .input-wrapper {
    display: flex;
    align-items: stretch;
    background-color: #ffffff;
    border: 1px solid #ebedf0;
    border-radius: 8px;
    padding: 0;
    gap: 0;
    height: 63.91px;
    overflow: hidden;

    .input-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      min-width: 0;
      padding: 12px 16px;
      padding-right: 12px;

      .input-label {
        font-size: 14px;
        color: #323233;
        font-weight: 500;
        line-height: 1;
      }

      .amount-input {
        width: 100%;
        border: none;
        background: transparent;
        font-size: 24px;
        font-weight: 600;
        color: #323233;
        outline: none;
        padding: 0;
        margin: 0;
        min-width: 0;
        line-height: 1;

        &::placeholder {
          color: #c8c9cc;
        }
      }
    }

    .currency-selector {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      background-color: #f5f5f5;
      border-radius: 0;
      cursor: pointer;
      min-width: 90px;
      justify-content: center;
      border: none;
      border-left: 1px solid #ebedf0;
      flex-shrink: 0;
      transition: background-color 0.2s;
      height: 63.91px;
      box-sizing: border-box;

      &:active {
        background-color: #e8e8e8;
      }

      .currency-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        flex-shrink: 0;

        &.jpy-icon {
          background-color: #ffffff;
          border: none;
          position: relative;

          &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 14px;
            height: 14px;
            background-color: #bc002d;
            border-radius: 50%;
          }
        }

        &.usdt-icon {
          background-color: #26a17b;
          position: relative;

          &::after {
            content: "T";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ffffff;
            font-size: 12px;
            font-weight: bold;
            line-height: 1;
          }
        }
      }

      .currency-text {
        font-size: 14px;
        color: #323233;
        font-weight: 500;
      }

      .arrow-icon {
        font-size: 10px;
        color: #969799;
        margin-left: 2px;
      }
    }
  }

  .amount-range {
    font-size: 12px;
    color: #969799;
    margin-top: 8px;
    padding-left: 0;
  }

  .available-balance {
    font-size: 12px;
    color: #969799;
    margin-top: 8px;
    padding-left: 0;
  }
}

.exchange-rate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
  padding: 0;

  .rate-text {
    font-size: 14px;
    color: #323233;
  }

  .refresh-icon {
    font-size: 16px;
    color: #969799;
    cursor: pointer;
    transition: transform 0.3s;

    &:active {
      transform: rotate(180deg);
    }
  }

  .question-icon {
    font-size: 16px;
    color: #26a17b;
    cursor: pointer;
  }
}

.action-button {
  width: 100%;
  height: 48px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background-color: #323233;
  cursor: pointer;
  transition: opacity 0.2s;

  &:active {
    opacity: 0.8;
  }

  &.buy-button {
    background-color: #323233;
  }

  &.sell-button {
    background-color: #323233;
  }
}
</style>
