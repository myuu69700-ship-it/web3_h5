<template>
  <div class="product-detail">
    <!-- 顶部导航栏 -->
    <div class="nav-bar">
      <van-icon name="arrow-left" class="back-icon" @click="goBack" />
      <div class="nav-title">DeFi 借幣</div>
      <van-icon name="info-o" class="info-icon" />
    </div>

    <!-- 借币状态卡片 -->
    <div class="status-card">
      <div class="status-item">
        <div class="status-label">已借金額(USDT)</div>
        <div class="status-value">{{ borrowedAmount }}</div>
      </div>
      <div class="status-item">
        <div class="status-label1">剩餘還幣數量(USDT)</div>
        <div class="status-value1">{{ remainingAmount }}</div>
      </div>
    </div>

    <!-- 标签页 -->
    <div class="tabs-wrapper">
      <div
        class="tab-item"
        :class="{ active: activeTab === 'pledge' }"
        @click="activeTab = 'pledge'"
      >
        質押借幣
      </div>
      <div
        class="tab-item"
        :class="{ active: activeTab === 'orders' }"
        @click="activeTab = 'orders'"
      >
        在借訂單
      </div>
    </div>

    <div class="content">
      <!-- 驗資數量 -->
      <div class="section">
        <div class="section-title">■ 驗資數量</div>
        <div class="input-group">
          <van-field
            v-model="verificationAmount"
            placeholder="請輸入"
            type="number"
            class="amount-input"
          >
            <template #button>
              <button class="max-btn" @click="setMaxAmount">MAX</button>
            </template>
          </van-field>
          <div class="currency-selector" @click="showCurrencyModal = true">
            <img
              :src="getCurrencyIcon(selectedCurrency)"
              class="currency-icon"
              alt=""
            />
            <span class="currency-text">{{ selectedCurrency }}</span>
            <van-icon name="arrow-down" class="arrow-icon" />
          </div>
        </div>
        <div class="available-amount">
          可驗資金額: {{ availableAmount }} {{ selectedCurrency }}
        </div>
      </div>

      <!-- 可借數量 -->
      <div class="section">
        <div class="section-title">■ 可借數量</div>
        <div class="borrowable-amount-display">
          <span class="amount-value">{{ borrowableAmount }}</span>
          <div class="currency-icon-small-box">
            <img
              :src="getCurrencyIcon(selectedCurrency)"
              class="currency-icon-small"
              alt=""
            />
          </div>
        </div>
        <div class="borrowable-note">根據個人資產情況進行,同步借幣額度</div>
      </div>

      <!-- 借幣期限 -->
      <div class="section">
        <div class="section-title">■ 借幣期限</div>
        <div class="loan-terms">
          <div
            v-for="term in loanTerms"
            :key="term.days"
            class="term-option"
            :class="{ active: selectedTerm === term.days }"
            @click="selectedTerm = term.days"
          >
            {{ term.label }}
          </div>
        </div>
      </div>

      <!-- 費用詳情 -->
      <div class="section fee-section">
        <div class="fee-item">
          <div class="fee-label">
            日幣息率
            <van-icon name="question-o" class="question-icon" />
          </div>
          <div class="fee-value">{{ dailyInterestRate }}%</div>
        </div>
        <div class="fee-item">
          <div class="fee-label">總幣息</div>
          <div class="fee-value">
            {{ totalInterest }} {{ selectedCurrency }}
          </div>
        </div>
        <div class="fee-item">
          <div class="fee-label">總服務費</div>
          <div class="fee-value">
            {{ totalServiceFee }} {{ selectedCurrency }}
          </div>
        </div>
        <div class="fee-item">
          <div class="fee-label">預估應還</div>
          <div class="fee-value highlight">
            {{ estimatedRepayment }} {{ selectedCurrency }}
          </div>
        </div>
      </div>

      <!-- 協議勾選 -->
      <div class="agreement-section">
        <van-checkbox v-model="agreed" icon-size="18px" />
        <div class="agreement-text">
          我已經閱讀並同意<span class="link">"借幣服務協議"</span>
        </div>
      </div>

      <!-- 立即借幣按鈕 -->
      <button class="borrow-btn" :disabled="!canBorrow" @click="handleBorrow">
        立即借幣
      </button>
    </div>

    <!-- 貨幣選擇彈窗 -->
    <CurrencySelectModal
      v-model:show="showCurrencyModal"
      :selected="selectedCurrency"
      @select="handleCurrencySelect"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import CurrencySelectModal from "@/components/CurrencySelectModal.vue";

