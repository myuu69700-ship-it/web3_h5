<template>
  <div class="ai-strategy-trading">
    <!-- 顶部导航栏 -->
    <div class="nav-bar">
      <van-icon name="arrow-left" class="back-icon" @click="goBack" />
      <div class="nav-title">AI策略交易</div>
      <div class="order-btn" @click="handleOrder">訂單</div>
    </div>

    <!-- 主要内容区域 -->
    <div class="content">
      <!-- 当前团队等级区域 -->
      <div class="team-level-section">
        <div class="level-info">
          <div class="level-icon">■</div>
          <span class="level-text">當前團隊等級</span>
          <span class="level-value">L1</span>
        </div>
        <div class="level-rules" @click="handleLevelRules">等級規則</div>
      </div>

      <!-- 用户统计区域和加密货币价格区域 -->
      <div class="statistics-card">
        <!-- 用户统计区域 -->
        <div class="statistics-section">
          <div class="stat-item">
            <van-icon name="friends-o" class="stat-icon" color="#07c160" />
            <div class="stat-content">
              <div class="stat-label">使用人數</div>
              <div class="stat-value">336,387</div>
            </div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <van-icon name="gold-coin-o" class="stat-icon" color="#07c160" />
            <div class="stat-content">
              <div class="stat-label">累計賺取</div>
              <div class="stat-value">87.27M</div>
            </div>
          </div>
        </div>

        <!-- 虚线分隔 -->
        <div class="horizontal-divider"></div>

        <!-- 加密货币价格区域 -->
        <div class="crypto-prices-section">
          <div class="price-item">
            <div class="crypto-icon btc-icon">₿</div>
            <div class="crypto-info">
              <div class="crypto-symbol">BTC</div>
              <div class="crypto-price">90540.39</div>
            </div>
          </div>
          <div class="price-item">
            <div class="crypto-icon eth-icon">◆</div>
            <div class="crypto-info">
              <div class="crypto-symbol">ETH</div>
              <div class="crypto-price">3087.36</div>
            </div>
          </div>
          <div class="price-item">
            <div class="crypto-icon atom-icon">●</div>
            <div class="crypto-info">
              <div class="crypto-symbol">ATOM</div>
              <div class="crypto-price">2.5864</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 通知区域 -->
      <div class="notification-section">
        <van-icon name="bell-o" class="bell-icon" />
        <span class="notification-text"
          >用户 phv7***@mail.com 創建了AI策略交易</span
        >
      </div>

      <!-- USDT策略总收益区域 -->
      <div class="usdt-income-section">
        <div class="usdt-icon">
          <div class="usdt-letter">T</div>
        </div>
        <div class="income-text">0.00 USDT策略總收益</div>
      </div>

      <!-- 策略广场 -->
      <div class="strategy-plaza">
        <div class="plaza-title">
          <div class="title-icon">■</div>
          <span>策略廣場</span>
        </div>

        <!-- 策略卡片列表 -->
        <div
          class="strategy-card"
          v-for="strategy in strategyList"
          :key="strategy.id"
        >
          <!-- 策略头部 -->
          <div class="strategy-header">
            <div class="pair-info">
              <div class="pair-icons">
                <div
                  class="pair-icon"
                  :class="strategy.pairIcons[0]"
                  v-for="(icon, index) in strategy.pairIcons"
                  :key="index"
                >
                  {{ icon === 'btc' ? '₿' : icon === 'eth' ? '◆' : '●' }}
                </div>
              </div>
              <span class="pair-name">{{ strategy.pair }}</span>
            </div>
            <div class="strategy-type">{{ strategy.type }}</div>
          </div>

          <!-- 图表区域 -->
          <div class="strategy-chart">
            <svg
              class="chart-svg"
              viewBox="0 0 300 120"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <!-- 条纹网格图案 -->
                <pattern
                  id="stripeGrid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="10"
                    stroke="rgba(255,255,255,0.3)"
                    stroke-width="1"
                  />
                  <line
                    x1="0"
                    y1="0"
                    x2="10"
                    y2="0"
                    stroke="rgba(255,255,255,0.3)"
                    stroke-width="1"
                  />
                </pattern>
                <linearGradient
                  :id="`chartGradient${strategy.id}`"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" style="stop-color: #4caf50; stop-opacity: 0.4" />
                  <stop offset="100%" style="stop-color: #4caf50; stop-opacity: 0" />
                </linearGradient>
              </defs>
              <!-- 浅绿色背景 -->
              <rect width="100%" height="100%" fill="#a8e6cf" />
              <!-- 条纹网格 -->
              <rect width="100%" height="100%" fill="url(#stripeGrid)" />
              <!-- 折线图 -->
              <polyline
                :points="strategy.chartPoints"
                fill="none"
                stroke="#4caf50"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <!-- 渐变填充区域 -->
              <polygon
                :points="`${strategy.chartPoints} 300,120 0,120`"
                :fill="`url(#chartGradient${strategy.id})`"
                stroke="none"
              />
            </svg>
          </div>

          <!-- 性能指标 -->
          <div class="strategy-metrics">
            <div class="metrics-left">
              <div class="metric-item">
                <div class="metric-label">最大收益率</div>
                <div class="metric-value positive">{{ strategy.maxReturn }}%</div>
              </div>
              <div class="metric-item">
                <div class="metric-label">投入金額</div>
                <div class="metric-value">{{ strategy.investmentAmount }}</div>
              </div>
            </div>
            <div class="metrics-divider"></div>
            <div class="metrics-right">
              <div class="metric-item">
                <div class="metric-label">最大回撤率</div>
                <div class="metric-value">{{ strategy.maxDrawdown }}%</div>
              </div>
              <div class="metric-item">
                <div class="metric-label">運行時長</div>
                <div class="metric-value">{{ strategy.duration }}</div>
              </div>
            </div>
          </div>

          <!-- 策略底部 -->
          <div class="strategy-footer">
            <div class="strategy-meta">
              <div class="meta-item">
                <van-icon name="medal-o" class="crown-icon" color="#ffd700" />
                <span>{{ strategy.level }}</span>
              </div>
              <div class="meta-item">
                <van-icon name="friends-o" class="user-icon" color="#07c160" />
                <span>{{ strategy.users }}</span>
              </div>
            </div>
            <button class="use-btn" @click="handleUse(strategy)">
              使用
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 生成图表数据点
const generateChartPoints = (id) => {
  const points = [];
  const width = 300;
  const height = 120;
  const numPoints = 20;

  for (let i = 0; i <= numPoints; i++) {
    const x = (i / numPoints) * width;
    const progress = i / numPoints;
    // 根据策略ID生成不同的波动模式
    const baseY = height - progress * 60 - 20;
    const variation =
      Math.sin((progress * Math.PI * 3) + id) * 8 +
      Math.cos((progress * Math.PI * 2) + id) * 5;
    const y = Math.max(10, Math.min(height - 10, baseY + variation));
    points.push(`${x},${y}`);
  }
  return points.join(" ");
};

