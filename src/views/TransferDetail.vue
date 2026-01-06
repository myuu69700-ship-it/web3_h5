<template>
  <div class="transfer-detail">
    <van-nav-bar title="劃轉" fixed placeholder left-arrow @click-left="goBack" />
    
    <div class="content">
      <!-- 账户选择区域 -->
      <div class="account-section">
        <!-- 从账户 -->
        <div class="account-row">
          <div class="account-label">從</div>
          <div class="select-field" @click="openFromAccountPicker">
            <span class="account-name">{{ fromAccount }}</span>
            <van-icon name="arrow-down" class="arrow-icon" />
          </div>
        </div>
        
        <!-- 交换按钮 -->
        <div class="swap-section">
          <div class="dotted-line"></div>
          <button class="swap-btn" @click="swapAccounts">
            <div class="swap-icon">
              <div class="swap-bar"></div>
              <div class="swap-bar"></div>
            </div>
          </button>
        </div>
        
        <!-- 到账户 -->
        <div class="account-row">
          <div class="account-label">到</div>
          <div class="select-field" @click="openToAccountPicker">
            <span class="account-name">{{ toAccount }}</span>
            <van-icon name="arrow-down" class="arrow-icon" />
          </div>
        </div>
      </div>

      <!-- 币种选择 -->
      <div class="form-section">
        <div class="section-label">幣種</div>
        <div class="select-field" @click="openCoinPicker">
          <div class="field-content">
            <div class="coin-logo" :style="{ backgroundColor: selectedCoin.color }">
              <span class="coin-icon-text">{{ selectedCoin.iconText }}</span>
            </div>
            <span class="coin-name">{{ selectedCoin.symbol }}</span>
          </div>
          <van-icon name="arrow-down" class="arrow-icon" />
        </div>
      </div>

      <!-- 数量输入 -->
      <div class="form-section">
        <div class="section-label">數量</div>
        <div class="input-field-wrapper">
          <input 
            type="number" 
            class="input-field" 
            placeholder="要劃轉的數量"
            v-model="transferAmount"
          />
          <button class="all-btn" @click="setMaxAmount">全部劃轉</button>
        </div>
        <div class="max-amount-hint">
          最多可轉 {{ maxTransferAmount }} {{ selectedCoin.symbol }}
        </div>
      </div>

      <!-- 购买数字货币链接 -->
      <div class="buy-link-section">
        <span class="buy-link" @click="handleBuyCurrency">購買數字貨幣</span>
      </div>

      <!-- 确认按钮 -->
      <div class="submit-section">
        <van-button 
          type="primary" 
          block 
          size="large" 
          class="submit-btn"
          @click="handleConfirm"
        >
          確認劃轉
        </van-button>
      </div>
    </div>

    <!-- 从账户选择弹窗 -->
    <van-popup
      v-model:show="showFromAccountPicker"
      position="bottom"
      :style="{ borderRadius: '16px 16px 0 0' }"
    >
      <div class="picker-popup">
        <div class="drag-handle"></div>
        <div class="picker-header">
          <span class="picker-cancel" @click="showFromAccountPicker = false">取消</span>
          <span class="picker-confirm" @click="confirmFromAccount">確認</span>
        </div>
        <div class="picker-content">
          <div 
            v-for="account in accountList" 
            :key="account"
            class="picker-item"
            :class="{ active: tempFromAccount === account }"
            @click="tempFromAccount = account"
          >
            <span class="picker-account-name">{{ account }}</span>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 到账户选择弹窗 -->
    <van-popup
      v-model:show="showToAccountPicker"
      position="bottom"
      :style="{ borderRadius: '16px 16px 0 0' }"
    >
      <div class="picker-popup">
        <div class="drag-handle"></div>
        <div class="picker-header">
          <span class="picker-cancel" @click="showToAccountPicker = false">取消</span>
          <span class="picker-confirm" @click="confirmToAccount">確認</span>
        </div>
        <div class="picker-content">
          <div 
            v-for="account in accountList" 
            :key="account"
            class="picker-item"
            :class="{ active: tempToAccount === account }"
            @click="tempToAccount = account"
          >
            <span class="picker-account-name">{{ account }}</span>
          </div>
        </div>
      </div>
    </van-popup>

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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

// 账户选择
const fromAccount = ref('現貨帳户')
const toAccount = ref('交易賬戶')
const tempFromAccount = ref(null)
const tempToAccount = ref(null)
const showFromAccountPicker = ref(false)
const showToAccountPicker = ref(false)

// 账户列表
const accountList = ref(['現貨帳户', '交易賬戶', '理財帳户'])

// 币种选择
const selectedCoin = ref({
  symbol: 'USDT',
  iconText: 'T',
  color: '#26a17b'
})

const tempSelectedCoin = ref(null)
const showCoinPicker = ref(false)