const router = useRouter();

// 標籤頁狀態
const activeTab = ref("pledge"); // 'pledge' 或 'orders'

// 借幣狀態數據
const borrowedAmount = ref("0.00");
const remainingAmount = ref("0.00");

// 數據
const verificationAmount = ref("");
const selectedCurrency = ref("USDT");
const availableAmount = ref(0);
const borrowableAmount = ref("0.00");
const selectedTerm = ref(7); // 默認選中7天（根據圖片）
const dailyInterestRate = ref("0.00");
const totalInterest = ref("0.00");
const totalServiceFee = ref("0");
const estimatedRepayment = ref("0.00");
const agreed = ref(true);
const showCurrencyModal = ref(false);

// 借幣期限選項
const loanTerms = [
  { days: 7, label: "7天" },
  { days: 15, label: "15天" },
  { days: 30, label: "30天" },
  { days: 45, label: "45天" },
  { days: 60, label: "60天" },
  { days: 90, label: "90天" },
  { days: 180, label: "180天" },
];

// 計算是否可以借幣
const canBorrow = computed(() => {
  return (
    agreed.value &&
    parseFloat(verificationAmount.value) > 0 &&
    parseFloat(borrowableAmount.value) > 0
  );
});

// 設置最大金額
const setMaxAmount = () => {
  verificationAmount.value = availableAmount.value.toString();
};

// 處理貨幣選擇
const handleCurrencySelect = (currency) => {
  selectedCurrency.value = currency;
  showCurrencyModal.value = false;
};

// 獲取貨幣圖標
const getCurrencyIcon = (currency) => {
  // 這裡可以根據實際需求返回對應的圖標路徑
  // 暫時返回一個默認的綠色T圖標樣式，實際應該使用真實的圖標
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='%2326a17b'/%3E%3Ctext x='12' y='16' font-size='14' fill='white' text-anchor='middle' font-weight='bold'%3ET%3C/text%3E%3C/svg%3E";
};

// 處理借幣
const handleBorrow = () => {
  if (!canBorrow.value) return;
  // 處理借幣邏輯
  console.log("立即借幣", {
    verificationAmount: verificationAmount.value,
    selectedCurrency: selectedCurrency.value,
    selectedTerm: selectedTerm.value,
  });
};

// 返回
const goBack = () => {
  router.back();
};
</script>

<style lang="scss" scoped>
.product-detail {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 40px;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 62.39px;
  padding: 0 16px;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
  // border-bottom: 1px solid #ebedf0;

  .back-icon,
  .info-icon {
    font-size: 20px;
    color: #323233;
    cursor: pointer;
  }

  .nav-title {
    font-size: 18px;
    font-weight: bold;
    color: #323233;
  }
}

// 借币状态卡片
.status-card {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  margin: 16px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  width: calc(100% - 8.53333vw);
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 0 2.66667vw #0000001a;
  border-radius: 2.66667vw;
  padding: 5.33333vw 4.26667vw;
  margin: 10px auto;

  .status-item {
    flex: 1;
    display: flex;
    flex-direction: column;

    .status-label {
      font-size: 14px;
      color: #969799;
      margin-bottom: 8px;
    }
    .status-label1 {
      font-size: 14px;
      color: #969799;
      margin-bottom: 8px;
      text-align: right;
    }

    .status-value {
      // font-size: 20px;
      // font-weight: bold;
      color: #040303;
      font-size: 6.4vw;
      text-align: lift;
    }
    .status-value1 {
      color: #040303;
      font-size: 6.4vw;
      text-align: right;
    }
  }
}

