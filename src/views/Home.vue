<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <div class="top-bar">
      <van-icon name="apps-o" class="menu-icon" @click="showMenu = true" />
      <van-icon
        name="setting-o"
        class="setting-icon"
        @click="showLanguageDialog = true"
      />
    </div>

    <!-- 首页搜索区域 -->
    <div class="search-section">
      <van-search
        class="search-input"
        v-model="searchValue"
        :placeholder="t('searchCoinPair')"
      />

      <!--  banner 区域 -->
      <div class="banner">
        <div class="banner-text">
          <p>{{ t("bannerTitle1") }}</p>
          <p>{{ t("bannerTitle2") }}</p>
        </div>
        <div class="banner-text-2">{{ t("bannerSubtitle") }}</div>
        <van-image :src="homeIcon" />
      </div>

      <!-- 登录 注册  鏈上充幣  快捷買幣-->
      <div class="action-buttons">
        <div class="button-row">
          <button class="action-btn login-btn" @click="handleLogin">
            {{ t("login") }}
          </button>
          <button class="action-btn register-btn" @click="handleRegister">
            {{ t("register") }}
          </button>
        </div>
        <div class="button-row margin-top-32">
          <button class="action-btn deposit-btn" @click="handleDeposit">
            {{ t("deposit") }}
          </button>
          <button class="action-btn buy-btn" @click="handleQuickBuy">
            {{ t("quickBuy") }}
          </button>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 标签栏 -->
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
              @click="goToMarket"
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
              <div
                class="coin-change"
                :class="coin.change >= 0 ? 'up' : 'down'"
              >
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
            @click="goToMarket"
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
            @click="goToMarket"
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
      <!-- 平台通知 -->
      <div class="notifications-section">
        <div class="section-title">{{ t("platformNotifications") }}</div>
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
        >
          <div class="notification-text">{{ t(notification.key) }}</div>
          <div class="notification-time">{{ notification.time }}</div>
        </div>
        <div class="view-more-btn" @click="viewMoreNotifications">
          {{ t("viewMore") }}
        </div>
      </div>

      <!-- 推广横幅 -->
      <div class="promo-banner">
        <div class="promo-content">
          <div class="promo-left">
            <div class="promo-title">{{ t("promoText") }}</div>
            <div class="promo-description">{{ t("promoDescription") }}</div>
            <div class="promo-cta">{{ t("promoCta") }}</div>
            <div class="promo-copyright">{{ t("copyright") }}</div>
          </div>
          <div class="promo-right">
            <img :src="nftIcon" alt="NFT" class="nft-image" />
          </div>
        </div>
      </div>

      <!-- 新增内容区域 -->
      <div class="new-content-section">
        <!-- 描述文本 -->
        <div class="description-text">
          {{ t("cryptoJourneyDescription") }}
        </div>
        
        <!-- 图片 -->
        <div class="zhus-image-wrapper">
          <img :src="zhusImage" alt="zhus" class="zhus-image" />
        </div>
        
        <!-- 版权信息 -->
        <div class="copyright-text">
          {{ t("copyright") }}
        </div>
        
        <!-- 菜单折叠面板 -->
        <div class="menu-section">
          <!-- 交易市場 -->
          <div class="menu-item">
            <div class="menu-header" @click="toggleMenu('tradingMarket')">
              <span class="menu-title">{{ t("tradingMarket") }}</span>
              <span class="menu-toggle">{{ expandedMenus.tradingMarket ? '−' : '+' }}</span>
            </div>
            <div v-if="expandedMenus.tradingMarket" class="menu-content">
              <div class="menu-sub-item">{{ t("spot") }}</div>
              <div class="menu-sub-item">{{ t("perpetual") }}</div>
              <div class="menu-sub-item">{{ t("options") }}</div>
            </div>
          </div>
          
          <!-- 資產管理 -->
          <div class="menu-item">
            <div class="menu-header" @click="toggleMenu('assetManagement')">
              <span class="menu-title">{{ t("assetManagement") }}</span>
              <span class="menu-toggle">{{ expandedMenus.assetManagement ? '−' : '+' }}</span>
            </div>
            <div v-if="expandedMenus.assetManagement" class="menu-content">
              <div class="menu-sub-item">{{ t("myAssets") }}</div>
              <div class="menu-sub-item">{{ t("deposit") }}</div>
              <div class="menu-sub-item">{{ t("withdraw") }}</div>
              <div class="menu-sub-item">{{ t("transfer") }}</div>
              <div class="menu-sub-item">{{ t("orderCenter") }}</div>
            </div>
          </div>
          
          <!-- 金融理財 -->
          <div class="menu-item">
            <div class="menu-header" @click="toggleMenu('financialManagement')">
              <span class="menu-title">{{ t("financialManagement") }}</span>
              <span class="menu-toggle">{{ expandedMenus.financialManagement ? '−' : '+' }}</span>
            </div>
            <div v-if="expandedMenus.financialManagement" class="menu-content">
              <div class="menu-sub-item">{{ t("products") }}</div>
            </div>
          </div>
          
          <!-- 支持 -->
          <div class="menu-item">
            <div class="menu-header" @click="toggleMenu('support')">
              <span class="menu-title">{{ t("support") }}</span>
              <span class="menu-toggle">{{ expandedMenus.support ? '−' : '+' }}</span>
            </div>
            <div v-if="expandedMenus.support" class="menu-content">
              <div class="menu-sub-item">{{ t("newbieTutorial") }}</div>
              <div class="menu-sub-item">{{ t("consultationService") }}: 0</div>
            </div>
          </div>
          
          <!-- 政策 -->
          <div class="menu-item">
            <div class="menu-header" @click="toggleMenu('policies')">
              <span class="menu-title">{{ t("policies") }}</span>
              <span class="menu-toggle">{{ expandedMenus.policies ? '−' : '+' }}</span>
            </div>
            <div v-if="expandedMenus.policies" class="menu-content">
              <div class="menu-sub-item">{{ t("termsOfService") }}</div>
              <div class="menu-sub-item">{{ t("privacyPolicy") }}</div>
              <div class="menu-sub-item">{{ t("antiMoneyLaundering") }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 浮动聊天按钮 -->
    <div class="chat-fab" @click="openChat">
      <img :src="chartIcon" alt="chart" />
    </div>

    <!-- 菜单抽屉 -->
    <van-popup
      v-model:show="showMenu"
      position="left"
      :style="{ width: '70%', height: '100%' }"
    >
      <div class="menu-content">
        <div class="menu-header">{{ t("menu") }}</div>
        <van-cell-group>
          <van-cell :title="t('settings')" is-link />
          <van-cell :title="t('help')" is-link />
          <van-cell :title="t('about')" is-link @click="goToAbout" />
        </van-cell-group>
      </div>
    </van-popup>

    <!-- 语言选择对话框 -->
    <van-popup
      v-model:show="showLanguageDialog"
      position="right"
      :style="{ width: '100%', height: '100%', overflow: 'visible' }"
      class="language-popup"
    >
      <div class="language-dialog">
        <div class="dialog-header">
          <van-icon
            name="arrow-left"
            class="back-icon"
            @click="showLanguageDialog = false"
          />
          <div class="dialog-title">{{ currentLangName }}</div>
        </div>
        <div class="dialog-content">
          <van-cell-group inset>
            <van-cell
              v-for="lang in languages"
              :key="lang.code"
              :title="lang.name"
              @click="selectLanguage(lang.code)"
            >
              <template #icon>
                <img :src="lang.flag" class="flag-icon" alt="" />
              </template>
              <template #right-icon>
                <van-icon
                  v-if="currentLang === lang.code"
                  name="success"
                  color="#1989fa"
                />
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n, languages } from "@/i18n";
import homeIcon from "@/assets/images/homeIcon.gif";
import chartIcon from "@/assets/images/chart.png";
import nomoreIcon from "@/assets/images/nomore.png";
import nftIcon from "@/assets/images/nft.png";
import zhusImage from "@/assets/images/zhus.png";

