<template>
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
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "@/i18n";

const { t } = useI18n();

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
</style>
