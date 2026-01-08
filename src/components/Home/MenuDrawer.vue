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
        <van-icon name="arrow-left" class="back-icon" @click="handleClose" />
        <div class="header-right">
          <van-icon name="service-o" class="header-icon" @click="handleService" />
          <van-icon name="chat-o" class="header-icon" @click="handleMessage" />
        </div>
      </div>

      <!-- 用户登录/个人资料部分 -->
      <div class="user-section" @click="handleUserProfile">
        <div class="user-avatar">
          <van-icon name="user-circle-o" size="60" />
        </div>
        <div class="user-info">
          <div class="user-title">{{ t("loginImmediately") }}</div>
          <div class="user-subtitle">{{ t("personalDataAndSettings") }}</div>
        </div>
        <van-icon name="arrow" class="arrow-icon" />
      </div>

      <!-- 常用功能 -->
      <div class="menu-group">
        <div class="group-title">{{ t("commonFunctions") }}</div>
        <div class="function-item" @click="handleTutorial">
          <div class="function-icon-wrapper">
            <van-icon name="info-o" size="20" />
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
              <van-icon name="balance-o" size="20" />
            </div>
            <span class="function-label">{{ t("deposit") }}</span>
          </div>
          <div class="function-item" @click="handleWithdraw">
            <div class="function-icon-wrapper">
              <van-icon name="friends-o" size="20" />
            </div>
            <span class="function-label">{{ t("withdraw") }}</span>
          </div>
          <div class="function-item" @click="handleQuickBuy">
            <div class="function-icon-wrapper">
              <van-icon name="gold-coin-o" size="20" />
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
              <van-icon name="chart-trending-o" size="20" />
            </div>
            <span class="function-label">{{ t("options") }}</span>
          </div>
          <div class="function-item" @click="handleSpot">
            <div class="function-icon-wrapper">
              <van-icon name="share-o" size="20" />
            </div>
            <span class="function-label">{{ t("spot") }}</span>
          </div>
          <div class="function-item" @click="handleContract">
            <div class="function-icon-wrapper">
              <van-icon name="apps-o" size="20" />
            </div>
            <span class="function-label">{{ t("contract") }}</span>
          </div>
          <div class="function-item" @click="handleNFT">
            <div class="function-icon-wrapper">
              <van-icon name="photo-o" size="20" />
            </div>
            <span class="function-label">{{ t("nft") }}</span>
          </div>
        </div>
        <div class="function-row">
          <div class="function-item" @click="handleAIStrategy">
            <div class="function-icon-wrapper">
              <van-icon name="setting-o" size="20" />
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
              <van-icon name="like-o" size="20" />
            </div>
            <span class="function-label">{{ t("defiLending") }}</span>
          </div>
          <div class="function-item" @click="handlePortfolio">
            <div class="function-icon-wrapper">
              <van-icon name="cluster-o" size="20" />
            </div>
            <span class="function-label">{{ t("investmentPortfolio") }}</span>
          </div>
          <div class="function-item" @click="handleLockedStaking">
            <div class="function-icon-wrapper">
              <van-icon name="lock" size="20" />
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
              <van-icon name="shield-o" size="20" />
            </div>
            <span class="function-label">{{ t("assetCenter") }}</span>
          </div>
          <div class="function-item" @click="handleAddressBook">
            <div class="function-icon-wrapper">
              <van-icon name="notes-o" size="20" />
            </div>
            <span class="function-label">{{ t("addressBook") }}</span>
          </div>
          <div class="function-item" @click="handleCharity">
            <div class="function-icon-wrapper">
              <van-icon name="like-o" size="20" />
            </div>
            <span class="function-label">{{ t("charity") }}</span>
          </div>
          <div class="function-item" @click="handlePlatformNotifications">
            <div class="function-icon-wrapper">
              <van-icon name="bell-o" size="20" />
            </div>
            <span class="function-label">{{ t("platformNotifications") }}</span>
          </div>
        </div>
        <div class="function-row">
          <div class="function-item" @click="handleSecurityCenter">
            <div class="function-icon-wrapper">
              <van-icon name="shield-o" size="20" />
            </div>
            <span class="function-label">{{ t("securityCenter") }}</span>
          </div>
          <div class="function-item" @click="handleLanguageSelect">
            <div class="function-icon-wrapper">
              <van-icon name="globe-o" size="20" />
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
  </van-popup>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "@/i18n";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const router = useRouter();
const { t } = useI18n();

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
  // 快捷买币逻辑
  console.log("快捷买币");
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
  // DeFi借币逻辑
  console.log("DeFi借币");
  handleClose();
};

const handlePortfolio = () => {
  // 投资组合逻辑
  console.log("投资组合");
  handleClose();
};

const handleLockedStaking = () => {
  // 锁仓赚币逻辑
  console.log("锁仓赚币");
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
  // 慈善逻辑
  console.log("慈善");
  handleClose();
};

const handlePlatformNotifications = () => {
  // 平台通知逻辑
  console.log("平台通知");
  handleClose();
};

const handleSecurityCenter = () => {
  // 安全中心逻辑
  console.log("安全中心");
  handleClose();
};

const handleLanguageSelect = () => {
  // 语言选择逻辑 - 可以触发语言选择弹窗
  console.log("语言选择");
  handleClose();
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
  border-bottom: 1px solid #ebedf0;

  .back-icon {
    font-size: 20px;
    color: #040303;
    cursor: pointer;
  }

  .header-right {
    display: flex;
    gap: 16px;

    .header-icon {
      font-size: 20px;
      color: #040303;
      cursor: pointer;
    }
  }
}

.user-section {
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  border-bottom: 1px solid #ebedf0;

  .user-avatar {
    margin-right: 12px;
    color: #040303;
  }

  .user-info {
    flex: 1;

    .user-title {
      font-size: 18px;
      font-weight: 500;
      color: #040303;
      margin-bottom: 4px;
    }

    .user-subtitle {
      font-size: 14px;
      color: #969799;
    }
  }

  .arrow-icon {
    font-size: 16px;
    color: #969799;
  }
}

.menu-group {
  padding: 16px 20px 0;

  .group-title {
    font-size: 16px;
    font-weight: 600;
    color: #040303;
    margin-bottom: 12px;
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
    cursor: pointer;
    min-width: 60px;
    padding: 8px 0;
    flex: 0 0 auto;

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
    }

    .function-label {
      font-size: 12px;
      color: #040303;
      text-align: center;
      line-height: 1.4;
    }

    &:active {
      opacity: 0.7;
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
      font-size: 14px;
    }
  }
}
</style>
