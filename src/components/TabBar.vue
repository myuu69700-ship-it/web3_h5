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
        <img
          :src="refreshIcon"
          class="trade-icon"
          :class="{ active: props.active }"
        />
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
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "@/i18n";
import refreshIcon from "@/assets/images/refresh.svg";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

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
  return routeToTab[routeName] || "";
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
  box-shadow: 0 -1px 1.06667vw #0000001a;
  
  // 确保交易图标可以盖过底部线条
  .van-tabbar-item[name="trade"] {
    overflow: visible;
  }
}

:deep(.van-tabbar-item) {
  color: #969799;
}

:deep(.van-tabbar-item--active) {
  color: #323233;
  background: none;
}

// Trade 特殊样式 - 黑色圆形图标（始终显示）
:deep(.van-tabbar-item[name="trade"]) {
  position: relative;
  z-index: 100;
  overflow: visible;
  
  .van-tabbar-item__icon {
    background-color: #323233;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
    padding: 0;
    position: relative;
    z-index: 101;
    transform: translateY(-8px);
  }
  
  .van-badge__wrapper {
    position: relative;
    z-index: 102;
    transform: translateY(-8px);
  }
}

.trade-icon {
  width: 10.66667vw;
  height: 10.66667vw;
  margin-top: -7vw;
  color: #040303;
  position: relative;
  z-index: 103;
  // object-fit: contain;
}

:deep(.van-tabbar-item[name="trade"].van-tabbar-item--active) {
  color: #323233;
}
</style>
