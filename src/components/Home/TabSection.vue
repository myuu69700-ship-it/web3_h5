<template>
  <div class="tabs-section">
    <div class="tabs-header">
      <div
        class="tab-item"
        :class="{ active: activeTab === 'favorites' }"
        @click="activeTab = 'favorites'"
      >
        {{ t("favorites") }}
      </div>
      <div
        class="tab-item"
        :class="{ active: activeTab === 'cryptocurrency' }"
        @click="activeTab = 'cryptocurrency'"
      >
        {{ t("cryptocurrency") }}
      </div>
      <div
        class="tab-item"
        :class="{ active: activeTab === 'forex' }"
        @click="activeTab = 'forex'"
      >
        {{ t("forex") }}
      </div>
    </div>

    <!-- 自選 -->
    <div v-if="activeTab === 'favorites'" class="tab-content">
      <div v-if="favoriteCoins.length === 0" class="no-data">
        <img :src="nomoreIcon" alt="no data" class="no-data-icon" />
        <div class="no-data-text">{{ t("noData") }}</div>
      </div>
      <div v-else>
        <div
          v-for="coin in favoriteCoins"
          :key="coin.id"
          class="coin-item"
          @click="goToDetail(coin)"
        >
          <div class="coin-icon" :style="{ backgroundColor: coin.color }">
            <span class="coin-symbol">{{ coin.symbol }}</span>
          </div>
          <div class="coin-info">
            <div class="coin-name">{{ coin.name }}</div>
            <div class="coin-pair">{{ coin.pair }}</div>
          </div>
          <div class="coin-price">
            <div class="price-value">{{ coin.price }}</div>
            <div class="price-usd">${{ coin.price }}</div>
          </div>
          <div class="coin-change" :class="coin.change >= 0 ? 'up' : 'down'">
            {{ coin.change >= 0 ? "+" : "" }}{{ coin.change }}%
          </div>
        </div>
      </div>
      <div class="view-more-btn" @click="goToMarket">
        {{ t("viewMore") }}
      </div>
    </div>

    <!-- 加密貨幣 -->
    <div v-if="activeTab === 'cryptocurrency'" class="tab-content">
      <div
        v-for="coin in cryptocurrencyCoins"
        :key="coin.id"
        class="coin-item"
        @click="goToDetail(coin)"
      >
        <div class="coin-icon" :style="{ backgroundColor: coin.color }">
          <span class="coin-symbol">{{ coin.symbol }}</span>
        </div>
        <div class="coin-info">
          <div class="coin-name">{{ coin.name }}</div>
          <div class="coin-pair">{{ coin.pair }}</div>
        </div>
        <div class="coin-price">
          <div class="price-value">{{ coin.price }}</div>
          <div class="price-usd">${{ coin.price }}</div>
        </div>
        <div class="coin-change" :class="coin.change >= 0 ? 'up' : 'down'">
          {{ coin.change >= 0 ? "+" : "" }}{{ coin.change }}%
        </div>
      </div>
      <div class="view-more-btn" @click="goToMarket">
        {{ t("viewMore") }}
      </div>
    </div>

    <!-- 外匯 -->
    <div v-if="activeTab === 'forex'" class="tab-content">
      <div
        v-for="pair in forexPairs"
        :key="pair.id"
        class="coin-item"
        @click="goToDetail(pair)"
      >
        <div class="coin-icon" :style="{ backgroundColor: pair.color }">
          <span class="coin-symbol">{{ pair.symbol }}</span>
        </div>
        <div class="coin-info">
          <div class="coin-name">{{ pair.name }}</div>
          <div class="coin-pair">{{ pair.pair }}</div>
        </div>
        <div class="coin-price">
          <div class="price-value">{{ pair.price }}</div>
          <div class="price-usd">${{ pair.price }}</div>
        </div>
        <div class="coin-change" :class="pair.change >= 0 ? 'up' : 'down'">
          {{ pair.change >= 0 ? "+" : "" }}{{ pair.change }}%
        </div>
      </div>
      <div class="view-more-btn" @click="goToMarket">
        {{ t("viewMore") }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "@/i18n";
import nomoreIcon from "@/assets/images/nomore.png";

const router = useRouter();
const { t } = useI18n();
const activeTab = ref("cryptocurrency"); // 默认显示自選

// 自選数据（空数组，显示暂无数据）
const favoriteCoins = ref([]);

// 加密货币数据
const cryptocurrencyCoins = ref([
  {
    id: 1,
    name: "Bitcoin",
    symbol: "B",
    pair: "BTC/USDT",
    price: "92,905.73",
    change: 1.9878,
    color: "#F7931A",
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "E",
    pair: "ETH/USDT",
    price: "3,182.61",
    change: 1.1287,
    color: "#627EEA",
  },
  {
    id: 3,
    name: "ATOM",
    symbol: "A",
    pair: "ATOM/USDT",
    price: "2.351",
    change: 5.2844,
    color: "#2E3148",
  },
  {
    id: 4,
    name: "Bitcoin Cash",
    symbol: "B",
    pair: "BCH/USDT",
    price: "653.56",
    change: 1.5097,
    color: "#0AC18E",
  },
  {
    id: 5,
    name: "Ripple",
    symbol: "X",
    pair: "XRP/USDT",
    price: "2.13104",
    change: 4.6212,
    color: "#000000",
  },
  {
    id: 6,
    name: "LTC",
    symbol: "Ł",
    pair: "LTC/USDT",
    price: "83.12",
    change: 1.1315,
    color: "#BFBBBB",
  },
  {
    id: 7,
    name: "USDCoin",
    symbol: "C",
    pair: "USDC/USDT",
    price: "1.0002",
    change: -0.01,
    color: "#2775CA",
  },
  {
    id: 8,
    name: "Dogecoin",
    symbol: "D",
    pair: "DOGE/USDT",
    price: "0.151344",
    change: 3.8495,
    color: "#CBA134",
  },
  {
    id: 9,
    name: "Filecoin",
    symbol: "f",
    pair: "FIL/USDT",
    price: "1.5136",
    change: 0.6919,
    color: "#0090FF",
  },
  {
    id: 10,
    name: "MakerDAO",
    symbol: "D",
    pair: "DAI/USDT",
    price: "1.0002",
    change: 0,
    color: "#F4B731",
  },
]);

// 外汇数据
const forexPairs = ref([
  {
    id: 1,
    name: "XAUUSD",
    symbol: "Au",
    pair: "XAUUSD",
    price: "4,396.7",
    change: 1.63,
    color: "#FFD700",
  },
  {
    id: 2,
    name: "XAGUSD",
    symbol: "Ag",
    pair: "XAGUSD",
    price: "75.812",
    change: 4.28,
    color: "#C0C0C0",
  },
  {
    id: 3,
    name: "EURUSD",
    symbol: "€",
    pair: "EURUSD",
    price: "1.17024",
    change: -0.14,
    color: "#003399",
  },
  {
    id: 4,
    name: "GBPUSD",
    symbol: "£",
    pair: "GBPUSD",
    price: "1.34434",
    change: -0.12,
    color: "#012169",
  },
  {
    id: 5,
    name: "USDCHF",
    symbol: "$",
    pair: "USDCHF",
    price: "0.79276",
    change: 0.04,
    color: "#ED2939",
  },
  {
    id: 6,
    name: "USDJPY",
    symbol: "$",
    pair: "USDJPY",
    price: "157.141",
    change: 0.18,
    color: "#ED2939",
  },
  {
    id: 7,
    name: "USDCNH",
    symbol: "$",
    pair: "USDCNH",
    price: "6.97422",
    change: 0.07,
    color: "#ED2939",
  },
  {
    id: 8,
    name: "AUDUSD",
    symbol: "$",
    pair: "AUDUSD",
    price: "0.66809",
    change: -0.23,
    color: "#012169",
  },
  {
    id: 9,
    name: "NZDUSD",
    symbol: "$",
    pair: "NZDUSD",
    price: "0.57535",
    change: -0.29,
    color: "#012169",
  },
  {
    id: 10,
    name: "USDCAD",
    symbol: "$",
    pair: "USDCAD",
    price: "1.37454",
    change: 0.11,
    color: "#ED2939",
  },
]);

const goToDetail = (coin) => {
  // 使用 coin.pair 如果存在，否则构造 pair
  const pair = coin.pair || `${coin.symbol}/USDT`;
  router.push(`/coin/${encodeURIComponent(pair)}`);
};

const goToMarket = () => {
  router.push("/market");
};
</script>

<style lang="scss" scoped>
// 标签栏区域
.tabs-section {
  margin-top: 16px;

  .tabs-header {
    display: flex;
    background-color: #fff;
    margin-bottom: 16px;
    gap: 0;

    .tab-item {
      // flex: 1;
      text-align: center;
      padding: 1.06667vw 2.13333vw;
      margin: 0 4px;
      font-size: 14px;
      color: #5b616e;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
      font-size: 3.2vw;

      &.active {
        background-color: #f3f3f3;
        color: #040303;
        font-size: 3.2vw;
        // font-weight: 500;
        border-radius: 26.4vw;
      }

      &:not(.active) {
        color: #5b616e;
      }
    }
  }

  .tab-content {
    .no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      text-align: center;

      .no-data-icon {
        width: 24.26667vw;
        height: 24.26667vw;
        // margin-bottom: 16px;
      }

      .no-data-text {
        font-weight: 700;
        color: #040303;
        font-size: 3.73333vw;
        height: 8vw;
        line-height: 8vw;
        text-align: center;
        width: 53.33333vw;
      }
    }
  }

  .coin-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #ebedf0;
    cursor: pointer;

    .coin-icon {
      flex: none;
      width: 6.66667vw;
      height: 6.66667vw;
      margin-right: 1.86667vw;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      .coin-symbol {
        color: #fff;
        font-weight: bold;
        font-size: 18px;
      }
    }

    .coin-info {
      flex: 1;

      .coin-name {
        font-size: 3.73333vw;
        font-weight: bolder;
        color: #040303;
        margin-bottom: 4px;
      }

      .coin-pair {
        font-size: 3.2vw;
        color: #5b616e;
      }
    }

    .coin-price {
      text-align: right;
      margin-right: 12px;

      .price-value {
        font-size: 3.73333vw;
        font-weight: 500;
        color: #040303;
        margin-bottom: 4px;
        font-weight: bolder;
      }

      .price-usd {
        font-size: 3.2vw;
        color: #5b616e;
      }
    }

    .coin-change {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      min-width: 60px;
      text-align: center;

      &.up {
        background-color: #ec4b6d;
        font-size: 3.73333vw;
        color: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 1.06667vw;
        border-radius: 1.06667vw;
        width: 21.33333vw;
        height: 8vw;
      }

      &.down {
        background-color: #07c160;
        font-size: 3.73333vw;
        color: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 1.06667vw;
        border-radius: 1.06667vw;
        width: 21.33333vw;
        height: 8vw;
      }
    }
  }

  .view-more-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.53333vw;
    background-color: #f3f3f3;
    width: 100%;
    height: 9.6vw;
    margin: 4vw auto;
    border-radius: 6.4vw;
    color: #040303;
    font-size: 3.46667vw;
    cursor: pointer;
  }
}
</style>
