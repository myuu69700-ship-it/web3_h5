<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <div class="top-bar" :class="{ 'animate-in': isInitialized }" ref="topBarRef">
      <img :src="galleryViewIcon" class="menu-icon" @click="showMenu = true" alt="" />
      <div class="top-right-icons">
        <img :src="searchIcon" class="search-icon" @click="showSearchModal = true" alt="" />
        <img :src="kefuIcon" class="kefu-icon" @click="openChat" alt="" />
      </div>
    </div>

    <!-- Hero 区域 -->
    <div class="hero-section" :class="{ 'animate-in': isInitialized }" ref="heroSectionRef">
      <!-- 主标题 -->
      <div class="hero-title">
        {{ t("bannerTitle1") }} {{ t("bannerTitle2") }}
      </div>

      <!-- 中央插图 -->
      <div class="hero-image-wrapper">
        <img :src="homeIcon" alt="Web3" class="hero-image" />
      </div>

      <!-- 副标题 -->
      <div class="hero-subtitle">
        {{ t("bannerSubtitle") }}
        <span class="usdt-highlight">{{ t("getUSDTGift") }}</span>
      </div>

      <!-- 登录注册按钮 -->
      <div class="auth-buttons">
        <button class="auth-btn login-btn" @click="handleLogin">
          {{ t("login") }}
        </button>
        <button class="auth-btn register-btn" @click="handleRegister">
          {{ t("register") }}
        </button>
      </div>
    </div>

    <!-- 钱包登录区域 -->
    <div class="wallet-login-section" :class="{ 'animate-in': isInitialized }">
      <div class="wallet-login-title">{{ t("walletLoginTitle") }}</div>
      <div class="wallet-icons">
        <div v-for="wallet in wallets" :key="wallet.id" class="wallet-icon-item" @click="handleWalletLogin(wallet)">
          <img :src="wallet.icon" :alt="wallet.name" class="wallet-icon" />
        </div>
      </div>
    </div>

    <!-- 活动公告横幅 -->
    <div class="activity-banner" :class="{ 'animate-in': isInitialized }">
      <img :src="speakerIcon" alt="speaker" class="speaker-icon" />
      <div class="activity-text-wrapper">
        <div class="activity-text">{{ t("web3UserReturnActivity") }}</div>
      </div>
    </div>

    <!-- 操作卡片区域 -->
    <div class="action-cards" :class="{ 'animate-in': isInitialized }">
      <div class="action-card" @click="handleOnChainDeposit">
        <div class="card-content">
          <div class="card-title">{{ t("onChainDeposit") }}</div>
          <div class="card-subtitle">{{ t("onChainDepositSubtitle") }}</div>
        </div>
        <div class="card-illustration">
          <img :src="safeIcon" alt="safe" class="safe-image" />
        </div>
      </div>
      <div class="action-card" @click="handleQuickBuy">
        <div class="card-content">
          <div class="card-title">{{ t("quickBuy") }}</div>
          <div class="card-subtitle">{{ t("quickBuySubtitle") }}</div>
        </div>
        <div class="card-illustration">
          <img :src="safeIcon" alt="safe" class="safe-image" />
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <!-- 标签栏 -->
      <div ref="tabSectionRef">
        <TabSection />
      </div>

      <!-- 公告区域 -->
      <div class="announcements-section" ref="announcementsRef">
        <div class="section-title">{{ t("announcements") }}</div>
        <div v-for="notification in notifications" :key="notification.id" class="announcement-item">
          <div class="announcement-text">{{ t(notification.key) }}</div>
          <div class="announcement-time">{{ notification.time }}</div>
        </div>
        <div class="view-more-link" @click="viewMoreNotifications">
          {{ t("viewMoreAnnouncements") }} >
        </div>
      </div>

      <!-- NFT 市场区域 -->
      <div class="nft-section" ref="nftSectionRef">
        <div class="section-title">{{ t("leadingNFTMarketplace") }}</div>
        <div class="nft-description">{{ t("nftDescription") }}</div>
        <div class="nft-image-wrapper">
          <img :src="nftIcon" alt="NFT" class="nft-image" />
        </div>
        <div class="nft-cta" @click="goToNFTHall">
          <span>{{ t("goToNFTHall") }}</span>
          <span class="arrow">→</span>
        </div>
      </div>

      <!-- 加密货币之旅助手区域 -->
      <div class="assistant-section" ref="assistantSectionRef">
        <div class="section-title">{{ t("cryptoJourneyAssistant") }}</div>
        <div class="assistant-description">
          {{ t("cryptoJourneyDescription") }}
        </div>
        <div class="assistant-image-wrapper">
          <img :src="zhusImage" alt="Assistant" class="assistant-image" />
        </div>
      </div>

      <!-- 常见问题区域 -->
      <div class="faq-section" ref="faqSectionRef">
        <div class="faq-container">
          <div class="faq-title">常见问题</div>

          <!-- FAQ 列表 -->
          <div class="faq-list">
            <div v-for="(item, index) in faqItems" :key="index" class="faq-item" @click="toggleFaq(index)">
              <div class="faq-question">{{ item.question }}</div>
              <div class="faq-icon" :class="{ 'expanded': item.expanded }">+</div>
              <div v-if="item.expanded" class="faq-answer">{{ item.answer }}</div>
            </div>
          </div>

          <!-- 导航链接 -->
          <div class="nav-links">
            <div v-for="(link, index) in navLinks" :key="index" class="nav-link-item">
              <div class="nav-link-header" @click="toggleNavLink(link)">
                <div class="nav-link-text">{{ link.text }}</div>
                <div class="nav-link-icon" :class="{ 'expanded': link.expanded }">▼</div>
              </div>
              <div v-if="link.expanded" class="nav-link-children">
                <div v-for="(child, childIndex) in link.children" :key="childIndex" class="nav-link-child"
                  @click.stop="handleNavLinkChild(link, child)">
                  {{ child.text }}
                </div>
              </div>
            </div>
          </div>

          <!-- 底部信息 -->
          <div class="faq-footer">
            <div class="footer-top">
              <div class="business-cooperation">商务合作</div>
              <div class="contact-phone">1+(469)2078685</div>
            </div>
            <div class="footer-bottom">
              <div class="copyright">版权所有 2024©Web3</div>
              <div class="company-tagline">一家专职加密货币公司 致诚之职 服务至上</div>
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
    <MenuDrawer v-model="showMenu" />

    <!-- 币对搜索弹窗 -->
    <CoinPairSearchModal v-model="showSearchModal" @select="handleSelectCoinPair" />

    <!-- 语言选择对话框 -->
    <van-popup v-model:show="showLanguageDialog" position="right"
      :style="{ width: '100%', height: '100%', overflow: 'visible' }" class="language-popup">
      <div class="language-dialog">
        <div class="dialog-header">
          <van-icon name="arrow-left" class="back-icon" @click="showLanguageDialog = false" />
          <div class="dialog-title">{{ currentLangName }}</div>
        </div>
        <div class="dialog-content">
          <van-cell-group inset>
            <van-cell v-for="lang in languages" :key="lang.code" :title="lang.name" @click="selectLanguage(lang.code)">
              <template #icon>
                <img :src="lang.flag" class="flag-icon" alt="" />
              </template>
              <template #right-icon>
                <van-icon v-if="currentLang === lang.code" name="success" color="#1989fa" />
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n, languages } from "@/i18n";
import homeIcon from "@/assets/image/Btc.png";
import chartIcon from "@/assets/images/chart.png";
import nftIcon from "@/assets/image/hall.svg";
import zhusImage from "@/assets/image/assistant.svg";
import galleryViewIcon from "@/assets/images/gallery-view.svg";
import searchIcon from "@/assets/image/search.png";
import kefuIcon from "@/assets/image/kefu.png";
import MenuSection from "@/components/Home/MenuSection.vue";
import MenuDrawer from "@/components/Home/MenuDrawer.vue";
import TabSection from "@/components/Home/TabSection.vue";
import CoinPairSearchModal from "@/components/Home/CoinPairSearchModal.vue";
// 钱包图标
import okxIcon from "@/assets/image/okx.svg";
import qianbIcon from "@/assets/image/qianb.svg";
import qianbaoIcon from "@/assets/image/qianbao.svg";
import qqianbaoIcon from "@/assets/image/qqianbao.svg";
import xiaohuliIcon from "@/assets/image/xiaohuli.svg";
// 其他图标
import speakerIcon from "@/assets/image/laba.svg";
import safeIcon from "@/assets/image/top-up.svg";

