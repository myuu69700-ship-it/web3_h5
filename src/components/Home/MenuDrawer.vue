<template>
  <van-popup
    v-model:show="visible"
    position="left"
    :style="{ width: '100%', height: '100%' }"
    @update:show="handleUpdateShow"
  >
    <div class="menu-drawer">
      <!-- 顶部导航栏 -->
      <div class="drawer-header">
        <img
          :src="leftArrowIcon"
          class="back-icon"
          @click="handleClose"
          alt="返回"
        />
        <div class="header-right">
          <img
            :src="kfuIcon"
            class="header-icon"
            @click="handleService"
            alt="客服"
          />
          <van-icon name="chat-o" class="header-icon" @click="handleMessage" />
        </div>
      </div>

      <!-- 用户登录/个人资料部分 -->
      <div class="user-section" @click="handleUserProfile">
        <div class="user-avatar">
          <van-icon name="user-circle-o" size="62.39" />
        </div>
        <div class="user-info">
          <div class="user-title">{{ t("loginImmediately") }}</div>
          <div class="user-subtitle">{{ t("personalDataAndSettings") }}</div>
        </div>
        <van-icon name="arrow" class="arrow-icon" />
      </div>

      <!-- 常用功能 -->
      <div class="menu-group tutorial-group">
        <div class="group-title">{{ t("commonFunctions") }}</div>
        <div class="function-item tutorial-item" @click="handleTutorial">
          <div class="function-icon-wrapper">
            <van-icon name="info-o" size="27.03" />
          </div>
          <span class="function-label">{{ t("newbieTutorial") }}</span>
        </div>
      </div>

      <!-- 资产管理 -->
      <div class="menu-group">
        <div class="group-title">{{ t("assetManagement") }}</div>
        <div class="function-row">
          <div class="function-item" @click="handleDeposit">
            <div class="function-icon-wrapper">
              <van-icon name="balance-o" size="27.03" />
            </div>
            <span class="function-label">{{ t("deposit") }}</span>
          </div>
          <div class="function-item" @click="handleWithdraw">
            <div class="function-icon-wrapper">
              <van-icon name="friends-o" size="27.03" />
            </div>
            <span class="function-label">{{ t("withdraw") }}</span>
          </div>
          <div class="function-item" @click="handleQuickBuy">
            <div class="function-icon-wrapper">
              <van-icon name="gold-coin-o" size="27.03" />
            </div>
            <span class="function-label">{{ t("quickBuy") }}</span>
          </div>
        </div>
      </div>

      <!-- 交易 -->
      <div class="menu-group">
        <div class="group-title">{{ t("trading") }}</div>
        <div class="function-row">
          <div class="function-item" @click="handleOptions">
            <div class="function-icon-wrapper">
              <van-icon name="chart-trending-o" size="27.03" />
            </div>
            <span class="function-label">{{ t("options") }}</span>
          </div>
          <div class="function-item" @click="handleSpot">
            <div class="function-icon-wrapper">
              <van-icon name="share-o" size="27.03" />
            </div>
            <span class="function-label">{{ t("spot") }}</span>
          </div>
          <div class="function-item" @click="handleContract">
            <div class="function-icon-wrapper">
              <van-icon name="apps-o" size="27.03" />
            </div>
            <span class="function-label">{{ t("contract") }}</span>
          </div>
          <div class="function-item" @click="handleNFT">
            <div class="function-icon-wrapper">
              <van-icon name="photo-o" size="27.03" />
            </div>
            <span class="function-label">{{ t("nft") }}</span>
          </div>
        </div>
        <div class="function-row">
          <div class="function-item" @click="handleAIStrategy">
            <div class="function-icon-wrapper">
              <van-icon name="setting-o" size="27.03" />
            </div>
            <span class="function-label">{{ t("aiStrategyTrading") }}</span>
          </div>
        </div>
      </div>

      <!-- 赚币与奖励 -->
      <div class="menu-group">
        <div class="group-title">{{ t("earnCoinsAndRewards") }}</div>
        <div class="function-row">
          <div class="function-item" @click="handleDeFiLending">
            <div class="function-icon-wrapper">
              <van-icon name="like-o" size="27.03" />
            </div>
            <span class="function-label">{{ t("defiLending") }}</span>
          </div>
          <div class="function-item" @click="handlePortfolio">
            <div class="function-icon-wrapper">
              <van-icon name="cluster-o" size="27.03" />
            </div>
            <span class="function-label">{{ t("investmentPortfolio") }}</span>
          </div>
          <div class="function-item" @click="handleLockedStaking">
            <div class="function-icon-wrapper">
              <van-icon name="lock" size="27.03" />
            </div>
            <span class="function-label">{{ t("lockedStaking") }}</span>
          </div>
        </div>
      </div>

      <!-- 平台功能 -->
      <div class="menu-group">
        <div class="group-title">{{ t("platformFunctions") }}</div>
        <div class="function-row">
          <div class="function-item" @click="handleAssetCenter">
            <div class="function-icon-wrapper">
              <van-icon name="shield-o" size="27.03" />
            </div>
            <span class="function-label">{{ t("assetCenter") }}</span>
          </div>
          <div class="function-item" @click="handleAddressBook">
            <div class="function-icon-wrapper">
              <van-icon name="notes-o" size="27.03" />
            </div>
            <span class="function-label">{{ t("addressBook") }}</span>
          </div>
          <div class="function-item" @click="handleCharity">
            <div class="function-icon-wrapper">
              <van-icon name="like-o" size="27.03" />
            </div>
            <span class="function-label">{{ t("charity") }}</span>
          </div>
          <div class="function-item" @click="handlePlatformNotifications">
            <div class="function-icon-wrapper">
              <van-icon name="bell-o" size="27.03" />
            </div>
            <span class="function-label">{{ t("platformNotifications") }}</span>
          </div>
        </div>
        <div class="function-row">
          <div class="function-item" @click="handleSecurityCenter">
            <div class="function-icon-wrapper">
              <van-icon name="shield-o" size="27.03" />
            </div>
            <span class="function-label">{{ t("securityCenter") }}</span>
          </div>
          <div class="function-item" @click="handleLanguageSelect">
            <div class="function-icon-wrapper">
              <img :src="diqiuIcon" class="language-icon" alt="" />
            </div>
            <span class="function-label">{{ t("traditionalChinese") }}</span>
          </div>
        </div>
      </div>

      <!-- 清除缓存 -->
      <div class="menu-group">
        <div class="function-item clear-cache" @click="handleClearCache">
          <div class="function-icon-wrapper">
            <van-icon name="delete-o" size="20" />
          </div>
          <span class="function-label">{{ t("clearCache") }}</span>
        </div>
      </div>
    </div>

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
  </van-popup>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n, languages } from "@/i18n";
