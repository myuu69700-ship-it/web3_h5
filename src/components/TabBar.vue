<template>
  <van-tabbar v-model="active" fixed placeholder @change="onChange">
    <van-tabbar-item name="home" icon="home-o">
      {{ t("home") }}
    </van-tabbar-item>
    <van-tabbar-item name="market" icon="chart-trending-o">
      {{ t("market") }}
    </van-tabbar-item>
    <van-tabbar-item name="trade">
      <template #icon="props">
        <img :src="refreshIcon" class="trade-icon" :class="{ active: props.active }" />
      </template>
      {{ t("trade") }}
    </van-tabbar-item>
    <van-tabbar-item name="explore" icon="browsing-history-o">
      {{ t("explore") }}
    </van-tabbar-item>
    <van-tabbar-item name="asset" icon="balance-list-o">
      {{ t("assets") }}
    </van-tabbar-item>
  </van-tabbar>
  <TradeModal v-model:show="showTradeModal" />
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "@/i18n";
import refreshIcon from "@/assets/images/refresh.svg";
import TradeModal from "./TradeModal.vue";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

// 交易弹窗显示状态
const showTradeModal = ref(false);

// 路由名称到 tabbar 名称的映射
const routeToTab = {
  Home: "home",
  Market: "market",
  Trade: "trade",
  Explore: "explore",
  Asset: "asset",
};

// 根据当前路由设置激活的 tab
const getActiveTab = (routeName) => {
  const tab = routeToTab[routeName] || "";
  // 如果当前在 Trade 路由，不激活 trade tab
  if (tab === "trade") {
    return "";
  }
  return tab;
};

const active = ref(getActiveTab(route.name));

// 监听路由变化，更新激活的 tab
watch(
  () => route.name,
  (newName) => {
    const newActive = getActiveTab(newName);
    // 如果路由不在映射中（如详情页），设置为空字符串，取消所有选中状态
    active.value = newActive;
  }
);

// tabbar 切换事件
const onChange = (name) => {
  const tabToRoute = {
    home: "/",
    market: "/market",
    trade: "/trade",
    explore: "/explore",
    asset: "/asset",
  };

  // 如果点击的是交易按钮，显示弹窗而不是跳转
  if (name === "trade") {
    showTradeModal.value = true;
    // 恢复之前的 active 状态，因为 van-tabbar 的 v-model 已经自动更新了
    nextTick(() => {
      active.value = getActiveTab(route.name);
    });
    return;
  }

  if (tabToRoute[name]) {
    // 如果当前路径与目标路径不同，则跳转
    if (route.path !== tabToRoute[name]) {
      router.push(tabToRoute[name]);
    }
    // 更新激活状态
    active.value = name;
  }
};
</script>

<style lang="scss" scoped>
:deep(.van-tabbar) {
  width: 100%;
  height: 17.6vw;
  position: fixed;
  z-index: 99;
  left: 0;
  bottom: 0;
  background-color: #141517;
  border: none !important;
  border-top: none !important;
  border-bottom: none !important;
  border-left: none !important;
  border-right: none !important;

  // 移除伪元素边框
  &::before,
  &::after {
    display: none !important;
    border: none !important;
  }

  // 确保交易图标可以盖过底部线条
  .van-tabbar-item[name="trade"] {
    overflow: visible;
  }
}

:deep(.van-tabbar-item) {
  // color: #969799;
  border: none !important;
  border-top: none !important;
  border-bottom: none !important;
  border-left: none !important;
  border-right: none !important;

  .van-tabbar-item__icon {
    width: 32px;
    height: 32px;
    font-size: 32px;
  }

  .van-tabbar-item__text {
    font-family: PingFang SC;
    font-weight: 500;
    font-style: Medium;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0%;
    color: #A4A4A4;
  }

  // 移除伪元素边框
  &::before,
  &::after {
    display: none !important;
    border: none !important;
  }
}

:deep(.van-tabbar-item--active) {
  color: #323233;
  background: none;
  border: none !important;
  border-top: none !important;
  border-bottom: none !important;
  border-left: none !important;
  border-right: none !important;

  // 移除伪元素边框
  &::before,
  &::after {
    display: none !important;
    border: none !important;
  }
}

// Trade 特殊样式 - 与其他 tab 保持一致
:deep(.van-tabbar-item[name="trade"]) {
  position: relative;
  z-index: 100;
  overflow: visible;

  // 确保图标容器与其他 tab 一致
  .van-tabbar-item__icon {
    font-size: 22px;
    width: 32px;
    height: 32px;
  }
}

.trade-icon {
  width: 32px;
  height: 32px;
  color: #040303;
  position: relative;
}

:deep(.van-tabbar-item[name="trade"].van-tabbar-item--active) {
  color: #323233;
}
</style>
