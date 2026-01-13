<template>
  <div class="tabs-section">
    <div class="tabs-header">
      <div class="tab-item" :class="{ active: activeTab === 'favorites' }" @click="activeTab = 'favorites'">
        {{ t("favorites") }}
      </div>
      <div class="tab-item" :class="{ active: activeTab === 'hotList' }" @click="activeTab = 'hotList'">
        {{ t("hotList") }}
      </div>
      <div class="tab-item" :class="{ active: activeTab === 'forex' }" @click="activeTab = 'forex'">
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
        <div v-for="coin in favoriteCoins" :key="coin.id" class="coin-item" @click="goToDetail(coin)">
          <div class="coin-icon" :style="{ backgroundColor: coin.color }">
            <span class="coin-symbol">{{ coin.symbol.charAt(0) }}</span>
          </div>
          <div class="coin-info">
            <span class="coin-symbol-text">{{ coin.symbol }}</span>
            <span class="coin-name">{{ coin.name }}</span>
          </div>
          <div class="coin-price">
            ${{ coin.price }}
          </div>
          <div class="coin-change" :class="coin.change >= 0 ? 'up' : 'down'">
            {{ coin.change >= 0 ? "+" : "" }}{{ coin.change }}%
          </div>
        </div>
      </div>
      <div class="view-more-btn" @click="goToMarket">
        {{ t("viewMoreTokens") }} >
      </div>
    </div>

    <!-- 熱門榜 -->
    <div v-if="activeTab === 'hotList'" class="tab-content">
      <div v-for="coin in hotListCoins" :key="coin.id" class="coin-item" @click="goToDetail(coin)">
        <div class="coin-icon" :style="{ backgroundColor: coin.color }">
          <span class="coin-symbol">{{ coin.symbol.charAt(0) }}</span>
        </div>
        <div class="coin-info">
          <span class="coin-symbol-text">{{ coin.symbol }}</span>
          <span class="coin-name">{{ coin.name }}</span>
        </div>
        <div class="coin-price2">
          ${{ coin.price }}
        </div>
        <div class="coin-change" :class="coin.change >= 0 ? 'up' : 'down'">
          {{ coin.change >= 0 ? "+" : "" }}{{ coin.change }}%
        </div>
      </div>
      <div class="view-more-btn" @click="goToMarket">
        {{ t("viewMoreTokens") }} >
      </div>
    </div>

    <!-- 外匯 -->
    <div v-if="activeTab === 'forex'" class="tab-content">
      <div v-for="pair in forexPairs" :key="pair.id" class="coin-item" @click="goToDetail(pair)">
        <div class="coin-icon" :style="{ backgroundColor: pair.color }">
          <span class="coin-symbol">{{ pair.symbol }}</span>
        </div>
        <div class="coin-info">
          <span class="coin-symbol-text">{{ pair.pair }}</span>
          <span class="coin-name">{{ pair.name }}</span>
        </div>
        <div class="coin-price2">
          {{ pair.price }}
        </div>
        <div class="coin-change" :class="pair.change >= 0 ? 'up' : 'down'">
          {{ pair.change >= 0 ? "+" : "" }}{{ pair.change }}%
        </div>
      </div>
      <div class="view-more-btn" @click="goToMarket">
        {{ t("viewMoreTokens") }} >
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
const activeTab = ref("favorites"); // 默认显示自選

// 自選数据（空数组，显示暂无数据）
const favoriteCoins = ref([]);

// 热门榜数据（根据图片中的币种）
const hotListCoins = ref([
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    pair: "BTC/USDT",
    price: "91,017.00",
    change: 0.53,
    color: "#F7931A",
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    pair: "ETH/USDT",
    price: "3,118.32",
    change: -0.42,
    color: "#627EEA",
  },
  {
    id: 3,
    name: "ATOM",
    symbol: "ATOM",
    pair: "ATOM/USDT",
    price: "2.4374",
    change: 0.544,
    color: "#2E3148",
  },
  {
    id: 4,
    name: "Ripple",
    symbol: "XRP",
    pair: "XRP/USDT",
    price: "2.1324",
    change: 0.013,
    color: "#000000",
  },
  {
    id: 5,
    name: "Ltc",
    symbol: "LTC",
    pair: "LTC/USDT",
    price: "81.68",
    change: 0.393,
    color: "#BFBBBB",
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
    background-color: transparent;
    justify-content: center;
    // margin-bottom: 16px;
    gap: 0;

    .tab-item {
      // flex: 1;
      text-align: center;
      font-family: PingFang SC;
      font-weight: 500;
      font-style: Medium;
      font-size: 24px;
      line-height: 100%;
      letter-spacing: 0%;
      color: #8E8E92;
      padding: 68px 33px 59px;

      &.active {
        background-color: transparent;
        color: #ffffff;
        font-size: 3.2vw;
        font-weight: 600;
        border-radius: 26.4vw;
      }

      &:not(.active) {
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  .tab-content {
    padding: 0 32px;

    .no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // padding: 20px;
      text-align: center;

      .no-data-icon {
        width: 24.26667vw;
        height: 24.26667vw;
        // margin-bottom: 16px;
      }

      .no-data-text {
        font-weight: 700;
        color: #ffffff;
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
    padding: 16px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    gap: 13px;

    .coin-icon {
      flex: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      .coin-symbol {
        color: #fff;
        font-weight: bold;
        font-size: 20px;
      }
    }

    .coin-info {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;

      .coin-symbol-text {
        font-family: Inter;
        font-weight: 500;
        font-style: Medium;
        font-size: 26px;
        line-height: 100%;
        letter-spacing: 0%;
        COLOR: #F5F5F5;
      }

      .coin-name {
        font-size: 16px;
        font-weight: 400;
        color: #ffffff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .coin-price {
      font-family: Inter;
      font-weight: 400;
      font-style: Regular;
      font-size: 18px;
      line-height: 100%;
      letter-spacing: 0%;
      color: #818181;
    }

    .coin-price2 {
      font-family: Inter;
      font-weight: 500;
      font-style: Medium;
      font-size: 26px;
      line-height: 100%;
      letter-spacing: 0%;
      color: #F5F5F5;
      padding-right: 68px;

    }

    .coin-change {
      flex: none;
      white-space: nowrap;
      min-width: 80px;
      font-family: Inter;
      font-weight: 500;
      font-style: Medium;
      font-size: 26px;
      line-height: 100%;
      letter-spacing: 0%;
      text-align: right;
      &.up {
        color: #1df388;
      }

      &.down {
        color: #ff4d4f;
      }
    }
  }

  .view-more-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.53333vw;
    background-color: transparent;
    width: 100%;
    height: 9.6vw;
    margin: 4vw auto;
    border-radius: 6.4vw;
    color: #ffffff;
    font-size: 3.46667vw;
    cursor: pointer;
    text-align: center;
  }
}
</style>
