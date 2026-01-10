<template>
  <div class="ai-strategy-detail">
    <!-- 顶部导航栏 -->
    <div class="nav-bar">
      <van-icon name="arrow-left" class="back-icon" @click="goBack" />
      <div class="nav-title">AI策略交易</div>
      <div class="placeholder"></div>
    </div>

    <!-- 主要内容区域 -->
    <div class="content">
      <!-- 策略卡片 -->
      <div class="strategy-card">
        <div class="strategy-header">
          <div class="pair-info">
            <div class="pair-icons">
              <div class="pair-icon eth-icon">◆</div>
              <div class="pair-icon trx-icon">●</div>
            </div>
            <span class="pair-name">{{ strategyData.pair }}</span>
          </div>
          <div class="strategy-type">{{ strategyData.type }}</div>
        </div>

        <!-- 统计信息 -->
        <div class="strategy-stats">
          <div class="stat-item">
            <van-icon name="friends-o" class="stat-icon" color="#07c160" />
            <div class="stat-content">
              <div class="stat-label">使用人數</div>
              <div class="stat-value">{{ strategyData.users }}</div>
            </div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <van-icon name="gold-coin-o" class="stat-icon" color="#07c160" />
            <div class="stat-content">
              <div class="stat-label">跟隨資金</div>
              <div class="stat-value">¥ {{ strategyData.followingFunds }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 性能概览 -->
      <div class="performance-overview">
        <div class="performance-item">
          <div class="period">近3天</div>
          <div class="gain positive">+9%</div>
        </div>
        <div class="performance-item">
          <div class="period">近7天</div>
          <div class="gain positive">+15%</div>
        </div>
        <div class="performance-item">
          <div class="period">近10天</div>
          <div class="gain positive">+21%</div>
        </div>
      </div>

      <!-- 详细统计数据 -->
      <div class="detailed-stats">
        <div class="stat-row">
          <div class="stat-label">運行時長</div>
          <div class="stat-value">{{ strategyData.runtime }}</div>
        </div>
        <div class="stat-row">
          <div class="stat-label">最大收益率</div>
          <div class="stat-value">{{ strategyData.maxReturn }}%</div>
        </div>
        <div class="stat-row">
          <div class="stat-label">最大回撤率</div>
          <div class="stat-value">{{ strategyData.maxDrawdown }}%</div>
        </div>
        <div class="stat-row">
          <div class="stat-label">區間最低價</div>
          <div class="stat-value">{{ strategyData.lowestPrice }}</div>
        </div>
        <div class="stat-row">
          <div class="stat-label">網格收益率</div>
          <div class="stat-value">{{ strategyData.gridProfitRate }}%</div>
        </div>
        <div class="stat-row">
          <div class="stat-label">最大服務費</div>
          <div class="stat-value">{{ strategyData.maxServiceFee }}</div>
        </div>
      </div>

      <!-- 策略说明卡片 -->
      <div class="strategy-intro-card">
        <div class="intro-title">{{ strategyIntro.title }}</div>
        
        <!-- 图片区域 -->
        <div class="intro-image">
          <div class="image-bg">
            <div class="eth-coin">{{ strategyIntro.coinIcon }}</div>
            <div class="image-overlay">{{ strategyIntro.overlayText }}</div>
          </div>
        </div>

        <!-- 文字描述 -->
        <div class="intro-content">
          <div class="intro-subtitle">{{ strategyIntro.subtitle }}</div>
          <div class="intro-text">{{ strategyIntro.description }}</div>
        </div>

        <!-- 使用策略按钮 -->
        <button class="use-strategy-btn" @click="handleUseStrategy">
          使用本策略
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 策略数据
const strategyData = ref({
  pair: 'ETH/TRX',
  type: '無限網格',
  users: '42',
  followingFunds: '143,175.8631',
  runtime: '4h16m',
  maxReturn: '34.4',
  maxDrawdown: '25.44',
  lowestPrice: '9.7265',
  gridProfitRate: '35',
  maxServiceFee: '100'
})

// 策略介绍内容
const strategyIntro = ref({
  title: '什麼是無限網格',
  coinIcon: '◆',
  overlayText: 'About Infinite Grid',
  subtitle: '捕捉流動性+資產升級',
  description: '無限網格的設計是為了在長線慢牛的行情下抓住每一次可能的套利機會。因此無限摒棄了網格的上限,在整個市場上揚的行情中你可以通過市場的波動低買高賣以及持倉的價格上漲來獲利。網格下限將保護您在不斷下降的行情中不會過度買入,在最低價格及之下的價格都不會下新的訂單'
})

// 策略介绍内容映射
const strategyIntroMap = {
  '無限網格': {
    title: '什麼是無限網格',
    coinIcon: '◆',
    overlayText: 'About Infinite Grid',
    subtitle: '捕捉流動性+資產升級',
    description: '無限網格的設計是為了在長線慢牛的行情下抓住每一次可能的套利機會。因此無限摒棄了網格的上限,在整個市場上揚的行情中你可以通過市場的波動低買高賣以及持倉的價格上漲來獲利。網格下限將保護您在不斷下降的行情中不會過度買入,在最低價格及之下的價格都不會下新的訂單'
  },
  '馬丁格爾': {
    title: '什麼是馬丁格爾',
    coinIcon: '₿',
    overlayText: 'About Martingale',
    subtitle: '風險管理+收益優化',
    description: '馬丁格爾策略是一種風險管理方法,通過在每次虧損後加倍投注來恢復損失並獲得盈利。這種策略適合在市場波動較大時使用,可以有效控制風險並優化收益。'
  },
  '天地網格': {
    title: '什麼是天地網格',
    coinIcon: '₿',
    overlayText: 'About Range Grid',
    subtitle: '區間交易+穩定收益',
    description: '天地網格策略在設定的價格區間內進行高頻交易,通過價格波動獲取穩定收益。這種策略適合在橫盤整理行情中使用,能夠充分利用價格波動創造收益。'
  }
}

onMounted(() => {
  // 根据路由参数加载策略数据
  const id = route.params.id
  const pair = route.query.pair
  const type = route.query.type

  if (pair) {
    strategyData.value.pair = pair
  }
  if (type) {
    strategyData.value.type = type
  }

  // 这里可以根据 id 从 API 加载详细数据
  // 模拟根据 id 加载不同的策略数据
  const strategyMap = {
    1: {
      pair: 'ETH/TRX',
      type: '無限網格',
      users: '42',
      followingFunds: '143,175.8631',
      runtime: '4h16m',
      maxReturn: '34.4',
      maxDrawdown: '25.44',
      lowestPrice: '9.7265',
      gridProfitRate: '35',
      maxServiceFee: '100'
    },
    2: {
      pair: 'BTC/TRX',
      type: '馬丁格爾',
      users: '31',
      followingFunds: '89,234.56',
      runtime: '4h54m',
      maxReturn: '33.4',
      maxDrawdown: '12.3',
      lowestPrice: '8.2341',
      gridProfitRate: '28',
      maxServiceFee: '80'
    },
    3: {
      pair: 'BTC/ETH',
      type: '天地網格',
      users: '156',
      followingFunds: '256,789.12',
      runtime: '8h12m',
      maxReturn: '38.5',
      maxDrawdown: '18.6',
      lowestPrice: '12.4567',
      gridProfitRate: '42',
      maxServiceFee: '120'
    }
  }

  if (id && strategyMap[id]) {
    strategyData.value = { ...strategyData.value, ...strategyMap[id] }
  }

  // 根据策略类型设置介绍内容
  if (strategyIntroMap[strategyData.value.type]) {
    strategyIntro.value = strategyIntroMap[strategyData.value.type]
  }
})

const goBack = () => {
  router.back()
}

const handleUseStrategy = () => {
  // 使用策略的逻辑
  console.log('使用策略:', strategyData.value)
  // 可以跳转到使用策略的页面或显示弹窗
}
</script>

<style lang="scss" scoped>
.ai-strategy-detail {
  min-height: 100vh;
  background-color: #ffffff;
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
    width: 26px;
  }

  .nav-title {
    font-size: 18px;
    font-weight: 600;
    color: #040303;
    flex: 1;
    text-align: center;
  }

  .placeholder {
    width: 26px;
  }
}

