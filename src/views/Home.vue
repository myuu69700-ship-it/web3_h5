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
      <!-- 加密货币市场数据 -->
      <div class="market-section">
        <div
          v-for="coin in coins"
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
        <div class="promo-text">{{ t("promoText") }}</div>
        <div class="promo-nft">
          <div class="nft-box">
            <div class="nft-label">NFT</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 浮动聊天按钮 -->
    <div class="chat-fab" @click="openChat">
      <van-icon name="chat-o" />
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

const router = useRouter();
const { t, currentLang, setLanguage } = useI18n();
const showMenu = ref(false);
const showLanguageDialog = ref(false);
const searchValue = ref("");

// 加密货币数据
const coins = ref([
  {
    id: 1,
    name: "USDCoin",
    symbol: "C",
    pair: "USDC / USDT",
    price: "1.0002",
    change: 0,
    color: "#2775CA",
  },
  {
    id: 2,
    name: "Dogecoin",
    symbol: "D",
    pair: "DOGE / USDT",
    price: "0.146288",
    change: 3.2991,
    color: "#CBA134",
  },
  {
    id: 3,
    name: "Filecoin",
    symbol: "f",
    pair: "FIL / USDT",
    price: "1.4959",
    change: -3.1027,
    color: "#0090FF",
  },
  {
    id: 4,
    name: "MakerDAO",
    symbol: "D",
    pair: "DAI / USDT",
    price: "1.0005",
    change: 0.03,
    color: "#F4B731",
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

// 市场数据区域
.market-section {
  margin-top: 16px;

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  border-radius: 12px;

  .promo-text {
    font-size: 32px;
    font-weight: bold;
    color: #4caf50;
  }

  .promo-nft {
    .nft-box {
      width: 80px;
      height: 80px;
      background-color: #fff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transform: perspective(200px) rotateX(15deg) rotateY(-15deg);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

      .nft-label {
        font-size: 18px;
        font-weight: bold;
        color: #4caf50;
      }
    }
  }
}

// 浮动聊天按钮
.chat-fab {
  position: fixed;
  right: 16px;
  bottom: 90px;
  width: 56px;
  height: 56px;
  background-color: #323233;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 99;

  .van-icon {
    color: #fff;
    font-size: 24px;
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