const router = useRouter();
const { t, currentLang, setLanguage } = useI18n();
const showMenu = ref(false);
const showLanguageDialog = ref(false);
const showSearchModal = ref(false);
const isInitialized = ref(false);

// 元素引用
const topBarRef = ref(null);
const heroSectionRef = ref(null);
const tabSectionRef = ref(null);
const announcementsRef = ref(null);
const nftSectionRef = ref(null);
const assistantSectionRef = ref(null);
const faqSectionRef = ref(null);

// 通知数据
const notifications = ref([
  {
    id: 1,
    key: "exchangeUpdateNotification",
    time: "15:13:17 2025-5-17",
  },
  {
    id: 2,
    key: "exchangeLendingUpdate",
    time: "15:13:17 2025-5-17",
  },
  {
    id: 3,
    key: "virtualReservationActivity",
    time: "15:13:17 2025-5-17",
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

const viewMoreNotifications = () => {
  router.push("/platform-notifications");
};

const goToNFTHall = () => {
  router.push("/nft-hall");
};

const openChat = () => {
  console.log("打开聊天");
};

const handleLogin = () => {
  router.push("/login");
};

const handleRegister = () => {
  router.push("/register");
};

const handleSelectCoinPair = (coin) => {
  const pair = coin.pair || `${coin.symbol}${coin.pair || "/USDT"}`;
  router.push(`/coin/${encodeURIComponent(pair)}`);
};

// 钱包数据
const wallets = ref([
  { id: 1, name: "Coinbase", icon: okxIcon },
  { id: 2, name: "MetaMask", icon: xiaohuliIcon },
  { id: 3, name: "Wallet3", icon: qianbIcon },
  { id: 4, name: "Wallet4", icon: qianbaoIcon },
  { id: 5, name: "Wallet5", icon: qqianbaoIcon },
]);

const handleWalletLogin = (wallet) => {
  console.log("连接钱包:", wallet.name);
  // TODO: 实现钱包连接逻辑
};

const handleOnChainDeposit = () => {
  console.log("链上充值");
  // TODO: 跳转到链上充值页面
};

const handleQuickBuy = () => {
  console.log("快捷买币");
  // TODO: 跳转到快捷买币页面
};

// FAQ 数据
const faqItems = ref([
  {
    question: "法律说明",
    answer: "这里是法律说明的详细内容...",
    expanded: false,
  },
  {
    question: "关于充值",
    answer: "这里是关于充值的详细内容...",
    expanded: false,
  },
  {
    question: "关于账号安全",
    answer: "这里是关于账号安全的详细内容...",
    expanded: false,
  },
  {
    question: "为什么要进行实名登记?",
    answer: "实名登记是为了确保账户安全和符合监管要求...",
    expanded: false,
  },
  {
    question: "登录密码忘记如何解决?",
    answer: "您可以通过注册邮箱或手机号找回密码...",
    expanded: false,
  },
  {
    question: "什么是冻结资产",
    answer: "冻结资产是指因安全或合规原因暂时无法使用的资产...",
    expanded: false,
  },
]);

// 导航链接数据
const navLinks = ref([
  {
    text: "交易市场",
    key: "tradingMarket",
    expanded: false,
    children: [
      { text: "现货", type: "spot" },
      { text: "永续", type: "perpetual" },
      { text: "期权", type: "options" },
    ],
  },
  {
    text: "资产管理",
    key: "assetManagement",
    expanded: false,
    children: [
      { text: "我的资产", path: "/my-assets" },
      { text: "储值", path: "/deposit-detail" },
      { text: "提现", path: "/withdraw-detail" },
      { text: "划转", path: "/transfer-detail" },
      { text: "订单中心", path: "/order-center" },
    ],
  },
  {
    text: "金融理财",
    key: "financialManagement",
    expanded: false,
    children: [
      { text: "产品", path: "/product-detail" },
    ],
  },
  {
    text: "支持",
    key: "support",
    expanded: false,
    children: [
      { text: "新手教程", path: "/tutorial-list" },
    ],
  },
  {
    text: "政策",
    key: "policies",
    expanded: false,
    children: [
      { text: "服务条款", path: "/terms-of-service" },
      { text: "隐私协议", path: "/privacy-policy" },
      { text: "反洗钱协议", path: "/anti-money-laundering" },
    ],
  },
]);

// 切换 FAQ 展开/收起
const toggleFaq = (index) => {
  faqItems.value[index].expanded = !faqItems.value[index].expanded;
};

// 切换导航链接展开/折叠
const toggleNavLink = (link) => {
  link.expanded = !link.expanded;
};

// 处理导航链接子项点击
const handleNavLinkChild = (link, child) => {
  if (link.key === "tradingMarket" && child.type) {
    // 交易市场：跳转到图表详情页
    router.push({
      path: `/coin/${encodeURIComponent("BTC/USDT")}`,
      query: { type: child.type },
    });
  } else if (child.path) {
    // 其他链接：跳转到指定路径
    router.push(child.path);
  }
};

// Intersection Observer 用于滚动动画
let observer = null;

onMounted(() => {
  setTimeout(() => {
    isInitialized.value = true;
  }, 50);

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  const elementsToObserve = [
    heroSectionRef.value,
    tabSectionRef.value,
    announcementsRef.value,
    nftSectionRef.value,
    assistantSectionRef.value,
    faqSectionRef.value,
  ];

  elementsToObserve.forEach((el) => {
    if (el) {
      observer.observe(el);
    }
  });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background: #070210;
  padding-bottom: 80px;
}

// 动画定义
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.animate-in {
  animation: fadeInUp 0.4s ease-out forwards;
}

.top-bar.animate-in {
  animation: fadeIn 0.4s ease-out forwards;
}

// 顶部导航栏
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  background: #0a0b0d;
  position: sticky;
  top: 0;
  z-index: 100;

  .menu-icon {
    width: 28px;
    height: 30px;
    cursor: pointer;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }

  .top-right-icons {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .search-icon,
  .kefu-icon {
    width: 30.09px;
    height: 30px;
    cursor: pointer;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }
}

// Hero 区域
.hero-section {
  padding: 0px 22px;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-title {
    font-family: PingFang SC;
    font-weight: 600;
    font-style: Semibold;
    font-size: 50px;
    line-height: 100%;
    letter-spacing: 0%;
    color: #ffffff;
    margin-top: 102px;
  }

  .hero-image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    // margin: 32px 0;
    // width: 100%;

    .hero-image {
      width: 399px;
      height: 306px;
      object-fit: contain;
    }
  }

  .hero-subtitle {
    font-family: PingFang SC;
    font-weight: 500;
    font-style: Medium;
    font-size: 28px;
    line-height: 100%;
    color: #ffffff;
    margin-bottom: 36px;

    .usdt-highlight {
      color: #1df388;
      font-weight: 600;
    }
  }

  .auth-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: center;
    margin-top: 32px;

    .auth-btn {
      flex: 1;
      font-family: PingFang SC;
      font-weight: 500;
      font-style: Medium;
      font-size: 28px;
      line-height: 100%;
      letter-spacing: 0%;

      cursor: pointer;
      border: none;
      transition: all 0.3s ease;

      &:active {
        opacity: 0.8;
        transform: scale(0.98);
      }

      &.login-btn {
        width: 328px;
        height: 84px;
        opacity: 1;
        border-width: 1px;
        border-radius: 10px;
      }

      &.register-btn {
        width: 328px;
        height: 84px;
        opacity: 1;
        border-width: 1px;
        border-radius: 10px;
        background: #1DF388;
        color: #070210;
      }
    }
  }
}

// 钱包登录区域
.wallet-login-section {
  // padding: 40px 22px 32px;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .wallet-login-title {
    font-family: PingFang SC;
    font-weight: 300;
    font-style: Light;
    font-size: 28px;
    line-height: 100%;
    letter-spacing: 0%;
    color: #AEAEAE;
    padding-top: 48px;
  }

  .wallet-icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    margin: 48px 32px;

    .wallet-icon-item {
      width: 90px;
      height: 90px;
      opacity: 1;
      border-radius: 10px;
      border-width: 1px;
      border: 1px solid #2E2E2E;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0F1014;

      &:active {
        transform: scale(0.95);
        background: rgba(255, 255, 255, 0.1);
      }

      .wallet-icon {
        width: 60px;
        height: 60px;
        object-fit: contain;
      }
    }
  }
}

