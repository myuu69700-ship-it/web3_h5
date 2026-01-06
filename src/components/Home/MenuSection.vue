<template>
  <div class="menu-section">
    <!-- 交易市場 -->
    <div class="menu-item">
      <div class="menu-header" @click="toggleMenu('tradingMarket')">
        <span class="menu-title">{{ t("tradingMarket") }}</span>
        <img
          :src="expandedMenus.tradingMarket ? jianIcon : jiaIcon"
          class="menu-toggle-icon"
          alt=""
        />
      </div>
      <div v-if="expandedMenus.tradingMarket" class="menu-content">
        <div class="menu-sub-item" @click="handleMarketItemClick('spot')">{{ t("spot") }}</div>
        <div class="menu-sub-item" @click="handleMarketItemClick('perpetual')">{{ t("perpetual") }}</div>
        <div class="menu-sub-item" @click="handleMarketItemClick('options')">{{ t("options") }}</div>
      </div>
    </div>

    <!-- 資產管理 -->
    <div class="menu-item">
      <div class="menu-header" @click="toggleMenu('assetManagement')">
        <span class="menu-title">{{ t("assetManagement") }}</span>
        <img
          :src="expandedMenus.assetManagement ? jianIcon : jiaIcon"
          class="menu-toggle-icon"
          alt=""
        />
      </div>
      <div v-if="expandedMenus.assetManagement" class="menu-content">
        <div class="menu-sub-item" @click="handleMyAssetsClick">{{ t("myAssets") }}</div>
        <div class="menu-sub-item" @click="handleDepositClick">{{ t("deposit") }}</div>
        <div class="menu-sub-item" @click="handleWithdrawClick">{{ t("withdraw") }}</div>
        <div class="menu-sub-item" @click="handleTransferClick">{{ t("transfer") }}</div>
        <div class="menu-sub-item">{{ t("orderCenter") }}</div>
      </div>
    </div>

    <!-- 金融理財 -->
    <div class="menu-item">
      <div class="menu-header" @click="toggleMenu('financialManagement')">
        <span class="menu-title">{{ t("financialManagement") }}</span>
        <img
          :src="expandedMenus.financialManagement ? jianIcon : jiaIcon"
          class="menu-toggle-icon"
          alt=""
        />
      </div>
      <div v-if="expandedMenus.financialManagement" class="menu-content">
        <div class="menu-sub-item">{{ t("products") }}</div>
      </div>
    </div>

    <!-- 支持 -->
    <div class="menu-item">
      <div class="menu-header" @click="toggleMenu('support')">
        <span class="menu-title">{{ t("support") }}</span>
        <img
          :src="expandedMenus.support ? jianIcon : jiaIcon"
          class="menu-toggle-icon"
          alt=""
        />
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
        <img
          :src="expandedMenus.policies ? jianIcon : jiaIcon"
          class="menu-toggle-icon"
          alt=""
        />
      </div>
      <div v-if="expandedMenus.policies" class="menu-content">
        <div class="menu-sub-item">{{ t("termsOfService") }}</div>
        <div class="menu-sub-item">{{ t("privacyPolicy") }}</div>
        <div class="menu-sub-item">{{ t("antiMoneyLaundering") }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "@/i18n";
import jiaIcon from "@/assets/images/jia.svg";
import jianIcon from "@/assets/images/jian.svg";

const router = useRouter();
const { t } = useI18n();

// 菜单展开状态
const expandedMenus = ref({
  tradingMarket: false,
  assetManagement: false,
  financialManagement: false,
  support: false,
  policies: false,
});

// 切换菜单展开/折叠
const toggleMenu = (menuName) => {
  expandedMenus.value[menuName] = !expandedMenus.value[menuName];
};

// 处理交易市场子项点击
const handleMarketItemClick = (type) => {
  // 跳转到图表详情页，使用默认币对 BTC/USDT，并通过查询参数传递类型
  router.push({
    path: `/coin/${encodeURIComponent('BTC/USDT')}`,
    query: { type }
  });
};

// 处理我的资产点击
const handleMyAssetsClick = () => {
  router.push('/my-assets');
};

// 处理储值点击
const handleDepositClick = () => {
  router.push('/deposit-detail');
};

// 处理提现点击
const handleWithdrawClick = () => {
  router.push('/withdraw-detail');
};
// 处理划转点击
const handleTransferClick =() => {
  router.push('/transfer-detail')
}
</script>

<style lang="scss" scoped>
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
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4.26667vw;
        font-size: 16px;
        font-weight: 500;
        color: #040303;
      }

      .menu-toggle-icon {
        width: 3.2vw;
        height: 3.2vw;
        object-fit: contain;
      }
    }

    .menu-content {
      padding: 0 16px 16px 16px;

      .menu-sub-item {
        padding: 12px 0;
        font-size: 14px;
        color: #323233;
        border-bottom: 1px solid #ebedf0;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: #f7f8fa;
        }

        &:active {
          background-color: #ebedf0;
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
