<template>
  <div class="add-address">
    <van-nav-bar
      title="新增地址"
      left-arrow
      @click-left="goBack"
      fixed
      placeholder
    />

    <div class="content">
      <!-- 币种选择 -->
      <div class="form-section">
        <div class="form-label">幣種</div>
        <div class="select-field" @click="showCurrencyPicker = true">
          <div class="select-content">
            <div class="coin-icon-wrapper">
              <div class="coin-icon" :class="selectedCurrency.iconClass">
                {{ selectedCurrency.icon }}
              </div>
            </div>
            <span class="select-text">{{ selectedCurrency.name }}</span>
          </div>
          <van-icon name="arrow-down" class="arrow-icon" />
        </div>
      </div>

      <!-- 转帐网络选择 -->
      <div class="form-section">
        <div class="form-label">轉帳網絡</div>
        <div class="select-field" @click="showNetworkPicker = true">
          <div class="select-content">
            <span class="select-text">{{ selectedNetwork }}</span>
          </div>
          <van-icon name="arrow-down" class="arrow-icon" />
        </div>
      </div>

      <!-- 提币地址输入 -->
      <div class="form-section">
        <div class="form-label">提幣地址:</div>
        <van-field
          v-model="addressValue"
          placeholder="請輸入提幣地址"
          class="address-input"
        />
      </div>

      <!-- 备注输入 -->
      <div class="form-section">
        <div class="form-label">備註</div>
        <van-field
          v-model="remarkValue"
          placeholder="備註"
          class="remark-input"
        />
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

    <!-- 币种选择器 -->
    <van-popup
      v-model:show="showCurrencyPicker"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        :columns="currencyOptions"
        @confirm="onCurrencyConfirm"
        @cancel="showCurrencyPicker = false"
      />
    </van-popup>

    <!-- 网络选择器 -->
    <van-popup
      v-model:show="showNetworkPicker"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        :columns="networkOptions"
        @confirm="onNetworkConfirm"
        @cancel="showNetworkPicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const addressValue = ref('')
const remarkValue = ref('')
const showCurrencyPicker = ref(false)
const showNetworkPicker = ref(false)

// 币种选项
const currencyOptions = [
  { text: 'USDT', value: 'USDT' },
  { text: 'BTC', value: 'BTC' },
  { text: 'ETH', value: 'ETH' },
]

// 当前选中的币种
const selectedCurrency = ref({
  name: 'USDT',
  value: 'USDT',
  icon: 'T',
  iconClass: 'usdt',
})

// 网络选项
const networkOptions = [
  { text: 'TRC20', value: 'TRC20' },
  { text: 'ERC20', value: 'ERC20' },
  { text: 'BEP20', value: 'BEP20' },
]

const selectedNetwork = ref('TRC20')

const onCurrencyConfirm = ({ selectedOptions }) => {
  const option = selectedOptions[0]
  selectedCurrency.value = {
    name: option.text,
    value: option.value,
    icon: option.value === 'USDT' ? 'T' : option.value === 'BTC' ? '₿' : 'Ξ',
    iconClass:
      option.value === 'USDT'
        ? 'usdt'
        : option.value === 'BTC'
        ? 'btc'
        : 'eth',
  }
  showCurrencyPicker.value = false
}

const onNetworkConfirm = ({ selectedOptions }) => {
  selectedNetwork.value = selectedOptions[0].text
  showNetworkPicker.value = false
}

const goBack = () => {
  router.back()
}

const handleSubmit = () => {
  // 提交逻辑
  console.log('提交地址', {
    currency: selectedCurrency.value,
    network: selectedNetwork.value,
    address: addressValue.value,
    remark: remarkValue.value,
  })
  // 可以添加表单验证
  // 成功后返回上一页
  router.back()
}
</script>

<style lang="scss" scoped>
.add-address {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding-bottom: 20px;
}

.content {
  padding: 16px;
}

.form-section {
  margin-bottom: 24px;

  .form-label {
    font-size: 16px;
    color: #323233;
    margin-bottom: 12px;
    font-weight: 500;
  }

  .select-field {
    background-color: #fff;
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    .select-content {
      display: flex;
      align-items: center;
      flex: 1;

      .coin-icon-wrapper {
        margin-right: 8px;
        flex-shrink: 0;

        .coin-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          color: #fff;

          &.usdt {
            background-color: #26a17b;
          }

          &.btc {
            background-color: #f7931a;
          }

          &.eth {
            background-color: #627eea;
          }
        }
      }

      .select-text {
        font-size: 16px;
        color: #323233;
      }
    }

    .arrow-icon {
      font-size: 16px;
      color: #969799;
      flex-shrink: 0;
    }
  }

  :deep(.van-field) {
    background-color: #fff;
    border-radius: 8px;
    padding: 12px 16px;

    .van-field__control {
      font-size: 16px;
      color: #323233;
    }
  }
}

.submit-section {
  margin-top: 32px;

  .submit-btn {
    background-color: #323233;
    border: none;
    border-radius: 8px;
    height: 48px;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>