// 标签页
.tabs-wrapper {
  display: flex;
  padding: 0 16px;
  background-color: #fff;
  border-bottom: 1px solid #ebedf0;

  .tab-item {
    flex: 1;
    padding: 16px 0;
    text-align: center;
    font-size: 16px;
    color: #969799;
    cursor: pointer;
    position: relative;
    transition: color 0.2s;

    &.active {
      color: #323233;
      font-weight: 500;

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
  padding: 16px;
}

.section {
  margin-bottom: 24px;

  .section-title {
    font-size: 4.26667vw;
    // font-weight: 500;
    color: #040303;
    margin-bottom: 12px;
  }
}

// 驗資數量區域
.input-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;

  .amount-input {
    flex: 1;
    border: 1px solid #f3f3f3;
    position: relative;
    border-radius: 2.66667vw;
    :deep(.van-field__control) {
      font-size: 16px;
      padding-right: 55px;
    }
    :deep(.van-field__button) {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
      right: -2px;
    }
  }

  .max-btn {
    padding: 4px 12px;
    background-color: #040303;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
    width: 41px;
    height: 31px;
    line-height: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .currency-selector {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    background-color: #f7f8fa;
    border-radius: 4px;
    cursor: pointer;

    .currency-icon {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }

    .currency-text {
      font-size: 14px;
      color: #26a17b;
      font-weight: 500;
    }

    .arrow-icon {
      font-size: 14px;
      color: #969799;
    }
  }
}

.available-amount {
  font-size: 14px;
  color: #040303;
  margin-top: 8px;
}

// 可借數量區域
.borrowable-amount-display {
  // padding: 51px;
  height: 51px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #f3f3f3;
  gap: 8px;
  margin-bottom: 8px;
  border-radius: 2.66667vw;

  .amount-value {
    font-size: 24px;
    font-weight: bold;
    color: #323233;
    padding-left: 20px;
  }

  .currency-icon-small-box {
    padding-right: 30px;
  }

  .currency-icon-small {
    width: 20.8px;
    height: 20.8px;
    border-radius: 50%;
    // padding-right: 40px;
    // padding-right: 120px;
  }
}

.borrowable-note {
  font-size: 12px;
  color: #040303;
  line-height: 1.5;
}

// 借幣期限區域
.loan-terms {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  .term-option {
    padding: 12px;
    text-align: center;
    // background-color: #f7f8fa;
    border-radius: 266.4vw;
    font-size: 14px;
    color: #323233;
    cursor: pointer;
    transition: all 0.2s;

    &.active {
      font-size: 14px;
      background-color: #040303;
      color: #ffffff;
    }
  }
}

// 費用詳情區域
.fee-section {
  background-color: #f3f3f3;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;

  .fee-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    &:first-child {
      padding-top: 0;
    }

    .fee-label {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      color: #040303;

      .question-icon {
        font-size: 12px;
        width: 16px;
        height: 16px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: #26a17b;
        border-radius: 50%;
        color: #fff;
        margin-left: 4px;
      }
    }

    .fee-value {
      font-size: 14px;
      color: #040303;
      font-weight: 500;
      text-align: right;

      &.highlight {
        // font-weight: bold;
        color: #040303;
      }
    }
  }
}

// 協議區域
.agreement-section {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 50px;
  // margin-bottom: 24px;
  padding: 16px 0;

  :deep(.van-checkbox) {
    margin-top: 2px;
  }

  :deep(.van-checkbox__icon) {
    border-color: #323233;
    background-color: #323233;
  }

  :deep(.van-checkbox__icon--checked) {
    background-color: #323233;
    border-color: #323233;
  }

  .agreement-text {
    font-size: 14px;
    color: #040303;
    line-height: 1.5;
    flex: 1;
   

    .link {
      color: #2b6d16;
      // text-decoration: none;
      padding-left: 4px;
    }
  }
}

// 立即借幣按鈕
.borrow-btn {
  width: 92vw;
  height: 10.66667vw;
  line-height: 10.66667vw;
  text-align: center;
  border: 0;
  color: #fff;
  font-weight: 700;
  font-size: 3.2vw;
  background: #040303;
  border-radius: 266.4vw;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    opacity: 0.8;
  }
}
</style>
