<template>
  <van-popup
    v-model:show="show"
    position="bottom"
    :style="popupStyle"
    @close="handleClose"
  >
    <div class="coin-pair-modal">
      <!-- 顶部拖拽条 -->
      <div class="drag-handle"></div>

      <!-- 搜索框 -->
      <div class="search-bar">
        <van-search
          v-model="searchKeyword"
          :placeholder="t('searchCoinPair')"
          @search="handleSearch"
        />
      </div>

      <!-- 主标签页 -->
      <div class="main-tabs">
        <div
          v-for="tab in mainTabs"
          :key="tab.key"
          class="tab-item"
          :class="{ active: activeMainTab === tab.key }"
          @click="activeMainTab = tab.key"
        >
          {{ t(tab.label) }}
        </div>
      </div>

      <!-- 子标签页（仅在合約和期權时显示） -->
      <div v-if="showSubTabs" class="sub-tabs">
        <div
          v-for="subTab in subTabs"
          :key="subTab.key"
          class="sub-tab-item"
          :class="{ active: activeSubTab === subTab.key }"
          @click="activeSubTab = subTab.key"
        >
          {{ t(subTab.label) }}
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-area">
        <!-- 自選标签显示空状态 -->
        <div v-if="activeMainTab === 'favorites'" class="empty-state">
          <img :src="nomoreImage" alt="no data" class="empty-icon" />
          <div class="empty-text">{{ t("noData") }}</div>
        </div>

        <!-- 其他标签显示交易对列表 -->
        <div v-else>
          <!-- 有数据时显示列表 -->
          <div v-if="filteredCoinList.length > 0" class="coin-list">
            <div
              v-for="coin in filteredCoinList"
              :key="coin.symbol"
              class="coin-item"
              @click="handleSelectCoin(coin)"
            >
              <van-icon
                name="star-o"
                class="star-icon"
                @click.stop="toggleFavorite(coin)"
              />
              <div class="coin-logo">
                <div class="logo-placeholder">
                  {{ coin.symbol.substring(0, 1) }}
                </div>
              </div>
              <div class="coin-main">
                <div class="coin-info">
                  <div class="coin-symbol">{{ coin.symbol }}</div>
                  <div class="coin-pair">{{ coin.pair }}</div>
                  <van-icon
                    v-if="coin.isHot"
                    name="fire-o"
                    class="fire-icon"
                  />
                </div>
                <div class="coin-quote">
                  <div class="coin-price">{{ formatPrice(coin.price) }}</div>
                  <div
                    class="coin-change"
                    :class="{
                      positive: Number(coin.changePct) >= 0,
                      negative: Number(coin.changePct) < 0,
                    }"
                  >
                    {{ formatChangePct(coin.changePct) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 无数据时显示空状态 -->
          <div v-else class="empty-state">
            <img :src="nomoreImage" alt="no data" class="empty-icon" />
            <div class="empty-text">{{ t("noData") }}</div>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "@/i18n";
import nomoreImage from "@/assets/images/nomore.png";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "select"]);

const { t } = useI18n();
const router = useRouter();

const show = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const popupStyle = computed(() => ({
  height: "595px",
  borderRadius: "40px 40px 0 0",
  background: "#17181A",
}));

const searchKeyword = ref("");

// 从 localStorage 读取保存的 tab 状态，如果没有则使用默认值
const getSavedMainTab = () => {
  const saved = localStorage.getItem("coinPairSearchMainTab");
  return saved || "favorites";
};

const getSavedSubTab = () => {
  const saved = localStorage.getItem("coinPairSearchSubTab");
  return saved || "cryptocurrency";
};

const activeMainTab = ref(getSavedMainTab());
const activeSubTab = ref(getSavedSubTab());

// 主标签配置
const mainTabs = [
  { key: "favorites", label: "favorites" },
  { key: "spot", label: "spot" },
  { key: "contract", label: "contract" },
  { key: "options", label: "options" },
];

// 子标签配置
const subTabs = [
  { key: "cryptocurrency", label: "cryptocurrency" },
  { key: "forex", label: "forex" },
];

// 是否显示子标签
const showSubTabs = computed(() => {
  return (
    activeMainTab.value === "contract" || activeMainTab.value === "options"
  );
});