// 策略列表数据
const strategyList = ref([
  {
    id: 1,
    pair: "BTC/ETH",
    type: "CHATGPT預測",
    pairIcons: ["btc", "eth"],
    maxReturn: "45.2",
    investmentAmount: ">2500",
    maxDrawdown: "32.2",
    duration: "6h43m",
    level: "L0",
    users: "73",
    chartPoints: generateChartPoints(1),
  },
  {
    id: 2,
    pair: "BTC/TRX",
    type: "馬丁格爾",
    pairIcons: ["btc", "trx"],
    maxReturn: "33.4",
    investmentAmount: ">1000",
    maxDrawdown: "12.3",
    duration: "4h54m",
    level: "L0",
    users: "31",
    chartPoints: generateChartPoints(2),
  },
  {
    id: 3,
    pair: "BTC/ETH",
    type: "天地網格",
    pairIcons: ["btc", "eth"],
    maxReturn: "38.5",
    investmentAmount: ">2000",
    maxDrawdown: "18.6",
    duration: "8h12m",
    level: "L1",
    users: "156",
    chartPoints: generateChartPoints(3),
  },
]);

const goBack = () => {
  router.back();
};

const handleOrder = () => {
  // 跳转到订单页面
  console.log("跳转到订单页面");
};

const handleLevelRules = () => {
  // 显示等级规则
  console.log("显示等级规则");
};

const handleUse = (strategy) => {
  // 使用策略
  console.log("使用策略:", strategy);
};
</script>

<style lang="scss" scoped>
.ai-strategy-trading {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding-bottom: 60px;
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
    color: #040303;
    cursor: pointer;
    min-width: 60px;
    text-align: right;
    font-weight: 500;
  }
}

.content {
  padding: 16px;
}

