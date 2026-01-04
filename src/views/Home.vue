<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <div class="top-bar">
      <van-icon name="apps-o" class="menu-icon" @click="showMenu = true" />
      <van-icon name="globe-o" class="globe-icon" @click="goToLanguageSelect" />
    </div>
    
    <div class="content">
      <!-- 加密货币市场数据 -->
      <div class="market-section">
        <div 
          v-for="coin in coins" 
          :key="coin.id" 
          class="coin-item"
          @click="goToMarket"
        >
          <div class="coin-icon" :style="{ backgroundColor: coin.color }">
            <span class="coin-symbol">{{ coin.symbol }}</span>
          </div>
          <div class="coin-info">
            <div class="coin-name">{{ coin.name }}</div>
            <div class="coin-pair">{{ coin.pair }}</div>
          </div>
          <div class="coin-price">
            <div class="price-value">{{ coin.price }}</div>
            <div class="price-usd">${{ coin.price }}</div>
          </div>
          <div class="coin-change" :class="coin.change >= 0 ? 'up' : 'down'">
            {{ coin.change >= 0 ? '+' : '' }}{{ coin.change }}%
          </div>
        </div>
        <div class="view-more-btn" @click="goToMarket">
          {{ t('viewMore') }}
        </div>
      </div>
      
      <!-- 平台通知 -->
      <div class="notifications-section">
        <div class="section-title">{{ t('platformNotifications') }}</div>
        <div 
          v-for="notification in notifications" 
          :key="notification.id" 
          class="notification-item"
        >
          <div class="notification-text">{{ t(notification.key) }}</div>
          <div class="notification-time">{{ notification.time }}</div>
        </div>
        <div class="view-more-btn" @click="viewMoreNotifications">
          {{ t('viewMore') }}
        </div>
      </div>
      
      <!-- 推广横幅 -->
      <div class="promo-banner">
        <div class="promo-text">一點不差</div>
        <div class="promo-nft">
          <div class="nft-box">
            <div class="nft-label">NFT</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 浮动聊天按钮 -->
    <div class="chat-fab" @click="openChat">
      <van-icon name="chat-o" />
    </div>
    
    <!-- 菜单抽屉 -->
    <van-popup 
      v-model:show="showMenu" 
      position="left" 
      :style="{ width: '70%', height: '100%' }"
    >
      <div class="menu-content">
        <div class="menu-header">菜单</div>
        <van-cell-group>
          <van-cell title="设置" is-link />
          <van-cell title="帮助" is-link />
          <van-cell title="关于" is-link @click="goToAbout" />
        </van-cell-group>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '@/i18n'

const router = useRouter()
const { t } = useI18n()
const showMenu = ref(false)

// 加密货币数据
const coins = ref([
  {
    id: 1,
    name: 'USDCoin',
    symbol: 'C',
    pair: 'USDC / USDT',
    price: '1.0002',
    change: 0,
    color: '#2775CA'
  },
  {
    id: 2,
    name: 'Dogecoin',
    symbol: 'D',
    pair: 'DOGE / USDT',
    price: '0.146288',
    change: 3.2991,
    color: '#CBA134'
  },
  {
    id: 3,
    name: 'Filecoin',
    symbol: 'f',
    pair: 'FIL / USDT',
    price: '1.4959',
    change: -3.1027,
    color: '#0090FF'
  },
  {
    id: 4,
    name: 'MakerDAO',
    symbol: 'D',
    pair: 'DAI / USDT',
    price: '1.0005',
    change: 0.03,
    color: '#F4B731'
  }
])

// 通知数据
const notifications = ref([
  {
    id: 1,
    key: 'exchangeUpdateNotification',
    time: '2025/05/15 15:12:07'
  },
  {
    id: 2,
    key: 'exchangeLendingUpdate',
    time: '2024/10/13 00:00:00'
  },
  {
    id: 3,
    key: 'virtualReservationActivity',
    time: '2024/08/31 10:00:00'
  }
])

const goToLanguageSelect = () => {
  router.push('/language-select')
}

const goToMarket = () => {
  router.push('/market')
}

const viewMoreNotifications = () => {
  // 可以跳转到通知详情页
  console.log('查看更多通知')
}

const openChat = () => {
  // 打开聊天窗口
  console.log('打开聊天')
}

const goToAbout = () => {
  showMenu.value = false
  router.push('/about')
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 80px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
  
  .menu-icon,
  .globe-icon {
    font-size: 24px;
    color: #323233;
    cursor: pointer;
  }
}

.content {
  padding: 0 16px;
}

// 市场数据区域
.market-section {
  margin-top: 16px;
  
  .coin-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #ebedf0;
    cursor: pointer;
    
    .coin-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      
      .coin-symbol {
        color: #fff;
        font-weight: bold;
        font-size: 18px;
      }
    }
    
    .coin-info {
      flex: 1;
      
      .coin-name {
        font-size: 16px;
        font-weight: 500;
        color: #323233;
        margin-bottom: 4px;
      }
      
      .coin-pair {
        font-size: 12px;
        color: #969799;
      }
    }
    
    .coin-price {
      text-align: right;
      margin-right: 12px;
      
      .price-value {
        font-size: 16px;
        font-weight: 500;
        color: #323233;
        margin-bottom: 4px;
      }
      
      .price-usd {
        font-size: 12px;
        color: #969799;
      }
    }
    
    .coin-change {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      min-width: 60px;
      text-align: center;
      
      &.up {
        background-color: #e8f5e9;
        color: #07c160;
      }
      
      &.down {
        background-color: #ffebee;
        color: #ee0a24;
      }
    }
  }
  
  .view-more-btn {
    text-align: center;
    padding: 12px;
    margin-top: 8px;
    background-color: #f7f8fa;
    border-radius: 8px;
    color: #969799;
    font-size: 14px;
    cursor: pointer;
  }
}

// 通知区域
.notifications-section {
  margin-top: 24px;
  
  .section-title {
    font-size: 18px;
    font-weight: bold;
    color: #323233;
    margin-bottom: 16px;
  }
  
  .notification-item {
    padding: 12px 0;
    border-bottom: 1px solid #ebedf0;
    
    .notification-text {
      font-size: 14px;
      color: #323233;
      margin-bottom: 4px;
    }
    
    .notification-time {
      font-size: 12px;
      color: #969799;
    }
  }
  
  .view-more-btn {
    text-align: center;
    padding: 12px;
    margin-top: 8px;
    background-color: #f7f8fa;
    border-radius: 8px;
    color: #969799;
    font-size: 14px;
    cursor: pointer;
  }
}

// 推广横幅
.promo-banner {
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  border-radius: 12px;
  
  .promo-text {
    font-size: 32px;
    font-weight: bold;
    color: #4caf50;
  }
  
  .promo-nft {
    .nft-box {
      width: 80px;
      height: 80px;
      background-color: #fff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transform: perspective(200px) rotateX(15deg) rotateY(-15deg);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      
      .nft-label {
        font-size: 18px;
        font-weight: bold;
        color: #4caf50;
      }
    }
  }
}

// 浮动聊天按钮
.chat-fab {
  position: fixed;
  right: 16px;
  bottom: 90px;
  width: 56px;
  height: 56px;
  background-color: #323233;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 99;
  
  .van-icon {
    color: #fff;
    font-size: 24px;
  }
}

// 菜单内容
.menu-content {
  padding: 20px;
  
  .menu-header {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
}
</style>
