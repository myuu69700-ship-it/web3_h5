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
        <van-icon name="cross" class="close-icon" @click="handleClose" />
        <div class="header-right">
          <img
            :src="kfuIcon"
            class="header-icon"
            @click="handleService"
            alt="客服"
          />
          <img
            :src="diqiuIcon"
            class="header-icon"
            @click="handleLanguageSelect"
            alt="语言"
          />
        </div>
      </div>

      <!-- 登录注册按钮 -->
      <div class="auth-section">
        <button class="auth-btn login-btn" @click="handleLogin">
          {{ t("login") }}
        </button>
        <button class="auth-btn register-btn" @click="handleRegister">
          {{ t("register") }}
        </button>
      </div>

      <!-- 常用功能 -->
      <div class="menu-section">
        <div class="section-header" @click="toggleSection('common')">
          <span class="section-title">{{ t("commonFunctions") }}</span>
          <van-icon
            name="arrow-up"
            class="chevron-icon"
            :class="{ expanded: expandedSections.common }"
          />
        </div>
        <div
          v-if="expandedSections.common"
          class="section-content"
        >
          <div class="menu-item" @click="handleTutorial">
            <div class="menu-icon">
              <van-icon name="question-o" size="24" />
            </div>
            <span class="menu-label">{{ t("newbieTutorial") }}</span>
          </div>
        </div>
      </div>

      <!-- 资产管理 -->
      <div class="menu-section">
        <div class="section-header" @click="toggleSection('assets')">
          <span class="section-title">{{ t("assetManagement") }}</span>
          <van-icon
            name="arrow-up"
            class="chevron-icon"
            :class="{ expanded: expandedSections.assets }"
          />
        </div>
        <div
          v-if="expandedSections.assets"
          class="section-content"
        >
          <div class="menu-item" @click="handleDeposit">
            <div class="menu-icon">
              <van-icon name="balance-o" size="24" />
            </div>
            <span class="menu-label">{{ t("deposit") }}</span>
          </div>
          <div class="menu-item" @click="handleWithdraw">
            <div class="menu-icon">
              <van-icon name="arrow-up" size="24" />
            </div>
            <span class="menu-label">{{ t("withdraw") }}</span>
          </div>
          <div class="menu-item" @click="handleQuickBuy">
            <div class="menu-icon">
              <van-icon name="flash-o" size="24" />
            </div>
            <span class="menu-label">{{ t("quickBuy") }}</span>
          </div>
        </div>
      </div>

      <!-- 交易 -->
      <div class="menu-section">
        <div class="section-header" @click="toggleSection('trading')">
          <span class="section-title">{{ t("trading") }}</span>
          <van-icon
            name="arrow-up"
            class="chevron-icon"
            :class="{ expanded: expandedSections.trading }"
          />
        </div>
        <div
          v-if="expandedSections.trading"
          class="section-content"
        >
          <div class="menu-item" @click="handleOptions">
            <div class="menu-icon">
              <van-icon name="description" size="24" />
            </div>
            <span class="menu-label">{{ t("options") }}</span>
          </div>
          <div class="menu-item" @click="handleSpot">
            <div class="menu-icon">
              <van-icon name="aim" size="24" />
            </div>
            <span class="menu-label">{{ t("spot") }}</span>
          </div>
          <div class="menu-item" @click="handleContract">
            <div class="menu-icon">
              <van-icon name="description" size="24" />
            </div>
            <span class="menu-label">{{ t("contract") }}</span>
          </div>
          <div class="menu-item" @click="handleNFT">
            <div class="menu-icon">
              <span class="nft-icon">NFT</span>
            </div>
            <span class="menu-label">{{ t("nft") }}</span>
          </div>
          <div class="menu-item" @click="handleAIStrategy">
            <div class="menu-icon">
              <van-icon name="setting-o" size="24" />
            </div>
            <span class="menu-label">{{ t("aiStrategyTrading") }}</span>
          </div>
        </div>
      </div>

      <!-- 赚币与奖励 -->
      <div class="menu-section">
        <div class="section-header" @click="toggleSection('earn')">
          <span class="section-title">{{ t("earnCoinsAndRewards") }}</span>
          <van-icon
            name="arrow-up"
            class="chevron-icon"
            :class="{ expanded: expandedSections.earn }"
          />
        </div>
        <div
          v-if="expandedSections.earn"
          class="section-content"
        >
          <div class="menu-item" @click="handleDeFiLending">
            <div class="menu-icon">
              <van-icon name="exchange" size="24" />
            </div>
            <span class="menu-label">{{ t("defiLending") }}</span>
          </div>
          <div class="menu-item" @click="handlePortfolio">
            <div class="menu-icon">
              <van-icon name="cluster-o" size="24" />
            </div>
            <span class="menu-label">{{ t("investmentPortfolio") }}</span>
          </div>
          <div class="menu-item" @click="handleLockedStaking">
            <div class="menu-icon">
              <van-icon name="lock" size="24" />
            </div>
            <span class="menu-label">{{ t("lockedStaking") }}</span>
          </div>
        </div>
      </div>

      <!-- 更多功能 -->
      <div class="menu-section">
        <div class="section-header" @click="toggleSection('more')">
          <span class="section-title">{{ t("moreFunctions") }}</span>
          <van-icon
            name="arrow-up"
            class="chevron-icon"
            :class="{ expanded: expandedSections.more }"
          />
        </div>
        <div
          v-if="expandedSections.more"
          class="section-content"
        >
          <div class="menu-item" @click="handleAssetCenter">
            <div class="menu-icon">
              <van-icon name="notes-o" size="24" />
            </div>
            <span class="menu-label">{{ t("assetCenter") }}</span>
          </div>
          <div class="menu-item" @click="handleAddressBook">
            <div class="menu-icon">
              <van-icon name="notes-o" size="24" />
            </div>
            <span class="menu-label">{{ t("addressBook") }}</span>
          </div>
          <div class="menu-item" @click="handleCharity">
            <div class="menu-icon">
              <van-icon name="like-o" size="24" />
            </div>
            <span class="menu-label">{{ t("charity") }}</span>
          </div>
          <div class="menu-item" @click="handleSecurityCenter">
            <div class="menu-icon">
              <van-icon name="shield-o" size="24" />
            </div>
            <span class="menu-label">{{ t("securityCenter") }}</span>
          </div>
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="divider"></div>

      <!-- 清除缓存 -->
      <div class="menu-section">
        <div class="menu-item clear-cache" @click="handleClearCache">
          <div class="menu-icon">
            <van-icon name="delete-o" size="20" />
          </div>
          <span class="menu-label">{{ t("clearCache") }}</span>
        </div>
      </div>

      <!-- 底部链接 -->
      <div class="footer-links">
        <span class="footer-link" @click="handlePrivacy">隐私</span>
        <span class="footer-divider">|</span>
        <span class="footer-link" @click="handleTerms">条款</span>
        <span class="footer-divider">|</span>
        <span class="footer-link" @click="handleRisk">风险</span>
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
          <div class="tabs-container">
            <div
              class="tab-item"
              :class="{ active: languageTab === 'language' }"
              @click="languageTab = 'language'"
            >
              <span class="tab-text">语言和地区</span>
              <div class="tab-indicator" v-if="languageTab === 'language'"></div>
            </div>
            <div
              class="tab-item"
              :class="{ active: languageTab === 'exchange' }"
              @click="languageTab = 'exchange'"
            >
              <span class="tab-text">汇率</span>
              <div class="tab-indicator" v-if="languageTab === 'exchange'"></div>
            </div>
          </div>
          <div class="close-btn" @click="showLanguageDialog = false">
            <van-icon name="cross" class="close-icon" />
          </div>
        </div>
        <div class="dialog-content">
          <div v-if="languageTab === 'language'" class="language-list">
            <div
              v-for="lang in languages"
              :key="lang.code"
              class="language-item"
              :class="{ active: currentLang === lang.code }"
              @click="selectLanguage(lang.code)"
            >
              <img :src="lang.flag" class="flag-icon" alt="" />
              <span class="language-name">{{ lang.name }}</span>
              <van-icon
                v-if="currentLang === lang.code"
                name="success"
                class="check-icon"
              />
            </div>
          </div>
          <div v-else class="exchange-content">
            <div class="exchange-placeholder">汇率内容</div>
          </div>
        </div>
      </div>
    </van-popup>
  </van-popup>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n, languages } from "@/i18n";
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
const languageTab = ref('language');

