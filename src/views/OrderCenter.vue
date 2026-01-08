<template>
  <div class="order-center">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="帳單"
      fixed
      placeholder
      left-arrow
      @click-left="goBack"
    />

    <div class="content">
      <!-- 标签栏 -->
      <div class="tabs-container">
        <div class="tabs-wrapper" ref="tabsWrapperRef">
          <div
            v-for="(tab, index) in tabs"
            :key="tab.value"
            class="tab-item"
            :class="{ active: activeTab === tab.value }"
            @click="handleTabClick(tab.value)"
          >
            {{ tab.label }}
          </div>
        </div>
      </div>

      <!-- 表格头部 -->
      <div v-if="shouldShowTableHeader" class="table-header">
        <div class="header-cell type-cell">類型</div>
        <div class="header-cell currency-cell">幣種</div>
        <div class="header-cell amount-cell">帳變金額</div>
      </div>

      <!-- 数据列表 -->
      <div class="table-content">
        <div v-if="orderList.length > 0" class="order-list">
          <div v-for="order in orderList" :key="order.id" class="order-item">
            <div class="table-cell type-cell">{{ order.type }}</div>
            <div class="table-cell currency-cell">{{ order.currency }}</div>
            <div
              class="table-cell amount-cell"
              :class="{
                positive: order.amount > 0,
                negative: order.amount < 0,
              }"
            >
              {{ order.amount > 0 ? "+" : "" }}{{ order.amount }}
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-else class="empty-state">
          <div class="empty-icon">
            <img :src="nomoreImage" alt="暂无数据" />
          </div>
          <div class="empty-text">暫無數據</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import nomoreImage from "@/assets/images/nomore.png";

const router = useRouter();

// 标签列表
const tabs = ref([
  { label: "全部", value: "all" },
  { label: "儲值記錄", value: "deposit" },
  { label: "提幣記錄", value: "withdraw" },
  { label: "合約", value: "contract" },
  { label: "AI", value: "ai" },
  { label: "現貨", value: "spot" },
  { label: "質押挖礦", value: "staking" },
]);

const activeTab = ref("all");
const tabsWrapperRef = ref(null);

// 订单列表
const orderList = ref([]);

// 判断是否显示表格头部
// 当选中"合约"及后面的tab时，不显示table-header
const shouldShowTableHeader = computed(() => {
  const hideHeaderTabs = ["contract", "ai", "spot", "staking"];
  return !hideHeaderTabs.includes(activeTab.value);
});

// 处理标签点击
const handleTabClick = (value) => {
  activeTab.value = value;
  // 这里可以根据选中的标签加载对应的数据
  loadOrderData(value);
};

// 加载订单数据
const loadOrderData = (type) => {
  // 模拟数据加载，实际应该调用API
  // 这里暂时设置为空数组，显示空状态
  orderList.value = [];
};

// 返回
const goBack = () => {
  router.back();
};

onMounted(() => {
  loadOrderData(activeTab.value);
});
</script>

<style lang="scss" scoped>
.order-center {
  min-height: 100vh;
  background-color: #ffffff;
  padding-bottom: 60px;

  // 设置导航栏头部高度
  :deep(.van-nav-bar) {
    height: 61.39px;
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }

  // 设置导航栏内容区域垂直居中
  :deep(.van-nav-bar__content) {
    height: 61.39px;
    // line-height: 61.39px;
    // display: flex;
    // align-items: center;
  }

  // 左侧返回按钮区域垂直居中
  :deep(.van-nav-bar__left) {
    // display: flex;
    // align-items: center;
    height: 100%;
  }

  // 标题区域垂直居中
  :deep(.van-nav-bar__title) {
    // display: flex;
    // align-items: center;
    height: 100%;
    line-height: normal;
    line-height: 61.39px;
  }

  // 右侧区域垂直居中
  :deep(.van-nav-bar__right) {
    // display: flex;
    // align-items: center;
    height: 100%;
  }

  // 设置占位符高度（placeholder）
  :deep(.van-nav-bar__placeholder) {
    height: 61.39px;
  }
}

.content {
  padding: 0;
}

// 标签栏容器
.tabs-container {
  position: relative;
  background-color: #ffffff;
  border-bottom: 1px solid #ebedf0;
  overflow: hidden;

  .tabs-wrapper {
    display: flex;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    // padding: 10px 16px;

    // 隐藏滚动条但保持滚动功能
    scrollbar-width: none; // Firefox
    -ms-overflow-style: none; // IE and Edge

    &::-webkit-scrollbar {
      display: none; // Chrome, Safari, Opera
    }

    .tab-item {
      flex-shrink: 0;
      padding: 12px 16px;
      font-size: 4.26667vw;
      color: #7e7e7e;
      cursor: pointer;
      cursor: pointer;
      white-space: nowrap;
      position: relative;
      transition: color 0.2s;

      &:active {
        opacity: 0.7;
      }

      &.active {
        color: #040303;
        font-weight: 500;

        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 16px;
          right: 16px;
          height: 2px;
          background-color: #323233;
        }
      }
    }
  }
}

// 表格头部
.table-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #ffffff;
  // border-bottom: 1px solid #ebedf0;

  .header-cell {
    color: #040303;
    font-weight: 500;
    font-size: 3.2vw;

    &.type-cell {
      flex: 1;
      text-align: left;
    }

    &.currency-cell {
      flex: 1;
      text-align: center;
    }

    &.amount-cell {
      flex: 1;
      text-align: right;
    }
  }
}

// 表格内容
.table-content {
  min-height: calc(100vh - 200px);

  .order-list {
    .order-item {
      display: flex;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #f7f8fa;

      .table-cell {
        font-size: 14px;
        color: #323233;

        &.type-cell {
          flex: 1;
          text-align: left;
        }

        &.currency-cell {
          flex: 1;
          text-align: center;
        }

        &.amount-cell {
          flex: 1;
          text-align: right;
          font-weight: 500;

          &.positive {
            color: #07c160;
          }

          &.negative {
            color: #ee0a24;
          }
        }
      }
    }
  }

  // 空状态
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    padding: 80px 20px;
    min-height: 400px;

    .empty-icon {
      width: 24.26667vw;
      height: 24.26667vw;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .empty-text {
      font-weight: 700;
      color: #040303;
      font-size: 3.73333vw;
    }
  }
}
</style>
