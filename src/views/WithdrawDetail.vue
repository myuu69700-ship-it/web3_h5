<template>
  <div class="withdraw-detail">
    <van-nav-bar title="提現" fixed placeholder left-arrow @click-left="goBack" />
    
    <div class="content">
      <!-- 帳户选择 -->
      <div class="form-section">
        <div class="section-label">帳戶</div>
        <div class="select-field" @click="openCoinPicker">
          <div class="field-content">
            <div class="coin-logo" :style="{ backgroundColor: selectedCoin.color }">
              <span class="coin-icon-text">{{ selectedCoin.iconText }}</span>
            </div>
            <span class="coin-name">{{ selectedCoin.symbol }}</span>
          </div>
          <van-icon name="arrow-down" class="arrow-icon" />
        </div>
        <div class="available-amount">
          可取款數量 {{ availableAmount }} {{ selectedCoin.symbol }}
        </div>
      </div>

      <!-- 鏈類型选择 -->
      <div class="form-section">
        <div class="section-label">鏈類型</div>
        <div class="select-field" @click="openChainPicker">
          <div class="field-content">
            <span class="chain-name">{{ selectedChain }}</span>
          </div>
          <van-icon name="arrow-down" class="arrow-icon" />
        </div>
      </div>

      <!-- 錢包地址 -->
      <div class="form-section">
        <div class="section-label">錢包地址</div>
        <div class="input-field-wrapper">
          <input 
            type="text" 
            class="input-field" 
            placeholder="請輸入提幣地址"
            v-model="walletAddress"
          />
          <div class="scan-icon" @click="handleScan">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.38-1.9 1.38-1.51 0-2.08-.75-2.17-1.7H6.4c.1 1.9 1.36 3.1 3.5 3.41V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 提款金額 -->
      <div class="form-section">
        <div class="section-label">提款金額</div>
        <div class="input-field-wrapper">
          <input 
            type="number" 
            class="input-field" 
            placeholder="輸入提款金額"
            v-model="withdrawAmount"
          />
          <button class="all-btn" @click="setMaxAmount">全部</button>
        </div>
      </div>

      <!-- 费用信息 -->
      <div class="fee-section">
        <div class="fee-info">
          <span class="fee-label">提現費用</span>
          <van-icon name="question-o" class="question-icon" />
          <span class="fee-value">{{ withdrawalFee }}{{ selectedCoin.symbol }}</span>
        </div>
        <div class="estimated-amount">
          預計到帳 {{ estimatedAmount }}
        </div>
      </div>

      <!-- 提交按钮 -->
      <div class="submit-section">
        <van-button 
          type="primary" 
          block 
          size="large" 
          class="submit-btn"
          @click="handleSubmit"
        >
          提交
        </van-button>
      </div>
    </div>

    <!-- 币种选择弹窗 -->
    <van-popup
      v-model:show="showCoinPicker"
      position="bottom"
      :style="{ borderRadius: '16px 16px 0 0' }"
    >
      <div class="picker-popup">
        <div class="drag-handle"></div>
        <div class="picker-header">
          <span class="picker-cancel" @click="showCoinPicker = false">取消</span>
          <span class="picker-confirm" @click="confirmCoinSelection">確認</span>
        </div>
        <div class="picker-content">
          <div 
            v-for="coin in coinList" 
            :key="coin.symbol"
            class="picker-item"
            :class="{ active: tempSelectedCoin?.symbol === coin.symbol }"
            @click="tempSelectedCoin = coin"
          >
            <div class="picker-coin-logo" :style="{ backgroundColor: coin.color }">
              <span class="picker-coin-icon-text">{{ coin.iconText }}</span>
            </div>
            <span class="picker-coin-name">{{ coin.symbol }}</span>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 链类型选择弹窗 -->
    <van-popup
      v-model:show="showChainPicker"
      position="bottom"
      :style="{ borderRadius: '16px 16px 0 0' }"
    >
      <div class="picker-popup">
        <div class="drag-handle"></div>
        <div class="picker-header">
          <span class="picker-cancel" @click="showChainPicker = false">取消</span>
          <span class="picker-confirm" @click="confirmChainSelection">確認</span>
        </div>
        <div class="picker-content">
          <div 
            v-for="chain in chainList" 
            :key="chain"
            class="picker-item"
            :class="{ active: tempSelectedChain === chain }"
            @click="tempSelectedChain = chain"
          >
            <span class="picker-chain-name">{{ chain }}</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

// 选中的币种
const selectedCoin = ref({
  symbol: 'USDT',
  iconText: 'T',
  color: '#26a17b'
})

// 临时选中的币种（用于弹窗选择）
const tempSelectedCoin = ref(null)

// 可用金额
const availableAmount = ref('0')

// 选中的链类型
const selectedChain = ref('TRC20')

// 临时选中的链类型
const tempSelectedChain = ref(null)

// 钱包地址
const walletAddress = ref('')

// 提款金额
const withdrawAmount = ref('')

// 提现费用
const withdrawalFee = ref('2')

// 弹窗显示状态
const showCoinPicker = ref(false)
const showChainPicker = ref(false)

// 币种列表
const coinList = ref([
  { symbol: 'USDT', iconText: 'T', color: '#26a17b' },
  { symbol: 'ETH', iconText: 'E', color: '#627EEA' },
  { symbol: 'BTC', iconText: 'B', color: '#F7931A' },
  { symbol: 'USDC', iconText: 'U', color: '#2775CA' }
])

