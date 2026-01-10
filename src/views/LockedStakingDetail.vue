<template>
  <div class="locked-staking-detail">
    <!-- 顶部导航栏 -->
    <div class="nav-bar">
      <van-icon name="arrow-left" class="back-icon" @click="goBack" />
      <div class="nav-title">{{ t("lockedStaking") }}</div>
      <div class="record-btn" @click="handleRecord">記錄</div>
    </div>

    <!-- 主要内容区域 -->
    <div class="content">
      <!-- 顶部标题和图标区域 -->
      <div class="hero-section">
        <div class="hero-text">
          <h1 class="main-title">鎖定並賺取硬幣</h1>
          <p class="subtitle">全球領先的智慧投資平台</p>
        </div>
        <div class="hero-icon">
          <div class="wallet-icon">
            <div class="bitcoin-symbol">₿</div>
            <div class="coins">
              <span class="coin coin-1">₿</span>
              <span class="coin coin-2">₿</span>
              <span class="coin coin-3">₿</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 搜索栏 -->
      <div class="search-section">
        <van-search
          v-model="searchValue"
          placeholder="搜尋投資產品"
          shape="round"
          @search="onSearch"
        />
      </div>

      <!-- 推荐投资区域 -->
      <div class="recommended-section">
        <div class="section-title">
          <span class="bullet">■</span>
          <span>推薦投資</span>
        </div>

        <div class="product-list">
          <div
            v-for="product in products"
            :key="product.id"
            class="product-card"
            @click="handleProductClick(product)"
          >
            <div class="product-icon" :class="product.iconClass">
              <span v-if="product.icon === 'usdc'">$</span>
              <span v-else-if="product.icon === 'sol'">●</span>
              <span v-else-if="product.icon === 'eth'">◆</span>
              <span v-else-if="product.icon === 'btc'">₿</span>
            </div>
            <div class="product-info">
              <div class="product-name">
                <span class="name">{{ product.name }}</span>
                <span class="type">{{ product.type }}</span>
              </div>
            </div>
            <div class="product-rate">
              {{ product.rate }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "@/i18n";

const router = useRouter();
const { t } = useI18n();

const searchValue = ref("");

const products = ref([
  {
    id: 1,
    name: "USDC",
    type: "定期",
    rate: "0.2%~0.45%",
    icon: "usdc",
    iconClass: "icon-usdc",
  },
  {
    id: 2,
    name: "SOL",
    type: "定期",
    rate: "0.2%~0.62%",
    icon: "sol",
    iconClass: "icon-sol",
  },
  {
    id: 3,
    name: "ETH",
    type: "定期",
    rate: "0.2%~0.61%",
    icon: "eth",
    iconClass: "icon-eth",
  },
  {
    id: 4,
    name: "BTC",
    type: "定期",
    rate: "0.2%~0.48%",
    icon: "btc",
    iconClass: "icon-btc",
  },
]);

const goBack = () => {
  router.back();
};

const handleRecord = () => {
  // 跳转到记录页面
  console.log("查看记录");
};

const onSearch = (value) => {
  console.log("搜索:", value);
};

const handleProductClick = (product) => {
  console.log("点击产品:", product);
  // 可以跳转到产品详情页
};
</script>

<style lang="scss" scoped>
.locked-staking-detail {
  min-height: 100vh;
  background-color: #ffffff;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #ebedf0;

  .back-icon {
    font-size: 20px;
    color: #323233;
    cursor: pointer;
  }

  .nav-title {
    font-size: 18px;
    font-weight: 600;
    color: #323233;
    flex: 1;
    text-align: center;
  }

  .record-btn {
    font-size: 16px;
    color: #323233;
    cursor: pointer;
    min-width: 40px;
    text-align: right;
  }
}

.content {
  padding: 20px 16px;
}

.hero-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  position: relative;

  .hero-text {
    flex: 1;

    .main-title {
      font-size: 24px;
      font-weight: bold;
      color: #323233;
      margin: 0 0 8px 0;
      line-height: 1.4;
    }

    .subtitle {
      font-size: 14px;
      color: #646566;
      margin: 0;
      line-height: 1.5;
    }
  }

  .hero-icon {
    margin-left: 20px;
    position: relative;

    .wallet-icon {
      width: 100px;
      height: 120px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      .bitcoin-symbol {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        color: #ffffff;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        position: relative;
        z-index: 2;

        &::before {
          content: "";
          position: absolute;
          width: 70px;
          height: 30px;
          background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
          border-radius: 50%;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
        }
      }

      .coins {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

        .coin {
          position: absolute;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #ffffff;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(246, 211, 101, 0.4);
          animation: float 3s ease-in-out infinite;

          &.coin-1 {
            top: 10px;
            right: -10px;
            animation-delay: 0s;
          }

          &.coin-2 {
            bottom: 20px;
            right: 5px;
            animation-delay: 1s;
          }

          &.coin-3 {
            top: 50%;
            left: -15px;
            animation-delay: 1.5s;
          }
        }
      }
    }
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.search-section {
  margin-bottom: 24px;

  :deep(.van-search) {
    padding: 0;
    background-color: transparent;

    .van-search__content {
      background-color: #f7f8fa;
      border-radius: 20px;
    }
  }
}

.recommended-section {
  .section-title {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 600;
    color: #323233;

    .bullet {
      color: #323233;
      margin-right: 8px;
    }
  }

  .product-list {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .product-card {
      display: flex;
      align-items: center;
      padding: 16px;
      background-color: #f7f8fa;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:active {
        transform: scale(0.98);
        background-color: #ebedf0;
      }

      .product-icon {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
        color: #ffffff;
        margin-right: 12px;
        flex-shrink: 0;

        &.icon-usdc {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        &.icon-sol {
          background: linear-gradient(135deg, #000000 0%, #333333 100%);
        }

        &.icon-eth {
          background: linear-gradient(135deg, #627eea 0%, #8b5cf6 100%);
        }

        &.icon-btc {
          background: linear-gradient(135deg, #f7931a 0%, #ffa726 100%);
        }

        span {
          display: block;
        }
      }

      .product-info {
        flex: 1;

        .product-name {
          display: flex;
          align-items: baseline;
          gap: 8px;

          .name {
            font-size: 16px;
            font-weight: 600;
            color: #323233;
          }

          .type {
            font-size: 12px;
            color: #646566;
          }
        }
      }

      .product-rate {
        font-size: 14px;
        font-weight: 600;
        color: #1989fa;
        flex-shrink: 0;
      }
    }
  }
}
</style>