import leftArrowIcon from "@/assets/images/left_arrow.svg";
import kfuIcon from "@/assets/images/kfu.svg";
import diqiuIcon from "@/assets/images/diqiu.svg";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const router = useRouter();
const { t, currentLang, setLanguage } = useI18n();
const showLanguageDialog = ref(false);

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const handleUpdateShow = (show) => {
  visible.value = show;
};

const handleClose = () => {
  visible.value = false;
};

// 用户相关
const handleUserProfile = () => {
  router.push("/login");
  handleClose();
};

// 常用功能
const handleTutorial = () => {
  router.push("/tutorial-list");
  handleClose();
};

// 资产管理
const handleDeposit = () => {
  router.push("/deposit-detail");
  handleClose();
};

const handleWithdraw = () => {
  router.push("/withdraw-detail");
  handleClose();
};

const handleQuickBuy = () => {
  router.push("/quick-buy");
  handleClose();
};

// 交易
const handleOptions = () => {
  router.push({
    path: `/coin/${encodeURIComponent("BTC/USDT")}`,
    query: { type: "options" },
  });
  handleClose();
};

const handleSpot = () => {
  router.push({
    path: `/coin/${encodeURIComponent("BTC/USDT")}`,
    query: { type: "spot" },
  });
  handleClose();
};

const handleContract = () => {
  router.push({
    path: `/coin/${encodeURIComponent("BTC/USDT")}`,
    query: { type: "perpetual" },
  });
  handleClose();
};

const handleNFT = () => {
  // NFT 逻辑
  console.log("NFT");
  handleClose();
};

const handleAIStrategy = () => {
  // AI策略交易逻辑
  console.log("AI策略交易");
  handleClose();
};

// 赚币与奖励
const handleDeFiLending = () => {
  router.push("/product-detail");
  handleClose();
};

const handlePortfolio = () => {
  // 投资组合逻辑
  console.log("投资组合");
  handleClose();
};

const handleLockedStaking = () => {
  router.push("/locked-staking-detail");
  handleClose();
};