// 模拟交易对数据
const coinList = ref([
  {
    symbol: "BTC",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: true,
    price: 91276.36,
    changePct: -0.42,
  },
  {
    symbol: "ETH",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: true,
    price: 3131.62,
    changePct: -0.42,
  },
  {
    symbol: "ATOM",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: false,
    price: 91276.36,
    changePct: 0.15,
  },
  {
    symbol: "BCH",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: true,
    price: 610.4,
    changePct: -1.26,
  },
  {
    symbol: "XRP",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: true,
    price: 2.0646,
    changePct: -1.31,
  },
  {
    symbol: "LTC",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: true,
    price: 76.53,
    changePct: -0.79,
  },
  {
    symbol: "USDC",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: false,
    price: 1.0,
    changePct: 0.02,
  },
  {
    symbol: "DOGE",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: false,
    price: 0.1386,
    changePct: 0.21,
  },
  {
    symbol: "FIL",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: false,
    price: 1.484,
    changePct: -0.06,
  },
  {
    symbol: "DAI",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: false,
    price: 1.0013,
    changePct: 0.02,
  },
  // 合約数据
  {
    symbol: "BTC",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: true,
    price: 92073.75,
    changePct: 1.49,
  },
  {
    symbol: "ETH",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: true,
    price: 3131.62,
    changePct: -0.42,
  },
  {
    symbol: "ATOM",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: false,
    price: 11.23,
    changePct: 0.15,
  },
  {
    symbol: "BCH",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: true,
    price: 610.4,
    changePct: -1.26,
  },
  {
    symbol: "XRP",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: true,
    price: 2.0646,
    changePct: -1.31,
  },
  {
    symbol: "LTC",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: true,
    price: 76.53,
    changePct: -0.79,
  },
  {
    symbol: "DOGE",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: false,
    price: 0.1386,
    changePct: 0.21,
  },
  {
    symbol: "FIL",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: false,
    price: 1.484,
    changePct: -0.06,
  },
  {
    symbol: "DAI",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: false,
    price: 1.0013,
    changePct: 0.02,
  },
  // 期權数据
  {
    symbol: "BTC",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: true,
    price: 92073.75,
    changePct: 1.49,
  },
  {
    symbol: "ETH",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: true,
    price: 3131.62,
    changePct: -0.42,
  },
  {
    symbol: "ATOM",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: false,
    price: 11.23,
    changePct: 0.15,
  },
  {
    symbol: "BCH",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: true,
    price: 610.4,
    changePct: -1.26,
  },
  {
    symbol: "XRP",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: true,
    price: 2.0646,
    changePct: -1.31,
  },
  {
    symbol: "LTC",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: true,
    price: 76.53,
    changePct: -0.79,
  },
  {
    symbol: "DOGE",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: false,
    price: 0.1386,
    changePct: 0.21,
  },
  {
    symbol: "FIL",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: false,
    price: 1.484,
    changePct: -0.06,
  },
  {
    symbol: "DAI",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: false,
    price: 1.0013,
    changePct: 0.02,
  },
]);

// 过滤后的交易对列表
const filteredCoinList = computed(() => {
  let list = coinList.value.filter((coin) => coin.type === activeMainTab.value);

  // 如果有搜索关键词，进行过滤
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toUpperCase();
    list = list.filter(
      (coin) =>
        coin.symbol.toUpperCase().includes(keyword) ||
        coin.pair.toUpperCase().includes(keyword)
    );
  }

  return list;
});

const formatPrice = (v) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return "--";
  return n.toLocaleString(undefined, {
    minimumFractionDigits: n >= 1000 ? 2 : n >= 1 ? 2 : 4,
    maximumFractionDigits: n >= 1000 ? 2 : n >= 1 ? 2 : 4,
  });
};

const formatChangePct = (v) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return "--";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
};

// 切换收藏
const toggleFavorite = (coin) => {
  console.log("Toggle favorite:", coin);
  // 这里可以添加收藏逻辑
};

// 选择交易对
const handleSelectCoin = (coin) => {
  emit("select", coin);
  show.value = false;
  // 跳转到详情页
  // coin.pair 格式可能是 "/USDT" 或 "BTC/USDT"，需要处理
  let pair = coin.pair || '/USDT';
  if (pair.startsWith('/')) {
    pair = `${coin.symbol}${pair}`;
  }
  // 根据 coin.type 确定类型参数：spot -> spot, contract -> perpetual, options -> options
  const typeMap = {
    spot: 'spot',
    contract: 'perpetual',
    options: 'options'
  };
  const typeParam = typeMap[coin.type] || 'spot';
  router.push(`/coin/${encodeURIComponent(pair)}?type=${typeParam}`);
};

// 搜索
const handleSearch = (value) => {
  console.log("Search:", value);
};

// 关闭弹窗
const handleClose = () => {
  searchKeyword.value = "";
  // 保存当前的 tab 状态到 localStorage（虽然 watch 已经保存了，但这里再保存一次确保数据不丢失）
  saveTabState();
};

// 保存 tab 状态的函数
const saveTabState = () => {
  localStorage.setItem("coinPairSearchMainTab", activeMainTab.value);
  localStorage.setItem("coinPairSearchSubTab", activeSubTab.value);
};

// 监听主标签切换，保存状态
watch(activeMainTab, (newTab) => {
  // 保存主标签状态
  saveTabState();
  // 如果切换到合约或期权，恢复之前保存的子标签状态
  if (newTab === "contract" || newTab === "options") {
    // 恢复保存的子标签状态
    activeSubTab.value = getSavedSubTab();
  }
});