const router = useRouter();
const { t, currentLang, setLanguage } = useI18n();
const showMenu = ref(false);
const showLanguageDialog = ref(false);
const searchValue = ref("");
const activeTab = ref("favorites"); // 默认显示自選

// 菜单展开状态
const expandedMenus = ref({
  tradingMarket: false,
  assetManagement: false,
  financialManagement: false,
  support: false,
  policies: false
});

// 切换菜单展开/折叠
const toggleMenu = (menuName) => {
  expandedMenus.value[menuName] = !expandedMenus.value[menuName];
};

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

// 通知数据
const notifications = ref([
  {
    id: 1,
    key: "exchangeUpdateNotification",
    time: "2025/05/15 15:12:07",
  },
  {
    id: 2,
    key: "exchangeLendingUpdate",
    time: "2024/10/13 00:00:00",
  },
  {
    id: 3,
    key: "virtualReservationActivity",
    time: "2024/08/31 10:00:00",
  },
]);

const currentLangName = computed(() => {
  const lang = languages.find((l) => l.code === currentLang.value);
  return (
    lang?.name || languages.find((l) => l.code === "zh-TW")?.name || "繁體中文"
  );
});

const selectLanguage = (code) => {
  setLanguage(code);
  showLanguageDialog.value = false;
};