// 平台功能
const handleAssetCenter = () => {
  router.push("/my-assets");
  handleClose();
};

const handleAddressBook = () => {
  // 地址簿逻辑
  console.log("地址簿");
  handleClose();
};

const handleCharity = () => {
  router.push("/charity-detail");
  handleClose();
};

const handlePlatformNotifications = () => {
  router.push("/platform-notifications");
  handleClose();
};

const handleSecurityCenter = () => {
  router.push("/security-center");
  handleClose();
};

const currentLangName = computed(() => {
  const lang = languages.find((l) => l.code === currentLang.value);
  return (
    lang?.name || languages.find((l) => l.code === "zh-TW")?.name || "繁體中文"
  );
});

const selectLanguage = (code) => {
  setLanguage(code);
  showLanguageDialog.value = false;
  // 选择语言后，重新打开侧边栏以便用户继续操作
  visible.value = true;
};

const handleLanguageSelect = () => {
  // 打开语言选择弹窗，不关闭侧边栏（让语言弹出窗覆盖侧边栏）
  showLanguageDialog.value = true;
};

// 顶部操作
const handleService = () => {
  // 客服逻辑
  console.log("客服");
};

const handleMessage = () => {
  // 消息逻辑
  console.log("消息");
};

// 清除缓存
const handleClearCache = () => {
  // 清除缓存逻辑
  console.log("清除缓存");
  // 可以显示确认对话框
};
</script>

<style lang="scss" scoped>
.menu-drawer {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow-y: auto;
  padding-bottom: 20px;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  // border-bottom: 1px solid #ebedf0;

  .back-icon {
    width: 26px;
    height: 26px;
    cursor: pointer;
    display: block;
  }

  .header-right {
    display: flex;
    gap: 16px;
    align-items: center;

    .header-icon {
      width: 24.95px;
      height: 24.95px;
      cursor: pointer;
      display: block;

      &.van-icon {
        font-size: 24.95px;
        color: #040303;
      }
    }
  }
}

.user-section {
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  // border-bottom: 1px solid #ebedf0;

  .user-avatar {
    width: 62.39px;
    height: 62.39px;
    margin-right: 12px;
    color: #040303;
  }

  .user-info {
    flex: 1;

    .user-title {
      font-size: 14px;
      color: #040303;
      margin-bottom: 4px;
    }

    .user-subtitle {
      font-size: 14px;
      color: #040303;
    }
  }

  .arrow-icon {
    font-size: 16px;
    color: #040303;
    font-weight: 600;
  }
}

.menu-group {
  padding: 16px 20px 0;
  border-bottom: 1px solid #ebedf0;
  width: 95%;
  margin: 0 auto;

  .group-title {
    font-size: 3.73333vw;
    font-weight: 600;
    color: #040303;
    margin-bottom: 12px;
    margin-left: -15px;
  }

  .function-row {
    display: flex;
    gap: 20px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .function-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    min-width: 60px;
    padding: 8px 0;
    // flex: 0 0 auto;

    .function-icon-wrapper {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: transparent;
      margin-bottom: 8px;
      color: #040303;

      .language-icon {
        width: 27.03px;
        height: 27.03px;
        object-fit: contain;
      }
    }

    .function-label {
      font-size: 12px;
      color: #040303;
      // text-align: center;
      line-height: 1.4;
    }

    &:active {
      opacity: 0.7;
    }
  }

  // 新手教程样式 - 最左侧
  &.tutorial-group {
    padding: 16px 20px 0;
    // padding-left: 30px;
    
    .tutorial-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      width: auto;
      padding: 12px 0;
      margin-left: 10px;

      .function-icon-wrapper {
        width: 40px;
        height: 40px;
        margin-right: 0;
        margin-bottom: 8px;
        background-color: transparent;
        border-radius: 0;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #040303;
      }

      .function-label {
        font-size: 12px;
        color: #040303;
        text-align: left;
        line-height: 1.4;
      }
    }
  }

  .clear-cache {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 12px 0;
    width: 100%;

    .function-icon-wrapper {
      width: 20px;
      height: 20px;
      margin-right: 12px;
      margin-bottom: 0;
      background-color: transparent;
      border-radius: 0;
    }

    .function-label {
      font-size: 4vw;
      color: #040303;
      // font-weight: 600;
    }
  }
}
.menu-group:last-child {
  border-bottom: none;
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