// 监听子标签切换，保存状态
watch(activeSubTab, () => {
  saveTabState();
});

// 监听弹窗打开，恢复保存的 tab 状态
watch(show, (isOpen) => {
  if (isOpen) {
    // 弹窗打开时，恢复保存的 tab 状态
    activeMainTab.value = getSavedMainTab();
    activeSubTab.value = getSavedSubTab();
  }
});
</script>

<style lang="scss" scoped>
:deep(.van-popup) {
  background: #17181a !important;
  border-top-left-radius: 40px !important;
  border-top-right-radius: 40px !important;
}

:deep(.van-search__action) {
  color: #8c8f96;
}

.coin-pair-modal {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #17181a;
  border-radius: 40px 40px 0 0;
  overflow: hidden;
}

.drag-handle {
  width: 40px;
  height: 4px;
  background-color: #2b2d31;
  border-radius: 2px;
  margin: 18px auto 0;
  cursor: pointer;
}

.search-bar {
  padding: 18px 32px 20px;

  :deep(.van-search) {
    padding: 0;
    background: transparent;
  }

  :deep(.van-search__content) {
    display: flex;
    align-items: center;
    gap: 2.13333vw;
    width: 100%;
    height: 88px;
    padding: 0 28px;
    border-radius: 20px;
    background-color: #1f2023;
  }

  :deep(.van-field__left-icon) {
    margin-right: 8px;
    color: #6b6f76;
  }

  :deep(.van-field__control) {
    font-size: 28px;
    color: #f1f1f1;
  }

  :deep(.van-field__control::placeholder) {
    color: #6b6f76;
  }
}

.main-tabs {
  display: flex;
  padding: 0 32px;
  border-bottom: 1px solid #2a2c30;

  .tab-item {
    // flex: 1;
    width: auto;
    text-align: center;
    padding: 20px 0 22px;
    font-size: 28px;
    font-weight: 600;
    color: #8c8f96;
    cursor: pointer;
    position: relative;
    transition: color 0.3s;
    margin-right: 44px;

    &.active {
      color: #f1f1f1;
      font-weight: 600;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 6px;
        background-color: #1df388;
        border-radius: 999px;
      }
    }
  }
}

.sub-tabs {
  display: flex;
  padding: 16px 32px 12px;
  gap: 36px;
  border-bottom: 1px solid #2a2c30;

  .sub-tab-item {
    font-size: 26px;
    color: #8c8f96;
    cursor: pointer;
    padding: 6px 0;
    position: relative;
    transition: color 0.3s;

    &.active {
      color: #f1f1f1;
      font-weight: 600;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 6px;
        background-color: #1df388;
        border-radius: 999px;
      }
    }
  }
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 0 0 20px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  margin-top: 70px;
  height: 100%;
  min-height: 400px;

  .empty-icon {
    width: 24.26667vw;
    height: 24.26667vw;
    object-fit: contain;
    margin-bottom: 5px;
  }

  .empty-text {
    font-weight: 700;
    color: #8c8f96;
    font-size: 28px;
    height: 8vw;
    line-height: 8vw;
    text-align: center;
    width: 53.33333vw;
  }
}

.coin-list {
  padding: 8px 0 0;
}

.coin-item {
  display: flex;
  align-items: center;
  padding: 0 32px;
  width: 100%;
  height: 112px;
  font-size: 28px;
  border-bottom: 1px solid #24262a;

  &:active {
    background-color: #1f2023;
  }

  &:last-child {
    border-bottom: none;
  }
}

.star-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  gap: 1.06667vw;
  margin-right: 12px;
  color: #5b5f66;
}

.coin-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  margin-right: 18px;
  border-radius: 50%;
  background-color: #222428;

  .logo-placeholder {
    font-size: 28px;
    font-weight: 600;
    color: #f1f1f1;
  }
}

.coin-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
}

.coin-info {
  display: flex;
  align-items: center;
  min-width: 0;

  .coin-symbol {
    font-size: 28px;
    color: #f1f1f1;
    font-weight: 700;
    margin-right: 8px;
    white-space: nowrap;
  }

  .coin-pair {
    line-height: 1.2;
    font-size: 24px;
    color: #8c8f96;
    font-weight: 600;
    white-space: nowrap;
  }
}

.fire-icon {
  font-size: 26px;
  margin-left: 8px;
  color: #ff4444;
}

.coin-quote {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 6px;
  flex-shrink: 0;

  .coin-price {
    font-size: 28px;
    color: #f1f1f1;
    font-weight: 600;
  }

  .coin-change {
    font-size: 22px;
    font-weight: 600;

    &.positive {
      color: #1df388;
    }

    &.negative {
      color: #ff5b5a;
    }
  }
}
</style>