.content {
  padding: 16px;
}

// 策略卡片
.strategy-card {
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;

  .strategy-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .pair-info {
      display: flex;
      align-items: center;
      gap: 8px;

      .pair-icons {
        display: flex;
        gap: -4px;

        .pair-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          color: #ffffff;
          border: 2px solid #ffffff;
          margin-left: -4px;

          &:first-child {
            margin-left: 0;
          }

          &.eth-icon {
            background: linear-gradient(135deg, #627eea 0%, #8b5cf6 100%);
            z-index: 2;
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
      background-color: #ffffff;
      border-radius: 4px;
    }
  }

  .strategy-stats {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px dashed #d4d4d4;

    .stat-item {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;

      .stat-icon {
        font-size: 20px;
        flex-shrink: 0;
      }

      .stat-content {
        .stat-label {
          font-size: 12px;
          color: #646566;
          margin-bottom: 4px;
        }

        .stat-value {
          font-size: 14px;
          font-weight: 600;
          color: #040303;
        }
      }
    }

    .stat-divider {
      width: 1px;
      height: 40px;
      background: repeating-linear-gradient(
        to bottom,
        #d4d4d4 0px,
        #d4d4d4 4px,
        transparent 4px,
        transparent 8px
      );
      margin: 0 16px;
    }
  }
}

// 性能概览
.performance-overview {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;

  .performance-item {
    flex: 1;
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 16px;
    text-align: center;

    .period {
      font-size: 12px;
      color: #646566;
      margin-bottom: 8px;
    }

    .gain {
      font-size: 18px;
      font-weight: 600;

      &.positive {
        color: #07c160;
      }

      &.negative {
        color: #ee0a24;
      }
    }
  }
}

// 详细统计数据
.detailed-stats {
  background-color: #ffffff;
  margin-bottom: 16px;

  .stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #ebedf0;

    &:last-child {
      border-bottom: none;
    }

    .stat-label {
      font-size: 14px;
      color: #646566;
    }

    .stat-value {
      font-size: 14px;
      font-weight: 600;
      color: #040303;
    }
  }
}

// 策略说明卡片
.strategy-intro-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .intro-title {
    font-size: 18px;
    font-weight: 600;
    color: #040303;
    margin-bottom: 16px;
  }

  .intro-image {
    width: 100%;
    margin-bottom: 16px;
    border-radius: 8px;
    overflow: hidden;

    .image-bg {
      position: relative;
      width: 100%;
      height: 200px;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 20px;
      overflow: hidden;

      // 背景光晕效果
      &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -20%;
        width: 140%;
        height: 200%;
        background: radial-gradient(
          circle,
          rgba(255, 152, 0, 0.3) 0%,
          rgba(255, 193, 7, 0.2) 30%,
          transparent 60%
        );
        animation: rotate 20s linear infinite;
      }

      &::after {
        content: '';
        position: absolute;
        top: 20%;
        right: -10%;
        width: 80%;
        height: 80%;
        background: radial-gradient(
          circle,
          rgba(255, 152, 0, 0.25) 0%,
          rgba(255, 193, 7, 0.15) 40%,
          transparent 70%
        );
        animation: rotate 15s linear infinite reverse;
      }

      .eth-coin {
        position: relative;
        z-index: 2;
        font-size: 80px;
        color: #627eea;
        text-shadow: 
          0 0 20px rgba(98, 126, 234, 0.8),
          0 0 40px rgba(98, 126, 234, 0.6),
          0 0 60px rgba(98, 126, 234, 0.4);
        filter: drop-shadow(0 0 10px rgba(98, 126, 234, 0.9));
        animation: pulse 3s ease-in-out infinite;
      }

      .image-overlay {
        position: absolute;
        bottom: 20px;
        left: 20px;
        z-index: 3;
        font-size: 14px;
        color: #ffffff;
        font-weight: 500;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }
    }
  }

  .intro-content {
    margin-bottom: 24px;

    .intro-subtitle {
      font-size: 16px;
      font-weight: 600;
      color: #040303;
      margin-bottom: 12px;
    }

    .intro-text {
      font-size: 14px;
      line-height: 1.6;
      color: #040303;
    }
  }

  .use-strategy-btn {
    width: 100%;
    padding: 14px 0;
    background-color: #040303;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;

    &:active {
      background-color: #323233;
      transform: scale(0.98);
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}
</style>

