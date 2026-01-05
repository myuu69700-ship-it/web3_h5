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
const active = ref(routeToTab[route.name] || "home");

// 监听路由变化，更新激活的 tab
watch(
  () => route.name,
  (newName) => {
    if (routeToTab[newName]) {
      active.value = routeToTab[newName];
    }
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

  if (tabToRoute[name] && route.path !== tabToRoute[name]) {
    router.push(tabToRoute[name]);
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
  }
}

.trade-icon {
  width: 10.66667vw;
  height: 10.66667vw;
  margin-top: -6vw;
  color: #040303;
  object-fit: contain;
  z-index: 99;
}

:deep(.van-tabbar-item[name="trade"].van-tabbar-item--active) {
  color: #323233;
}
</style>