// 活动公告横幅
.activity-banner {
  margin: 0 32px 68px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0;
  // transform: translateY(30px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .speaker-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
    filter: brightness(0) invert(1);
    flex-shrink: 0;
  }

  .activity-text-wrapper {
    flex: 1;
    overflow: hidden;
    position: relative;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .activity-text {
    font-family: PingFang SC;
    font-weight: 400;
    font-style: Regular;
    font-size: 20px;
    line-height: 100%;
    letter-spacing: 0%;
    white-space: nowrap;
    color: #D3D3D3;
    position: absolute;
    animation: scroll-text 15s linear infinite;
  }

  @keyframes scroll-text {
    0% {
      transform: translateX(100%);
    }

    100% {
      transform: translateX(-100%);
    }
  }
}

// 操作卡片区域
.action-cards {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin: 0 32px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .action-card {
    width: 328px;
    height: 120px;
    opacity: 1;
    border-radius: 10px;
    border-width: 1px;
    border: 1px solid #3D3D3D;
    background: #141517;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    box-sizing: border-box;

    &:active {
      transform: scale(0.98);
      background: rgba(255, 255, 255, 0.08);
    }

    .card-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-right: 12px;
      width: 115px;

      .card-title {
        font-family: PingFang SC;
        font-weight: 500;
        font-style: Medium;
        font-size: 20px;
        line-height: 1.5em;
        letter-spacing: 0%;
        color: #F0F0F0;
      }

      .card-subtitle {
        width: 115px;
        font-family: PingFang SC;
        font-weight: 400;
        font-style: Regular;
        font-size: 10px;
        letter-spacing: 0%;
        color: #B8B8B8;
        line-height: 1.5em;
      }
    }

    .card-illustration {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-shrink: 0;

      .safe-image {
        width: 110px;
        height: 98px;
        object-fit: contain;
      }
    }
  }
}