// 可折叠部分的状态
const expandedSections = ref({
  common: false,
  assets: false,
  trading: false,
  earn: false,
  more: false,
});

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

// 切换折叠部分
const toggleSection = (section) => {
  expandedSections.value[section] = !expandedSections.value[section];
};

// 登录注册
const handleLogin = () => {
  router.push("/login");
  handleClose();
};

const handleRegister = () => {
  router.push("/register");
  handleClose();
};

// 常用功能
const handleTutorial = () => {
  router.push("/tutorial-list");
  handleClose();
};

// 资产管理
const handleDeposit = () => {
  router.push("/deposit-select");
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
  router.push("/nft-detail");
  handleClose();
};

const handleAIStrategy = () => {
  router.push("/ai-strategy-trading");
  handleClose();
};

// 赚币与奖励
const handleDeFiLending = () => {
  router.push("/product-detail");
  handleClose();
};

const handlePortfolio = () => {
  router.push("/investment-portfolio-detail");
  handleClose();
};

const handleLockedStaking = () => {
  router.push("/locked-staking-detail");
  handleClose();
};

// 更多功能
const handleAssetCenter = () => {
  router.push("/my-assets");
  handleClose();
};

const handleAddressBook = () => {
  router.push("/address-book");
  handleClose();
};

const handleCharity = () => {
  router.push("/charity-detail");
  handleClose();
};

