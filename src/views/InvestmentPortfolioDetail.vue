<template>
  <div class="investment-portfolio-detail">
    <!-- 顶部导航栏 -->
    <div class="nav-bar">
      <van-icon name="arrow-left" class="back-icon" @click="goBack" />
      <div class="nav-title">投資組合</div>
      <div class="order-btn" @click="handleOrder">交易訂單</div>
    </div>

    <!-- 主要内容区域 -->
    <div class="content">
      <!-- USDT账户摘要区域 -->
      <div class="account-section">
        <div class="usdt-display">
          <div class="coin-container">
            <div class="usdt-coin">
              <div class="coin-icon">T</div>
            </div>
          </div>
          <div class="balance-info">
            <div class="currency-label">USDT</div>
            <div class="balance">0.00</div>
          </div>
          <div class="total-earnings-badge">總收益</div>
        </div>

        <!-- 三种加密货币价格 -->
        <div class="crypto-prices">
          <div class="price-item">
            <div class="crypto-icon btc-icon">₿</div>
            <div class="crypto-info">
              <div class="crypto-symbol">BTC</div>
              <div class="crypto-price">90603.72</div>
            </div>
          </div>
          <div class="price-item">
            <div class="crypto-icon eth-icon">◆</div>
            <div class="crypto-info">
              <div class="crypto-symbol">ETH</div>
              <div class="crypto-price">3087.05</div>
            </div>
          </div>
          <div class="price-item">
            <div class="crypto-icon atom-icon">●</div>
            <div class="crypto-info">
              <div class="crypto-symbol">ATOM</div>
              <div class="crypto-price">2.602</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 投资产品卡片 -->
      <div class="product-card" v-for="item in 10" :key="item">
        <div class="hot-banner">
          <van-icon name="fire" class="fire-icon" />
          <span>HOT</span>
        </div>

        <div class="product-header">
          <h2 class="product-title">ETH+MANA</h2>
          <div class="investment-range">
            投資金額:2000-99999999
            <span class="currency-symbol">¥</span>
          </div>
        </div>

        <!-- 图表区域 -->
        <div class="chart-section">
          <svg
            class="chart-svg"
            viewBox="0 0 300 150"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <!-- 菱形网格图案 -->
              <pattern
                id="diamondGrid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <polygon
                  points="10,0 20,10 10,20 0,10"
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
                  stroke-width="1"
                />
              </pattern>
              <linearGradient
                id="chartGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style="stop-color: #4caf50; stop-opacity: 0.4"
                />
                <stop
                  offset="100%"
                  style="stop-color: #4caf50; stop-opacity: 0"
                />
              </linearGradient>
            </defs>
            <!-- 绿色背景 -->
            <rect width="100%" height="100%" fill="#a8e6cf" />
            <!-- 菱形网格 -->
            <rect width="100%" height="100%" fill="url(#diamondGrid)" />
            <!-- 折线图 -->
            <polyline
              :points="chartPoints"
              fill="none"
              stroke="#2e7d32"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <!-- 渐变填充区域 -->
            <polygon
              :points="`${chartPoints} 300,150 0,150`"
              fill="url(#chartGradient)"
              stroke="none"
            />
          </svg>

          <!-- 收益率信息 -->
          <div class="yield-info">
            <div class="yield-info-content">
              <div class="yield-label">收益率</div>
              <div class="duration-badge">時長:7日</div>
            </div>
            <div class="daily-yield">0.2-0.25%/天</div>
          </div>
        </div>
        <!-- 参与按钮 -->
        <button class="participate-btn" @click="handleParticipate">
          <van-icon name="plus" class="plus-icon" />
          <span>參與使用</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 生成图表数据点（模拟上升趋势，带波动）
const chartPoints = computed(() => {
  const points = [];
  const width = 300;
  const height = 150;
  const numPoints = 20;

  for (let i = 0; i <= numPoints; i++) {
    const x = (i / numPoints) * width;
    // 创建一个上升趋势，带有一些波动
    const progress = i / numPoints;
    const baseY = height - progress * 70 - 20;
    // 添加波动以模拟真实的价格变化
    const variation =
      Math.sin(progress * Math.PI * 3) * 8 +
      Math.cos(progress * Math.PI * 2) * 5;
    const y = Math.max(10, Math.min(height - 10, baseY + variation));
    points.push(`${x},${y}`);
  }
  return points.join(" ");
});

const goBack = () => {
  router.back();
};

const handleOrder = () => {
  // 跳转到交易订单页面
  console.log("跳转到交易订单");
};

const handleParticipate = () => {
  // 处理参与投资
  console.log("參與使用");
};
</script>