const goToMarket = () => {
  router.push("/market");
};

const viewMoreNotifications = () => {
  // 可以跳转到通知详情页
  console.log("查看更多通知");
};

const openChat = () => {
  // 打开聊天窗口
  console.log("打开聊天");
};

const goToAbout = () => {
  showMenu.value = false;
  router.push("/about");
};

const handleLogin = () => {
  router.push("/login");
};

const handleRegister = () => {
  // 处理注册逻辑
  console.log("注册");
};

const handleDeposit = () => {
  // 处理鏈上充幣逻辑
  console.log("鏈上充幣");
};

const handleQuickBuy = () => {
  // 处理快捷買幣逻辑
  console.log("快捷買幣");
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 80px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;

  .menu-icon,
  .setting-icon {
    font-size: 24px;
    color: #323233;
    cursor: pointer;
  }
}

.content {
  padding: 0 16px;
}

.search-section {
  .search-input {
    :deep(.van-search__content) {
      border-radius: 5.06667vw;
    }
  }

  .banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .banner-text {
      color: var(--primary-bg);
      font-size: 9.06667vw;
      line-height: 10.66667vw;
      font-weight: 600;
      text-align: center;
      margin-top: 8vw;
      font-weight: 700;
    }
    .banner-text-2 {
      color: var(--primary-bg);
      font-size: 3.2vw;
      margin-top: 4.26667vw;
      text-align: center;
      margin: 16.64px 0;
    }

    :deep(.van-image) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 100%;
      margin-top: 16px;

      img {
        width: 100%;
        max-width: 100%;
        height: auto;
        object-fit: contain;
      }
    }
  }

  .action-buttons {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .button-row {
      display: flex;
      gap: 12px;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 100%;
      // margin-bottom: 12px;

      &:last-child {
        margin-bottom: 0;
      }

      &.margin-top-16 {
        margin-top: 16px;
      }
    }

    .action-btn {
      height: 48px;
      border-radius: 12px;
      border: none;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 0.2s;

      &:active {
        opacity: 0.8;
      }

      &.login-btn {
        background-color: #e7ffb1;
        color: #2b6d16;
        width: 169px;
        height: 10.13333vw;
        border-radius: 5.06667vw;
        font-size: 3.2vw;
        cursor: pointer;
        border: none;
      }

      &.register-btn {
        background-color: #2b6d16;
        color: #fff;
        width: 169px;
        height: 10.13333vw;
        border-radius: 5.06667vw;
        font-size: 3.2vw;
        cursor: pointer;
        border: none;
      }

      &.deposit-btn {
        background-color: #2b6d16;
        color: #fff;
        width: 169px;
        height: 10.13333vw;
        border-radius: 5.06667vw;
        font-size: 3.2vw;
        cursor: pointer;
        border: none;
      }

      &.buy-btn {
        background-color: #2b6d16;
        color: #fff;
        width: 169px;
        height: 10.13333vw;
        border-radius: 5.06667vw;
        font-size: 3.2vw;
        cursor: pointer;
        border: none;
      }
    }
  }
}

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
      margin:0 4px;
      font-size: 14px;
      color: #5b616e;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
      

      &.active {
        background-color: #f3f3f3;
        color: #040303;
        font-weight: 500;
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
      padding: 60px 20px;
      text-align: center;

      .no-data-icon {
        width: 120px;
        height: 120px;
        margin-bottom: 16px;
        opacity: 0.6;
      }

      .no-data-text {
        font-size: 14px;
        color: #969799;
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
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;

      .coin-symbol {
        color: #fff;
        font-weight: bold;
        font-size: 18px;
      }
    }

    .coin-info {
      flex: 1;

      .coin-name {
        font-size: 16px;
        font-weight: 500;
        color: #323233;
        margin-bottom: 4px;
      }

      .coin-pair {
        font-size: 12px;
        color: #969799;
      }
    }

    .coin-price {
      text-align: right;
      margin-right: 12px;

      .price-value {
        font-size: 16px;
        font-weight: 500;
        color: #323233;
        margin-bottom: 4px;
      }

      .price-usd {
        font-size: 12px;
        color: #969799;
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
        background-color: #e8f5e9;
        color: #07c160;
      }

      &.down {
        background-color: #ffebee;
        color: #ee0a24;
      }
    }
  }

  .view-more-btn {
    text-align: center;
    padding: 12px;
    margin-top: 8px;
    background-color: #f7f8fa;
    border-radius: 8px;
    color: #969799;
    font-size: 14px;
    cursor: pointer;
  }
}

