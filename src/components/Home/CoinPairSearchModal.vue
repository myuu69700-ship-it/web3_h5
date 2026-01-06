<template>
  <van-popup
    v-model:show="show"
    position="bottom"
    :style="{ height: '85%', borderRadius: '16px 16px 0 0' }"
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
              <div class="coin-info">
                <div class="coin-symbol">{{ coin.symbol }}</div>
                <div class="coin-pair">{{ coin.pair }}</div>
              </div>
              <div class="coin-tags">
                <span class="tag" :class="getTagClass(coin.type)">{{
                  t(coin.typeLabel)
                }}</span>
                <van-icon
                  v-if="coin.isHot"
                  name="fire-o"
                  class="fire-icon"
                  color="#ff4444"
                />
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
  },
  {
    symbol: "ETH",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: true,
  },
  {
    symbol: "ATOM",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: false,
  },
  {
    symbol: "BCH",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: true,
  },
  {
    symbol: "XRP",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: true,
  },
  {
    symbol: "LTC",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: true,
  },
  {
    symbol: "USDC",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: false,
  },
  {
    symbol: "DOGE",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: false,
  },
  {
    symbol: "FIL",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: false,
  },
  {
    symbol: "DAI",
    pair: "/USDT",
    type: "spot",
    typeLabel: "spot",
    isHot: false,
  },
  // 合約数据
  {
    symbol: "BTC",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: true,
  },
  {
    symbol: "ETH",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: true,
  },
  {
    symbol: "ATOM",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: false,
  },
  {
    symbol: "BCH",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: true,
  },
  {
    symbol: "XRP",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: true,
  },
  {
    symbol: "LTC",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: true,
  },
  {
    symbol: "DOGE",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: false,
  },
  {
    symbol: "FIL",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: false,
  },
  {
    symbol: "DAI",
    pair: "/USDT",
    type: "contract",
    typeLabel: "perpetual",
    isHot: false,
  },
  // 期權数据
  {
    symbol: "BTC",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: true,
  },
  {
    symbol: "ETH",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: true,
  },
  {
    symbol: "ATOM",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: false,
  },
  {
    symbol: "BCH",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: true,
  },
  {
    symbol: "XRP",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: true,
  },
  {
    symbol: "LTC",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: true,
  },
  {
    symbol: "DOGE",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: false,
  },
  {
    symbol: "FIL",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: false,
  },
  {
    symbol: "DAI",
    pair: "/USDT",
    type: "options",
    typeLabel: "options",
    isHot: false,
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

// 获取标签样式类
const getTagClass = (type) => {
  return {
    "tag-spot": type === "spot",
    "tag-contract": type === "contract",
    "tag-options": type === "options",
  };
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
  router.push(`/coin/${encodeURIComponent(pair)}`);
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
.coin-pair-modal {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
}

.drag-handle {
  width: 40px;
  height: 4px;
  background-color: #d4d4d4;
  border-radius: 2px;
  margin: 8px auto 0;
  cursor: pointer;
}

.search-bar {
  padding: 8px 16px 12px;

  :deep(.van-search) {
    padding: 0;
  }

  :deep(.van-search__content) {
    display: flex;
    align-items: center;
    gap: 2.13333vw;
    width: 100%;
    height: 10.13333vw;
    padding: 0 4vw;
    border-radius: 5.06667vw;
    background-color: #f3f3f3;
  }

  :deep(.van-field__left-icon) {
    margin-right: 8px;
    color: #040303;
  }

  :deep(.van-field__control) {
    font-size: 14px;
    color: #000;
  }
}

.main-tabs {
  display: flex;
  padding: 0 16px;
  border-bottom: 1px solid #ebedf0;

  .tab-item {
    // flex: 1;
    width: 42.7px;
    text-align: center;
    padding: 14px 0;
    font-size: 4vw;
    font-weight: 600;
    color: #7e7e7e;
    cursor: pointer;
    position: relative;
    transition: color 0.3s;

    &.active {
      color: #040303;
      font-weight: 600;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #040303;
      }
    }
  }
}

.sub-tabs {
  display: flex;
  padding: 12px 16px 8px;
  gap: 20px;

  .sub-tab-item {
    font-size: 13px;
    color: #969799;
    cursor: pointer;
    padding: 6px 0;
    position: relative;
    transition: color 0.3s;

    &.active {
      color: #040303;
      font-weight: 600;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #040303;
      }
    }
  }
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px;
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
    color: #040303;
    font-size: 3.73333vw;
    height: 8vw;
    line-height: 8vw;
    text-align: center;
    width: 53.33333vw;
  }
}

.coin-list {
  padding: 8px 0;
}

.coin-item {
  display: flex;
  align-items: center;
  // padding-left: 4.8vw;
  padding-right: 5.33333vw;
  width: 100%;
  height: 14.9333vw;
  font-size: 3.73333vw;

  &:active {
    background-color: #f5f5f5;
  }

  &:last-child {
    border-bottom: none;
  }
}

.star-icon {
  width: 3.73333vw;
  height: 3.73333vw;
  display: flex;
  align-items: center;
  gap: 1.06667vw;
  margin-right: 4px;
  color: rgb(142, 142, 142);
}

.coin-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
  width: 6.66667vw;
  height: 6.66667vw;
  margin-right: 2.5vw;
  border-radius: 50%;
  background-color: #f3f3f3;

  .logo-placeholder {
    font-size: 16px;
    font-weight: 600;
    color: #040303;
  }
}

.coin-info {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .coin-symbol {
    font-size: 15px;
    font-size: 3.73333vw;
    color: rgb(4, 3, 3);
    font-weight: bolder;
    margin-right: 2px
  }

  .coin-pair {
    color: #969799;
    line-height: 1.2;
    font-size: 3.2vw;
    color: rgb(126, 126, 126);
    font-weight: bolder;
  }
}

.coin-tags {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;

  .tag {
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
    white-space: nowrap;

    &.tag-spot {
      background-color: #fff3cd;
      color: #856404;
    }

    &.tag-contract {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.53333vw 1.06667vw;
      background-color: rgb(245, 229, 195);
      border-radius: 0.8vw;
      color: rgb(254, 173, 21);
      font-size: 2.66667vw;
      margin-left: 2px;
      height: 14.65px
    }

    &.tag-options {
      background-color: #fff3cd;
      color: #856404;
    }
  }

  .fire-icon {
    font-size: 16px;
    margin-left: 2px;
  }
}
</style>