// 内容区域
.content {
  padding: 0 16px;
}

.content>div:first-child {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

// 公告区域
.announcements-section {
  margin-top: 68px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
  padding: 0 16px;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title {
    font-family: PingFang SC;
    font-size: 46px;
    font-weight: 900;
    color: #ffffff;
    margin-bottom: 24px;
    text-align: center;
  }

  .announcement-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 21px 0;

    // border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    &:last-of-type {
      border-bottom: none;
    }

    .announcement-text {
      font-family: PingFang SC;
      font-weight: 400;
      font-style: Regular;
      font-size: 26px;
      line-height: 100%;
      color: #BCBCBC;
      flex: 1;
    }

    .announcement-time {
      font-family: Inter;
      font-weight: 400;
      font-style: Regular;
      font-size: 20px;
      line-height: 100%;
      letter-spacing: 0%;
      text-align: right;
      color: #919191;
    }
  }

  .view-more-link {
    text-align: center;
    font-family: PingFang SC;
    font-weight: 400;
    font-style: Regular;
    font-size: 20px;
    line-height: 100%;
    letter-spacing: 0%;
    color: #949494;
    padding-top: 49px;

    &:active {
      color: #1df388;
      opacity: 0.8;
    }
  }
}

// NFT 市场区域
.nft-section {
  margin-top: 100px;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
  padding: 0 16px;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title {
    font-family: PingFang SC;
    font-weight: 500;
    font-style: Medium;
    font-size: 46px;
    line-height: 100%;
    letter-spacing: 0%;
    color: #ffffff;
  }

  .nft-description {
    font-family: PingFang SC;
    font-weight: 500;
    font-style: Medium;
    font-size: 28px;
    line-height: 100%;
    letter-spacing: 0%;
    color: #8E8E92;
    margin-top: 30px;
  }

  .nft-image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 32px 0 24px;

    .nft-image {
      width: 284px;
      height: 280px;
      object-fit: contain;
    }
  }

  .nft-cta {
    font-family: PingFang SC;
    font-weight: 500;
    font-style: Medium;
    font-size: 28px;
    line-height: 100%;
    letter-spacing: 0%;
    color: #16CF72;

    .arrow {
      display: inline-block;
      transition: transform 0.3s ease;
    }

    &:active {
      color: #1df388;
      opacity: 0.8;

      .arrow {
        transform: translateX(4px);
      }
    }
  }
}

