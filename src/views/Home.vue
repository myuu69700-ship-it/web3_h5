<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <div
      class="top-bar"
      :class="{ 'animate-in': isInitialized }"
      ref="topBarRef"
    >
      <img
        :src="galleryViewIcon"
        class="menu-icon"
        @click="showMenu = true"
        alt=""
      />
      <img
        :src="diqiuIcon"
        class="setting-icon"
        @click="showLanguageDialog = true"
        alt=""
      />
    </div>

    <!-- 首页搜索区域 -->
    <div
      class="search-section"
      :class="{ 'animate-in': isInitialized }"
      ref="searchSectionRef"
    >
      <van-search
        class="search-input"
        :placeholder="t('searchCoinPair')"
        @click="showSearchModal = true"
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
            {{ t("onChainDeposit") }}
          </button>
          <button class="action-btn buy-btn" @click="handleQuickBuy">
            {{ t("quickBuy") }}
          </button>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 标签栏 -->
      <div ref="tabSectionRef">
        <TabSection />
      </div>
      <!-- 平台通知 -->
      <div class="notifications-section" ref="notificationsRef">
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
      <div class="promo-banner" ref="promoBannerRef">
        <div class="promo-content">
          <div class="promo-left">
            <div class="promo-title">{{ t("promoText") }}</div>
            <div class="promo-description">{{ t("promoDescription") }}</div>
            <div class="promo-cta">{{ t("promoCta") }}</div>
            <!-- <div class="promo-copyright">{{ t("copyright") }}</div> -->
          </div>
          <div class="promo-right">
            <img :src="nftIcon" alt="NFT" class="nft-image" />
          </div>
        </div>
      </div>
      <!-- 您加密貨幣之旅的得力助手 -->
      <div class="s1" ref="s1Ref">
        <p>{{ t("cryptoJourneyAssistant") }}</p>
      </div>
      <!-- 新增内容区域 -->
      <div class="new-content-section" ref="newContentRef">
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
        <MenuSection />
      </div>
    </div>

    <!-- 浮动聊天按钮 -->
    <div class="chat-fab" @click="openChat">
      <img :src="chartIcon" alt="chart" />
    </div>

    <!-- 菜单抽屉 -->
    <MenuDrawer v-model="showMenu" />

    <!-- 币对搜索弹窗 -->
    <CoinPairSearchModal
      v-model="showSearchModal"
      @select="handleSelectCoinPair"
    />

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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n, languages } from "@/i18n";
import homeIcon from "@/assets/images/homeIcon.gif";
import chartIcon from "@/assets/images/chart.png";
import nftIcon from "@/assets/images/nft.png";
import zhusImage from "@/assets/images/zhus.png";
import galleryViewIcon from "@/assets/images/gallery-view.svg";
import diqiuIcon from "@/assets/images/diqiu.svg";
import MenuSection from "@/components/Home/MenuSection.vue";
import MenuDrawer from "@/components/Home/MenuDrawer.vue";
import TabSection from "@/components/Home/TabSection.vue";
import CoinPairSearchModal from "@/components/Home/CoinPairSearchModal.vue";

const router = useRouter();
const { t, currentLang, setLanguage } = useI18n();
const showMenu = ref(false);
const showLanguageDialog = ref(false);
const showSearchModal = ref(false);
const isInitialized = ref(false);

// 元素引用
const topBarRef = ref(null);
const searchSectionRef = ref(null);
const tabSectionRef = ref(null);
const notificationsRef = ref(null);
const promoBannerRef = ref(null);
const s1Ref = ref(null);
const newContentRef = ref(null);

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

const viewMoreNotifications = () => {
  // 跳转到通知列表页
  router.push("/platform-notifications");
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
  router.push("/register");
};

const handleDeposit = () => {
  // 跳转到币种选择页面
  router.push("/deposit-select");
};

const handleQuickBuy = () => {
  router.push("/quick-buy");
};

const handleSelectCoinPair = (coin) => {
  // 处理选择交易对 - 跳转到详情页
  const pair = coin.pair || `${coin.symbol}${coin.pair || "/USDT"}`;
  router.push(`/coin/${encodeURIComponent(pair)}`);
};

// Intersection Observer 用于滚动动画
let observer = null;