// 币种列表
const coinList = ref([
  { symbol: 'USDT', iconText: 'T', color: '#26a17b' },
  { symbol: 'ETH', iconText: 'E', color: '#627EEA' },
  { symbol: 'BTC', iconText: 'B', color: '#F7931A' },
  { symbol: 'USDC', iconText: 'U', color: '#2775CA' }
])

// 转账数量
const transferAmount = ref('')
const maxTransferAmount = ref('0')

// 打开从账户选择器
const openFromAccountPicker = () => {
  tempFromAccount.value = fromAccount.value
  showFromAccountPicker.value = true
}

// 打开到账户选择器
const openToAccountPicker = () => {
  tempToAccount.value = toAccount.value
  showToAccountPicker.value = true
}

// 确认从账户选择
const confirmFromAccount = () => {
  if (tempFromAccount.value) {
    fromAccount.value = tempFromAccount.value
  }
  showFromAccountPicker.value = false
}

// 确认到账户选择
const confirmToAccount = () => {
  if (tempToAccount.value) {
    toAccount.value = tempToAccount.value
  }
  showToAccountPicker.value = false
}

// 交换账户
const swapAccounts = () => {
  const temp = fromAccount.value
  fromAccount.value = toAccount.value
  toAccount.value = temp
}

// 打开币种选择器
const openCoinPicker = () => {
  tempSelectedCoin.value = { ...selectedCoin.value }
  showCoinPicker.value = true
}

// 确认币种选择
const confirmCoinSelection = () => {
  if (tempSelectedCoin.value) {
    selectedCoin.value = { ...tempSelectedCoin.value }
  }
  showCoinPicker.value = false
}

// 设置最大金额
const setMaxAmount = () => {
  transferAmount.value = maxTransferAmount.value
}

// 购买数字货币
const handleBuyCurrency = () => {
  showToast('購買數字貨幣功能開發中')
}

// 确认划转
const handleConfirm = () => {
  if (!transferAmount.value || parseFloat(transferAmount.value) <= 0) {
    showToast('請輸入有效的劃轉數量')
    return
  }
  if (parseFloat(transferAmount.value) > parseFloat(maxTransferAmount.value)) {
    showToast('劃轉數量不能超過最多可轉數量')
    return
  }
  if (fromAccount.value === toAccount.value) {
    showToast('請選擇不同的帳戶')
    return
  }
  showToast('劃轉成功')
  // 这里可以添加实际的划转API调用
}

// 返回
const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.transfer-detail {
  min-height: 100vh;
  background-color: #ffffff;
  padding-bottom: 60px;
}

.content {
  padding: 16px;
}

// 账户选择区域
.account-section {
  margin-bottom: 32px;

  .account-row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    .account-label {
      font-size: 14px;
      color: #323233;
      width: 40px;
      font-weight: 500;
      flex-shrink: 0;
    }

    .select-field {
      flex: 1;
      background-color: #f7f8fa;
      border: none;
      border-radius: 8px;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: background-color 0.2s;

      &:active {
        background-color: #ebedf0;
      }

      .account-name {
        font-size: 16px;
        color: #323233;
        font-weight: 500;
      }

      .arrow-icon {
        font-size: 14px;
        color: #969799;
      }
    }
  }

  .swap-section {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px 0 16px 0;
    height: 40px;

    .dotted-line {
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      border-top: 1px dashed #d4d4d4;
    }

    .swap-btn {
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #000000;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      transition: opacity 0.2s;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      &:active {
        opacity: 0.8;
      }

      .swap-icon {
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: center;
        justify-content: center;

        .swap-bar {
          width: 14px;
          height: 3px;
          background-color: #ffffff;
          border-radius: 2px;
        }
      }
    }
  }
}

// 表单区域
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
    border: 1px solid #ebedf0;
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

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
    }

    .arrow-icon {
      font-size: 16px;
      color: #969799;
    }
  }

  .input-field-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #ebedf0;
    border-radius: 8px;
    padding: 0 16px;
    margin-bottom: 8px;

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

    .all-btn {
      height: 32px;
      padding: 0 16px;
      background-color: transparent;
      border: none;
      font-size: 14px;
      color: #26a17b;
      cursor: pointer;
      font-weight: 500;
      white-space: nowrap;

      &:active {
        opacity: 0.7;
      }
    }
  }

  .max-amount-hint {
    font-size: 12px;
    color: #323233;
    padding-left: 4px;
  }
}

// 购买链接区域
.buy-link-section {
  margin-bottom: 32px;
  text-align: center;

  .buy-link {
    font-size: 14px;
    color: #323233;
    cursor: pointer;
    text-decoration: underline;

    &:active {
      opacity: 0.7;
    }
  }
}

// 提交按钮区域
.submit-section {
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
      .picker-account-name {
        font-size: 16px;
        color: #323233;
      }
    }
  }
}
</style>