// 助手区域
.assistant-section {
  margin-top: 104px;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
  padding: 0 16px;
  padding-bottom: 40px;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title {
    font-family: PingFang SC;
    font-weight: 500;
    font-style: Medium;
    font-size: 46px;
    line-height: 100%;
    letter-spacing: 0%;
    color: #FFFFFF;
    margin-bottom: 30px;
  }

  .assistant-description {
    width: 525px;
    height: 70px;
    font-family: PingFang SC;
    font-weight: 400;
    font-style: Regular;
    font-size: 25px;
    line-height: 100%;
    letter-spacing: 0%;
    text-align: center;
    color: #A7A7AC;
    margin: 0 auto;
    line-height: 1.5em;
  }

  .assistant-image-wrapper {
    width: 549px;
    height: 140px;
    margin: 0 auto;
    margin-top: 65px;

    .assistant-image {
      width: 100%;
      max-width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
}

// FAQ 区域
.faq-section {
  margin-top: 40px;
  padding: 0;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .faq-container {
    background: #070210;
    border-radius: 0;
    padding: 40px 32px 60px;
    margin: 0;
    max-width: 100%;
    width: 100%;

    .faq-title {
      font-family: PingFang SC;
      font-weight: 600;
      font-style: Semibold;
      font-size: 46px;
      line-height: 100%;
      letter-spacing: 0%;
      color: #ffffff;
      text-align: center;
      margin-bottom: 89px;
    }

    .faq-list {
      margin-bottom: 40px;

      .faq-item {
        position: relative;
        padding: 24px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        cursor: pointer;
        transition: all 0.3s ease;

        &:last-child {
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        &:active {
          opacity: 0.8;
        }

        .faq-question {
          font-family: PingFang SC;
          font-weight: 500;
          font-style: Medium;
          font-size: 30px;
          line-height: 100%;
          letter-spacing: 0%;
          color: #ffffff;
          padding-right: 50px;
        }

        .faq-icon {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: #ffffff;
          font-weight: 300;
          transition: transform 0.3s ease;
          line-height: 1;

          &.expanded {
            transform: translateY(-50%) rotate(45deg);
          }
        }

        .faq-answer {
          margin-top: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          font-size: 24px;
          line-height: 1.6em;
          color: #bcbcbc;
          padding-right: 50px;
        }
      }
    }

    .nav-links {
      margin-bottom: 40px;
      padding-top: 20px;
      // border-top: 1px solid rgba(255, 255, 255, 0.2);

      .nav-link-item {
        // border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;

        &:last-child {
          border-bottom: none;
        }

        .nav-link-header {
          position: relative;
          padding: 24px 0;
          cursor: pointer;
          transition: all 0.3s ease;

          &:active {
            opacity: 0.8;
          }

          .nav-link-text {
            font-family: PingFang SC;
            font-weight: 400;
            font-size: 28px;
            line-height: 1.5em;
            color: #ffffff;
            padding-right: 50px;
          }

          .nav-link-icon {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: #ffffff;
            transition: transform 0.3s ease;

            &.expanded {
              transform: translateY(-50%) rotate(180deg);
            }
          }
        }

        .nav-link-children {
          padding: 0 0 16px 0;
          animation: slideDown 0.3s ease-out;

          .nav-link-child {
            padding: 16px 0 16px 24px;
            font-family: PingFang SC;
            font-weight: 400;
            font-size: 24px;
            line-height: 1.5em;
            color: #bcbcbc;
            cursor: pointer;
            transition: all 0.3s ease;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);

            &:last-child {
              border-bottom: none;
            }

            &:active {
              opacity: 0.8;
              color: #ffffff;
            }

            &:hover {
              color: #ffffff;
            }
          }
        }
      }
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        max-height: 0;
        transform: translateY(-10px);
      }

      to {
        opacity: 1;
        max-height: 500px;
        transform: translateY(0);
      }
    }

    .faq-footer {
      padding-top: 60px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);

      .footer-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 73px;

        .business-cooperation {
          font-family: PingFang SC;
          font-weight: 500;
          font-style: Medium;
          font-size: 24px;
          line-height: 100%;
          letter-spacing: 0%;
          color: #F4F5F7;
        }

        .contact-phone {
          font-family: Inter;
          font-weight: 500;
          font-style: Medium;
          font-size: 26px;
          line-height: 100%;
          letter-spacing: 0%;
          text-align: right;
          color: #A1A1A1;
        }
      }

      .footer-bottom {
        text-align: center;
        font-family: PingFang SC;
        font-weight: 400;
        font-style: Regular;
        font-size: 20px;
        line-height: 100%;
        letter-spacing: 0%;
        text-align: center;
        color: #57585C;
        line-height: 1.5em;
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
  background-color: rgba(50, 50, 51, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 99;
  transition: transform 0.3s ease;

  &:active {
    transform: scale(0.95);
  }

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    filter: brightness(0) invert(1);
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
  background-color: #0a0b0d;
  position: relative;
  overflow: visible;

  .dialog-header {
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: rgba(26, 27, 46, 0.9);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    z-index: 1;
    flex-shrink: 0;

    .back-icon {
      font-size: 20px;
      color: #ffffff;
      cursor: pointer;
      margin-right: 12px;
    }

    .dialog-title {
      font-size: 18px;
      font-weight: bold;
      color: #ffffff;
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
    background-color: #0a0b0d;

    :deep(.van-cell-group) {
      margin: 0;
    }

    :deep(.van-cell) {
      padding: 12px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background-color: #0a0b0d;
      color: #ffffff;
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