// 通知区域
.notifications-section {
  margin-top: 24px;

  .section-title {
    font-size: 18px;
    font-weight: bold;
    color: #323233;
    margin-bottom: 16px;
  }

  .notification-item {
    padding: 12px 0;
    border-bottom: 1px solid #ebedf0;

    .notification-text {
      font-size: 14px;
      color: #323233;
      margin-bottom: 4px;
    }

    .notification-time {
      font-size: 12px;
      color: #969799;
    }
  }

  .view-more-btn {
    text-align: center;
    padding: 12px;
    margin-top: 8px;
    background-color: #f7f8fa;
    border-radius: 8px;
    color: #969799;
    font-size: 14px;
    cursor: pointer;
  }
}

// 推广横幅
.promo-banner {
  margin-top: 24px;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  position: relative;
  overflow: hidden;

  .promo-content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    position: relative;
  }

  .promo-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .promo-title {
    font-size: 32px;
    font-weight: bold;
    color: #4caf50;
    line-height: 1.2;
  }

  .promo-description {
    font-size: 14px;
    color: #323233;
    line-height: 1.5;
    margin-top: 8px;
  }

  .promo-cta {
    font-size: 14px;
    color: #4caf50;
    font-weight: 500;
    margin-top: 8px;
    cursor: pointer;
  }

  .promo-copyright {
    font-size: 12px;
    color: #969799;
    margin-top: 8px;
  }

  .promo-right {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nft-image {
    width: 120px;
    height: 120px;
    object-fit: contain;
  }
}

// 新增内容区域
.new-content-section {
  margin-top: 24px;
  background-color: #fff;

  .description-text {
    font-size: 14px;
    color: #323233;
    line-height: 1.6;
    text-align: center;
    margin-bottom: 24px;
    padding: 0 16px;
  }

  .zhus-image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
    width: 100%;

    .zhus-image {
      width: 100%;
      max-width: 100%;
      height: auto;
      object-fit: contain;
    }
  }

  .copyright-text {
    font-size: 12px;
    color: #969799;
    text-align: center;
    margin-bottom: 24px;
  }

  .menu-section {
    margin-top: 16px;

    .menu-item {
      border-bottom: 1px solid #ebedf0;

      &:last-child {
        border-bottom: none;
      }

      .menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        cursor: pointer;
        user-select: none;

        .menu-title {
          font-size: 16px;
          font-weight: 500;
          color: #323233;
        }

        .menu-toggle {
          font-size: 20px;
          color: #323233;
          font-weight: 300;
          line-height: 1;
        }
      }

      .menu-content {
        padding: 0 16px 16px 16px;

        .menu-sub-item {
          padding: 12px 0;
          font-size: 14px;
          color: #323233;
          border-bottom: 1px solid #ebedf0;

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
}

// 浮动聊天按钮
.chat-fab {
  position: fixed;
  right: 16px;
  bottom: 90px;
  width: 48.67px;
  height: 48.67px;
  background-color: #323233;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 99;

  img {
    width: 48.67px;
    height: 48.67px;
    object-fit: contain;
    border-radius: 50%;
  }
}

// 菜单内容
.menu-content {
  padding: 20px;

  .menu-header {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
}

// 语言选择对话框
.language-popup {
  overflow: visible !important;

  :deep(.van-popup) {
    overflow: visible !important;
  }

  :deep(.van-popup__content) {
    overflow: visible !important;
    animation: slideInFromRight 0.3s ease-out;
    will-change: transform;
  }
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.language-dialog {
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f7f8fa;
  position: relative;
  overflow: visible;

  .dialog-header {
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: #fff;
    border-bottom: 1px solid #ebedf0;
    position: relative;
    z-index: 1;
    flex-shrink: 0;

    .back-icon {
      font-size: 20px;
      color: #323233;
      cursor: pointer;
      margin-right: 12px;
    }

    .dialog-title {
      font-size: 18px;
      font-weight: bold;
      color: #323233;
      display: inline-block;
      width: 100%;
      text-align: center;
    }
  }

  .dialog-content {
    flex: 1;
    overflow-y: auto;
    padding: 0;
    position: relative;
    z-index: 1;
    background-color: #fff;

    :deep(.van-cell-group) {
      margin: 0;
    }

    :deep(.van-cell) {
      padding: 12px 16px;
      border-bottom: 1px solid #ebedf0;
    }

    :deep(.van-cell:last-child) {
      border-bottom: none;
    }

    .flag-icon {
      width: 24px;
      height: 18px;
      margin-right: 12px;
      display: inline-block;
      object-fit: cover;
      border-radius: 2px;
      flex-shrink: 0;
    }
  }
}
</style>