<style lang="scss" scoped>
.investment-portfolio-detail {
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
    color: #040303;
    cursor: pointer;
  }

  .nav-title {
    font-size: 18px;
    font-weight: 600;
    color: #040303;
    flex: 1;
    text-align: center;
  }

  .order-btn {
    font-size: 16px;
    color: #07c160;
    cursor: pointer;
    min-width: 60px;
    text-align: right;
    font-weight: 500;
  }
}

.content {
  padding: 20px 16px;
}

.account-section {
  margin-bottom: 24px;
}

.usdt-display {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;

  .coin-container {
    position: relative;
  }

  .usdt-coin {
    width: 83.19px;
    height: 76.95px;
    background: linear-gradient(135deg, #26a69a 0%, #00897b 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 20px rgba(38, 166, 154, 0.3);
    position: relative;

    &::before {
      content: "";
      position: absolute;
    //   width: 90px;
    //   height: 90px;
      border: 2px solid rgba(38, 166, 154, 0.2);
      border-radius: 50%;
      top: -5px;
      left: -5px;
    }

    &::after {
      content: "";
      position: absolute;
    //   width: 100px;
    //   height: 100px;
      border: 1px solid rgba(38, 166, 154, 0.1);
      border-radius: 50%;
    //   top: -10px;
    //   left: -10px;
    }

    .coin-icon {
      font-size: 48px;
      font-weight: bold;
      color: #ffffff;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      position: relative;
      z-index: 1;
    }
  }

  .balance-info {
    flex: 1;

    .currency-label {
      font-size: 14px;
      color: #646566;
      margin-bottom: 4px;
    }

    .balance {
      font-size: 32px;
      font-weight: bold;
      color: #040303;
      line-height: 1.2;
    }
  }

  .total-earnings-badge {
    background-color: #ee0a24;
    color: #ffffff;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }
}

.crypto-prices {
  display: flex;
  justify-content: space-between;
  gap: 12px;

  .price-item {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background-color: #f7f8fa;
    border-radius: 12px;

    .crypto-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
      color: #ffffff;
      flex-shrink: 0;

      &.btc-icon {
        background: linear-gradient(135deg, #f7931a 0%, #ffa726 100%);
      }

      &.eth-icon {
        background: linear-gradient(135deg, #627eea 0%, #8b5cf6 100%);
      }

      &.atom-icon {
        background: linear-gradient(135deg, #2e3148 0%, #484a5c 100%);
      }
    }

    .crypto-info {
      flex: 1;
      min-width: 0;

      .crypto-symbol {
        font-size: 12px;
        color: #646566;
        margin-bottom: 2px;
      }

      .crypto-price {
        font-size: 14px;
        font-weight: 600;
        color: #040303;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.product-card {
  position: relative;
  background-color: #ffffff;
  border-radius: 16px;
  //   padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

  .hot-banner {
    position: absolute;
    top: 16px;
    right: 16px;
    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
    color: #ffffff;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 4px;
    z-index: 10;

    .fire-icon {
      font-size: 14px;
    }
  }

  .product-header {
    padding: 5.33333vw 4.26667vw;

    .product-title {
      font-size: 20px;
      font-weight: bold;
      color: #040303;
      margin: 0 0 8px 0;
    }

    .investment-range {
      font-size: 14px;
      color: #646566;

      .currency-symbol {
        margin-left: 4px;
        font-weight: 600;
      }
    }
  }

  .chart-section {
    position: relative;
    width: 100%;
    height: 200px;
    margin: 16px 0;
    // border-radius: 12px;
    overflow: hidden;
    background-color: #a8e6cf;

    .chart-svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .yield-info {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 6px;
      margin-bottom: 8px;
      flex-direction: column;
      .yield-info-content {
        display: flex;
        align-items: center;
        gap: 20px;
        // justify-content: flex-start;
        // padding-left: -10px;
      }

      .yield-label {
        font-size: 14px;
        color: #26a69a;
        font-weight: 500;
        // padding-left: 12px;
      }

      .duration-badge {
        background-color: #ee0a24;
        color: #ffffff;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
      }
      .daily-yield {
        font-size: 24px;
        font-weight: bold;
        color: #07c160;
        padding-left: 12px;
        // margin-bottom: 20px;
      }
    }
  }

  .participate-btn {
    color: #fff;
    background-color: #040303;
    width: 85.33333vw;
    height: 13.33333vw;
    font-size: 4vw;
    border-radius: 266.4vw;
    display: flex;
    flex-wrap: initial;
    flex-direction: initial;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    .plus-icon {
      font-size: 18px;
    }

    &:active {
      background-color: #323233;
      transform: scale(0.98);
    }
  }
}
</style>
