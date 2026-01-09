<template>
  <div class="deposit-select">
    <van-nav-bar
      title="儲值"
      fixed
      placeholder
      left-arrow
      @click-left="goBack"
    />

    <div class="content">
      <div class="coin-list">
        <div
          v-for="coin in coinList"
          :key="coin.id"
          class="coin-item"
          @click="selectCoin(coin)"
        >
          <div class="coin-icon-wrapper">
            <div class="coin-icon" :class="coin.iconClass">
              {{ coin.icon }}
            </div>
          </div>
          <div class="coin-info">
            <div class="coin-name">{{ coin.name }}</div>
          </div>
          <div class="coin-rate">
            <span class="rate-label">匯率</span>
            <span class="rate-value">{{ coin.rate }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 币种列表数据
const coinList = ref([
  {
    id: 1,
    name: "USDT-TRC20",
    icon: "T",
    iconClass: "usdt",
    rate: "1",
    network: "TRC20",
    symbol: "USDT",
  },
  {
    id: 2,
    name: "ETH",
    icon: "Ξ",
    iconClass: "eth",
    rate: "3116.98",
    network: "ERC20",
    symbol: "ETH",
  },
  {
    id: 3,
    name: "BTC",
    icon: "₿",
    iconClass: "btc",
    rate: "91023.63",
    network: "Bitcoin",
    symbol: "BTC",
  },
  {
    id: 4,
    name: "USDT-ERC20",
    icon: "T",
    iconClass: "usdt",
    rate: "1",
    network: "ERC20",
    symbol: "USDT",
  },
  {
    id: 5,
    name: "USDC",
    icon: "$",
    iconClass: "usdc",
    rate: "1.0008",
    network: "ERC20",
    symbol: "USDC",
  },
  {
    id: 6,
    name: "USDT-BEP20",
    icon: "T",
    iconClass: "usdt",
    rate: "1",
    network: "BEP20",
    symbol: "USDT",
  },
]);

// 返回
const goBack = () => {
  router.back();
};

// 选择币种
const selectCoin = (coin) => {
  router.push({
    path: "/deposit-detail",
    query: {
      coin: coin.symbol,
      network: coin.network,
      name: coin.name,
    },
  });
};
</script>

<style lang="scss" scoped>
.deposit-select {
  min-height: 100vh;
  background-color: #ffffff;
  padding-bottom: 60px;
}

.content {
  padding: 0;
}

.coin-list {
  .coin-item {
    display: flex;
    align-items: center;
    padding: 16px 21px;
    border-bottom: 1px solid #ebedf0;
    cursor: pointer;
    transition: background-color 0.2s;

    &:active {
      background-color: #f7f8fa;
    }

    &:last-child {
      border-bottom: none;
    }

    .coin-icon-wrapper {
      margin-right: 12px;
      flex-shrink: 0;

      .coin-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;

        &.usdt {
          background-color: #26a17b;
        }

        &.eth {
          background-color: #627eea;
        }

        &.btc {
          background-color: #f7931a;
        }

        &.usdc {
          background: linear-gradient(135deg, #2775ca 0%, #2775ca 100%);
        }
      }
    }

    .coin-info {
      flex: 1;
      display: flex;
      flex-direction: column;

      .coin-name {
        font-size: 16px;
        color: #040303;
        font-weight: 500;
      }
    }

    .coin-rate {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      flex-shrink: 0;

      .rate-label {
        font-size: 14px;
        color: #2b6d16;
        margin-bottom: 4px;
      }

      .rate-value {
        font-size: 16px;
        color: #040303;
        font-weight: 500;
      }
    }
  }
}
</style>