onMounted(() => {
  // 页面初始化动画
  setTimeout(() => {
    isInitialized.value = true;
  }, 50);

  // 设置滚动动画观察器
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          // 动画完成后可以取消观察
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // 当元素10%可见时触发
      rootMargin: "0px 0px -50px 0px", // 提前50px触发
    }
  );

  // 观察需要动画的元素
  const elementsToObserve = [
    tabSectionRef.value,
    notificationsRef.value,
    promoBannerRef.value,
    s1Ref.value,
    newContentRef.value,
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
  background-color: #fff;
  padding-bottom: 80px;
}

// 动画定义
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(180px);
    // transform: translateX(-120px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    // transform: translateX(0);
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

// 动画类
.animate-in {
  animation: fadeInUp 0.4s ease-out forwards;
}

.top-bar.animate-in {
  animation: fadeIn 0.4s ease-out forwards;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;

  .menu-icon,
  .setting-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    object-fit: contain;
  }
}

.content {
  padding: 0 16px;
}

// 滚动动画元素初始状态 - 为 TabSection 容器添加
.content > div:first-child {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-section {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .search-input {
    :deep(.van-search__content) {
      border-radius: 5.06667vw;
      background: #f3f3f3;
    }

    :deep(.van-field__left-icon .van-icon, .van-field__right-icon .van-icon) {
      color: #040303;
    }
    // :deep(.van-field__control::placeholder) {
    //   color: #040303 !important;
    // }
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
        width: 176px;
        height: 35px;
        border-radius: 5.06667vw;
        font-size: 3.2vw;
        cursor: pointer;
        border: none;
      }

      &.register-btn {
        background-color: #2b6d16;
        color: #fff;
        width: 176px;
        height: 35px;
        border-radius: 5.06667vw;
        font-size: 3.2vw;
        cursor: pointer;
        border: none;
      }

      &.deposit-btn {
        background-color: #2b6d16;
        color: #fff;
        width: 176px;
        height: 35px;
        border-radius: 5.06667vw;
        font-size: 3.2vw;
        cursor: pointer;
        border: none;
      }

      &.buy-btn {
        background-color: #2b6d16;
        color: #fff;
        width: 176px;
        height: 35px;
        border-radius: 5.06667vw;
        font-size: 3.2vw;
        cursor: pointer;
        border: none;
      }
    }
  }
}

// 通知区域
.notifications-section {
  margin-top: 24px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title {
    font-size: 5vw;
    color: #040303;
    font-weight: 900;
    margin-bottom: 16px;
  }

  .notification-item {
    padding: 12px 0;
    // border-bottom: 1px solid #ebedf0;
    .notification-text {
      width: 100%;
      font-size: 4vw;
      color: #040303;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 1vw;
    }

    .notification-time {
      font-size: 3.2vw;
      color: #9a9a9a;
      margin-top: 0.53333vw;
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
    margin-top: 6vw;
  }
}

// 推广横幅
.s1 {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 9.06667vw;
  font-weight: 800;
  line-height: 1.3;
  padding: 10px;
  color: #040303;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  p {
    text-align: center;
    width: 100%;
    margin: 0;
  }
}
.promo-banner {
  margin-top: 24px;
  background-color: #fff;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .promo-content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    position: relative;
  }

  .promo-left {
    // flex: 1;
    width: 151.27px;
    height: 149px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .promo-title {
    font-size: 9.06667vw;
    font-weight: 700;
    color: #a0de1f;
    line-height: 1.2;
  }

  .promo-description {
    color: #040303;
    font-size: 3.73333vw;
    line-height: 1.6;
  }

  .promo-cta {
    background: none;
    border: none;
    padding: 0;
    font-size: 4.26667vw;
    color: #a0de1f;
    text-align: left;
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
    width: 50.13333vw;
    height: auto;
    object-fit: contain;
  }
}

// 新增内容区域
.new-content-section {
  margin-top: 24px;
  background-color: #fff;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .description-text {
    margin-top: 3.73333vw;
    text-align: center;
    color: #acacac;
    font-size: 3.73333vw;
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
      display: block;
      margin-top: 5.33333vw;
      margin-bottom: 10vw;
    }
  }

  .copyright-text {
    color: #0a0b0d;
    font-size: 3.2vw;
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