// 链类型列表
const chainList = ref(['TRC20', 'ERC20', 'BEP20'])

// 预计到账金额
const estimatedAmount = computed(() => {
  const amount = parseFloat(withdrawAmount.value) || 0
  const fee = parseFloat(withdrawalFee.value) || 0
  const result = amount - fee
  return result > 0 ? result.toFixed(2) : '0'
})

// 打开币种选择器时初始化临时选择
const openCoinPicker = () => {
  tempSelectedCoin.value = { ...selectedCoin.value }
  showCoinPicker.value = true
}

// 打开链类型选择器时初始化临时选择
const openChainPicker = () => {
  tempSelectedChain.value = selectedChain.value
  showChainPicker.value = true
}

// 确认币种选择
const confirmCoinSelection = () => {
  if (tempSelectedCoin.value) {
    selectedCoin.value = { ...tempSelectedCoin.value }
  }
  showCoinPicker.value = false
}

// 确认链类型选择
const confirmChainSelection = () => {
  if (tempSelectedChain.value) {
    selectedChain.value = tempSelectedChain.value
  }
  showChainPicker.value = false
}

// 设置最大金额
const setMaxAmount = () => {
  withdrawAmount.value = availableAmount.value
}

// 扫描地址
const handleScan = () => {
  showToast('掃描功能開發中')
}

// 提交
const handleSubmit = () => {
  if (!walletAddress.value) {
    showToast('請輸入提幣地址')
    return
  }
  if (!withdrawAmount.value || parseFloat(withdrawAmount.value) <= 0) {
    showToast('請輸入有效的提款金額')
    return
  }
  if (parseFloat(withdrawAmount.value) > parseFloat(availableAmount.value)) {
    showToast('提款金額不能超過可取款數量')
    return
  }
  showToast('提交成功')
  // 这里可以添加实际的提现API调用
}

// 返回
const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.withdraw-detail {
  min-height: 100vh;
  padding-bottom: 60px;
  background-color: #f5f5f5;
}

.content {
  padding: 16px;
}

.form-section {
  margin-bottom: 24px;

  .section-label {
    font-size: 14px;
    color: #323233;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .select-field {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    margin-bottom: 4px;

    .field-content {
      display: flex;
      align-items: center;
      gap: 12px;

      .coin-logo {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #26a17b;

        .coin-icon-text {
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
        }
      }

      .coin-name {
        font-size: 16px;
        color: #323233;
        font-weight: 500;
      }

      .chain-name {
        font-size: 16px;
        color: #323233;
        font-weight: 500;
      }
    }

    .arrow-icon {
      font-size: 16px;
      color: #969799;
    }
  }

  .available-amount {
    font-size: 12px;
    color: #969799;
    padding-left: 4px;
    margin-top: 4px;
  }

  .input-field-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #f7f8fa;
    border-radius: 8px;
    padding: 0 16px;

    .input-field {
      flex: 1;
      height: 48px;
      border: none;
      outline: none;
      font-size: 16px;
      color: #323233;
      background: transparent;

      &::placeholder {
        color: #c8c9cc;
      }
    }

    .scan-icon {
      width: 24px;
      height: 24px;
      color: #323233;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    .all-btn {
      height: 32px;
      padding: 0 16px;
      background-color: transparent;
      border: none;
      font-size: 14px;
      color: #323233;
      cursor: pointer;
      font-weight: 500;

      &:active {
        opacity: 0.7;
      }
    }
  }
}

.fee-section {
  margin-bottom: 32px;
  padding: 0;

  .fee-info {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 12px;

    .fee-label {
      font-size: 14px;
      color: #323233;
    }

    .question-icon {
      font-size: 14px;
      color: #969799;
    }

    .fee-value {
      font-size: 14px;
      color: #323233;
      font-weight: 500;
      margin-left: auto;
    }
  }

  .estimated-amount {
    font-size: 14px;
    color: #969799;
  }
}

.submit-section {
  margin-top: 32px;

  .submit-btn {
    height: 48px;
    border-radius: 24px;
    font-size: 16px;
    font-weight: 500;
    background-color: #000000;
    border: none;
    color: #ffffff;

    &:active {
      opacity: 0.8;
    }
  }
}

// 选择器弹窗样式
.picker-popup {
  background-color: #ffffff;
  border-radius: 16px 16px 0 0;
  max-height: 60vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .drag-handle {
    width: 40px;
    height: 4px;
    background-color: #d4d4d4;
    border-radius: 2px;
    margin: 8px auto 0;
  }

  .picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #ebedf0;

    .picker-cancel,
    .picker-confirm {
      font-size: 16px;
      color: #323233;
      cursor: pointer;
      font-weight: 500;

      &:active {
        opacity: 0.7;
      }
    }

    .picker-confirm {
      color: #07c160;
    }
  }

  .picker-content {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;

    .picker-item {
      display: flex;
      align-items: center;
      padding: 16px 20px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:active {
        background-color: #f7f8fa;
      }

      &.active {
        background-color: #f7f8fa;
      }

      .picker-coin-logo {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;

        .picker-coin-icon-text {
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
        }
      }

      .picker-coin-name,
      .picker-chain-name {
        font-size: 16px;
        color: #323233;
      }
    }
  }
}
</style>