const handleSecurityCenter = () => {
  router.push("/security-center");
  handleClose();
};

// 语言选择
const selectLanguage = (code) => {
  setLanguage(code);
  showLanguageDialog.value = false;
  visible.value = true;
};

const handleLanguageSelect = () => {
  showLanguageDialog.value = true;
};

// 顶部操作
const handleService = () => {
  console.log("客服");
};

// 清除缓存
const handleClearCache = () => {
  console.log("清除缓存");
};

// 底部链接
const handlePrivacy = () => {
  console.log("隐私");
};

const handleTerms = () => {
  console.log("条款");
};

const handleRisk = () => {
  console.log("风险");
};
</script>

<style lang="scss" scoped>
.menu-drawer {
  width: 100%;
  height: 100%;
  background-color: #1a1a1a;
  overflow-y: auto;
  padding-bottom: 20px;
  color: #ffffff;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 32px 24px;

  .close-icon {
    font-size: 28px;
    color: #ffffff;
    cursor: pointer;
    transition: opacity 0.3s;

    &:active {
      opacity: 0.7;
    }
  }

  .header-right {
    display: flex;
    gap: 16px;
    align-items: center;

    .header-icon {
      width: 30px;
      height: 30px;
      cursor: pointer;
      display: block;
      filter: brightness(0) invert(1);
      transition: opacity 0.3s;

      &:active {
        opacity: 0.7;
      }
    }
  }
}

.auth-section {
  padding: 0 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .auth-btn {
    width: 100%;
    height: 84px;
    border-radius: 10px;
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 28px;
    line-height: 100%;
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;

    &:active {
      opacity: 0.8;
      transform: scale(0.98);
    }

    &.login-btn {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    &.register-btn {
      background: #1df388;
      color: #070210;
      border: 1px solid #1df388;
    }
  }
}

.menu-section {
  padding: 0 32px;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
    cursor: pointer;
    transition: opacity 0.3s;

    &:active {
      opacity: 0.7;
    }

    .section-title {
      font-family: PingFang SC;
      font-weight: 500;
      font-size: 28px;
      color: #ffffff;
    }

    .chevron-icon {
      font-size: 20px;
      color: #ffffff;
      transition: transform 0.3s ease;

      &.expanded {
        transform: rotate(180deg);
      }
    }
  }

  .section-content {
    padding-bottom: 16px;
    animation: slideDown 0.3s ease-out;
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 16px 0;
    cursor: pointer;
    transition: opacity 0.3s;

    &:active {
      opacity: 0.7;
    }

    .menu-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      color: #1df388;

      .nft-icon {
        font-size: 16px;
        font-weight: 600;
        color: #1df388;
      }
    }

    .menu-label {
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 26px;
      color: #ffffff;
    }

    &.clear-cache {
      .menu-icon {
        background: transparent;
        margin-right: 12px;
      }

      .menu-label {
        font-size: 26px;
      }
    }
  }
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 24px 32px;
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 24px 32px;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 24px;

  .footer-link {
    color: #949494;
    cursor: pointer;
    transition: color 0.3s;

    &:active {
      color: #1df388;
    }
  }

  .footer-divider {
    color: #949494;
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
  background: #17181A;
  position: relative;
  overflow: visible;

  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: #17181A;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    z-index: 1;
    flex-shrink: 0;

    .tabs-container {
      display: flex;
      align-items: center;
      gap: 24px;
      flex: 1;

      .tab-item {
        position: relative;
        cursor: pointer;
        padding-bottom: 8px;

        .tab-text {
          font-size: 16px;
          color: #888888;
          transition: color 0.3s;
        }

        &.active .tab-text {
          color: #ffffff;
        }

        .tab-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #00ff88;
          border-radius: 1px;
        }
      }
    }

    .close-btn {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;

      .close-icon {
        font-size: 20px;
        color: #ffffff;
      }
    }
  }

  .dialog-content {
    flex: 1;
    overflow-y: auto;
    padding: 0;
    position: relative;
    z-index: 1;
    background: #17181A;

    .language-list {
      padding: 0;
      
      .language-item {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        cursor: pointer;
        transition: background-color 0.2s;
        background-color: transparent;

        &:hover {
          background-color: rgba(255, 255, 255, 0.02);
        }

        &.active {
          background-color: rgba(255, 255, 255, 0.08);
        }

        .flag-icon {
          width: 24px;
          height: 18px;
          margin-right: 12px;
          display: block;
          object-fit: cover;
          border-radius: 2px;
          flex-shrink: 0;
        }

        .language-name {
          flex: 1;
          font-size: 16px;
          color: #ffffff;
        }

        .check-icon {
          font-size: 20px;
          color: #00ff88;
          flex-shrink: 0;
        }
      }
    }

    .exchange-content {
      padding: 24px 16px;
      color: #ffffff;
      text-align: center;

      .exchange-placeholder {
        color: #888888;
        font-size: 16px;
      }
    }
  }
}
</style>