// 当前团队等级区域
.team-level-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 16px;

  .level-info {
    display: flex;
    align-items: center;
    gap: 8px;

    .level-icon {
      font-size: 12px;
      color: #040303;
    }

    .level-text {
      font-size: 14px;
      color: #040303;
    }

    .level-value {
      font-size: 14px;
      font-weight: 600;
      color: #ff9800;
    }
  }

  .level-rules {
    font-size: 14px;
    color: #646566;
    cursor: pointer;
  }
}

// 用户统计和价格卡片
.statistics-card {
  background-color: #ffffff;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

// 用户统计区域
.statistics-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px;

  .stat-item {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;

    .stat-icon {
      font-size: 24px;
    }

    .stat-content {
      .stat-label {
        font-size: 14px;
        color: #646566;
        margin-bottom: 4px;
      }

      .stat-value {
        font-size: 24px;
        font-weight: bold;
        color: #040303;
      }
    }
  }

  .stat-divider {
    width: 1px;
    height: 40px;
    background-color: #ebedf0;
    margin: 0 16px;
  }
}

.horizontal-divider {
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    #ebedf0 0px,
    #ebedf0 8px,
    transparent 8px,
    transparent 16px
  );
  margin: 0 16px;
}

// 加密货币价格区域
.crypto-prices-section {
  display: flex;
  gap: 12px;
  padding: 16px;

  .price-item {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;

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
      }
    }
  }
}

// 通知区域
.notification-section {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 16px;

  .bell-icon {
    font-size: 18px;
    color: #040303;
    flex-shrink: 0;
  }

  .notification-text {
    font-size: 14px;
    color: #040303;
    flex: 1;
  }
}

// USDT策略总收益区域
.usdt-income-section {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .usdt-icon {
    width: 40px;
    height: 40px;
    background-color: #07c160;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    .usdt-letter {
      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 2px;
        background-color: #ffffff;
      }
    }
  }

  .income-text {
    font-size: 16px;
    color: #040303;
    font-weight: 500;
  }
}

// 策略广场
.strategy-plaza {
  .plaza-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    color: #040303;
    margin-bottom: 16px;

    .title-icon {
      font-size: 12px;
      color: #040303;
    }
  }

  .strategy-card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

    .strategy-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;

      .pair-info {
        display: flex;
        align-items: center;
        gap: 8px;

        .pair-icons {
          display: flex;
          gap: -4px;

          .pair-icon {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: bold;
            color: #ffffff;
            border: 2px solid #ffffff;
            margin-left: -4px;

            &:first-child {
              margin-left: 0;
            }

            &.btc-icon {
              background: linear-gradient(135deg, #f7931a 0%, #ffa726 100%);
              z-index: 2;
            }

            &.eth-icon {
              background: linear-gradient(135deg, #627eea 0%, #8b5cf6 100%);
              z-index: 1;
            }

            &.trx-icon {
              background: linear-gradient(135deg, #ef0027 0%, #ff1744 100%);
              z-index: 1;
            }
          }
        }

        .pair-name {
          font-size: 16px;
          font-weight: 600;
          color: #040303;
        }
      }

      .strategy-type {
        font-size: 14px;
        color: #646566;
        padding: 4px 8px;
        background-color: #f7f8fa;
        border-radius: 4px;
      }
    }

    .strategy-chart {
      width: 100%;
      height: 120px;
      margin: 12px 0;
      border-radius: 8px;
      overflow: hidden;

      .chart-svg {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .strategy-metrics {
      display: flex;
      gap: 16px;
      padding: 12px 0;
      border-top: 1px dashed #ebedf0;
      border-bottom: 1px dashed #ebedf0;
      margin-bottom: 12px;

      .metrics-left,
      .metrics-right {
        flex: 1;

        .metric-item {
          margin-bottom: 8px;

          &:last-child {
            margin-bottom: 0;
          }

          .metric-label {
            font-size: 12px;
            color: #646566;
            margin-bottom: 4px;
          }

          .metric-value {
            font-size: 14px;
            font-weight: 600;
            color: #040303;

            &.positive {
              color: #07c160;
            }
          }
        }
      }

      .metrics-divider {
        width: 1px;
        background-color: #ebedf0;
      }
    }

    .strategy-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .strategy-meta {
        display: flex;
        align-items: center;
        gap: 16px;

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #646566;

          .crown-icon,
          .user-icon {
            font-size: 16px;
          }
        }
      }

      .use-btn {
        padding: 8px 24px;
        background-color: #040303;
        color: #ffffff;
        border: none;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;

        &:active {
          background-color: #323233;
          transform: scale(0.98);
        }
      }
    }
  }
}
</style>

