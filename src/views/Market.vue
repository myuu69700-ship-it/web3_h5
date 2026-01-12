<template>
  <div class="market">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <van-search
        v-model="searchValue"
        placeholder="搜尋幣對"
        @click="handleSearch"
      />
    </div>

    <!-- 主要导航标签 -->
    <div class="main-tabs">
      <div
        class="tab-item"
        :class="{ active: activeMainTab === 'market' }"
        @click="activeMainTab = 'market'"
      >
        市價
      </div>
      <div
        class="tab-item"
        :class="{ active: activeMainTab === 'news' }"
        @click="activeMainTab = 'news'"
      >
        新聞
      </div>
      <div
        class="tab-item"
        :class="{ active: activeMainTab === 'dynamics' }"
        @click="activeMainTab = 'dynamics'"
      >
        動態
      </div>
    </div>

    <!-- 子类别标签 -->
    <div class="sub-tabs">
      <div
        class="sub-tab-item"
        :class="{ active: activeSubTab === 'favorites' }"
        @click="activeSubTab = 'favorites'"
      >
        收藏
      </div>
      <div
        class="sub-tab-item"
        :class="{ active: activeSubTab === 'spot' }"
        @click="activeSubTab = 'spot'"
      >
        現貨
      </div>
      <div
        class="sub-tab-item"
        :class="{ active: activeSubTab === 'contract' }"
        @click="activeSubTab = 'contract'"
      >
        合約
      </div>
      <div
        class="sub-tab-item"
        :class="{ active: activeSubTab === 'options' }"
        @click="activeSubTab = 'options'"
      >
        期權
      </div>
    </div>

    <!-- 类别标签 -->
    <div class="category-label">加密貨幣</div>

    <!-- 表头 -->
    <div class="table-header">
      <div class="header-col name-col">名稱 / 成交額</div>
      <div class="header-col price-col">最新價</div>
      <div class="header-col change-col">今日漲跌</div>
    </div>

    <!-- 交易对列表 -->
    <div class="coin-list">
      <div
        v-for="coin in coinList"
        :key="coin.pair"
        class="coin-item"
        @click="handleCoinClick(coin)"
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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchValue = ref('')
const activeMainTab = ref('market')
const activeSubTab = ref('spot')

// 交易对列表数据（根据图片中的示例数据）
const coinList = ref([
  {
    pair: 'ARKM/USDT',
    name: 'ARKM',
    symbol: 'A',
    color: '#000000',
    volume: 944429.5,
    price: '0.207',
    change: 0.0483
  },
  {
    pair: 'GALA/USDT',
    name: 'GALA',
    symbol: 'G',
    color: '#000000',
    volume: 538651444,
    price: '0.007078',
    change: -0.366
  },
  {
    pair: 'FET/USDT',
    name: 'FET',
    symbol: 'F',
    color: '#000000',
    volume: 47702.6,
    price: '0.2986',
    change: 5.4379
  },
  {
    pair: 'AUCTION/USDT',
    name: 'AUCTION',
    symbol: 'A',
    color: '#000000',
    volume: 97676.7,
    price: '5.4211',
    change: -1.9125
  },
  {
    pair: 'SEI/USDT',
    name: 'SEI',
    symbol: 'S',
    color: '#FF0000',
    volume: 1627700,
    price: '0.1217',
    change: 0.9121
  },
  {
    pair: 'AXL/USDT',
    name: 'AXL',
    symbol: 'A',
    color: '#000000',
    volume: 8114120,
    price: '0.07119',
    change: -4.571
  },
  {
    pair: 'JTO/USDT',
    name: 'JTO',
    symbol: 'J',
    color: '#000000',
    volume: 455912.1,
    price: '0.447',
    change: 0.112
  },
  {
    pair: 'BNB/USDT',
    name: 'BNB',
    symbol: 'B',
    color: '#F3BA2F',
    volume: 18440,
    price: '903.41',
    change: -0.4748
  },
  {
    pair: 'DYDX/USDT',
    name: 'DYDX',
    symbol: 'D',
    color: '#000000',
    volume: 5402600,
    price: '0.2005',
    change: -1.4742
  },
  {
    pair: 'AAVE/USDT',
    name: 'AAVE',
    symbol: 'A',
    color: '#B6509E',
    volume: 196.2984,
    price: '166.687',
    change: 0.5694
  },
  {
    pair: 'ETHW/USDT',
    name: 'ETHW',
    symbol: 'E',
    color: '#627EEA',
    volume: 1703600,
    price: '0.558',
    change: -1.7606
  },
  {
    pair: 'WLFI/USDT',
    name: 'WLFI',
    symbol: 'W',
    color: '#000000',
    volume: 15220100,
    price: '0.1656',
    change: -1.0753
  },
  {
    pair: 'BTC/USDT',
    name: 'Bitcoin',
    symbol: 'B',
    color: '#F7931A',
    volume: 1030,
    price: '91,344.01',
    change: 0.8412
  },
  {
    pair: 'ETH/USDT',
    name: 'Ethereum',
    symbol: 'E',
    color: '#627EEA',
    volume: 16530,
    price: '3,125.37',
    change: 1.1463
  },
  {
    pair: 'ATOM/USDT',
    name: 'ATOM',
    symbol: 'A',
    color: '#2E3148',
    volume: 493468.7,
    price: '2.5795',
    change: 0.0776
  },
  {
    pair: 'BCH/USDT',
    name: 'Bitcoin Cash',
    symbol: 'B',
    color: '#0AC18E',
    volume: 39060,
    price: '652.11',
    change: 1.6793
  },
  {
    pair: 'XRP/USDT',
    name: 'Ripple',
    symbol: 'X',
    color: '#000000',
    volume: 19764220,
    price: '2.06963',
    change: -0.9016
  },
  {
    pair: 'LTC/USDT',
    name: 'LTC',
    symbol: 'L',
    color: '#BFBBBB',
    volume: 224160,
    price: '78.71',
    change: -3.1023
  },
  {
    pair: 'USDC/USDT',
    name: 'USDCoin',
    symbol: 'U',
    color: '#2775CA',
    volume: 14157000,
    price: '1.0012',
    change: 0.03
  }
])

// 处理搜索
const handleSearch = () => {
  // 可以打开搜索模态框或跳转到搜索页面
  console.log('搜索:', searchValue.value)
}

// 处理币种点击
const handleCoinClick = (coin) => {
  router.push(`/coin/${coin.pair}`)
}
</script>

<style lang="scss" scoped>
.market {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 80px;
}

.search-bar {
  padding: 12px 16px;
  background-color: #fff;
  
  :deep(.van-search) {
    padding: 0;
    background-color: transparent;
  }
  
  :deep(.van-search__content) {
    background-color: #f3f3f3;
    border-radius: 20px;
  }
  
  :deep(.van-field__left-icon .van-icon, .van-field__right-icon .van-icon) {
    color: #323233;
  }
}

.main-tabs {
  display: flex;
  padding: 0 16px;
  border-bottom: 1px solid #ebedf0;
  background-color: #fff;
  
  .tab-item {
    padding: 12px 0;
    margin-right: 24px;
    font-size: 16px;
    color: #969799;
    cursor: pointer;
    position: relative;
    transition: color 0.3s;
    
    &:last-child {
      margin-right: 0;
    }
    
    &.active {
      color: #323233;
      font-weight: 500;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #323233;
      }
    }
  }
}

.sub-tabs {
  display: flex;
  padding: 8px 16px;
  gap: 8px;
  background-color: #fff;
  
  .sub-tab-item {
    padding: 6px 12px;
    font-size: 14px;
    color: #323233;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    
    &.active {
      background-color: #f3f3f3;
    }
  }
}

.category-label {
  padding: 12px 16px;
  font-size: 14px;
  color: #323233;
  background-color: #fff;
}

.table-header {
  display: flex;
  padding: 12px 16px;
  background-color: #fff;
  border-bottom: 1px solid #ebedf0;
  font-size: 12px;
  color: #969799;
  
  .header-col {
    flex: 1;
    
    &.name-col {
      flex: 2;
    }
    
    &.price-col {
      text-align: right;
    }
    
    &.change-col {
      text-align: right;
      padding-right: 8px;
    }
  }
}

.coin-list {
  background-color: #fff;
  padding: 0 16px;
  
  .coin-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #ebedf0;
    cursor: pointer;
    
    .coin-icon {
      flex: none;
      width: 6.66667vw;
      height: 6.66667vw;
      margin-right: 1.86667vw;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .coin-symbol {
        color: #fff;
        font-weight: bold;
        font-size: 18px;
      }
    }
    
    .coin-info {
      flex: 1;
      
      .coin-name {
        font-size: 3.73333vw;
        font-weight: bolder;
        color: #040303;
        margin-bottom: 4px;
      }
      
      .coin-pair {
        font-size: 3.2vw;
        color: #5b616e;
      }
    }
    
    .coin-price {
      text-align: right;
      margin-right: 12px;
      
      .price-value {
        font-size: 3.73333vw;
        font-weight: 500;
        color: #040303;
        margin-bottom: 4px;
        font-weight: bolder;
      }
      
      .price-usd {
        font-size: 3.2vw;
        color: #5b616e;
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
        background-color: #ec4b6d;
        font-size: 3.73333vw;
        color: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 1.06667vw;
        border-radius: 1.06667vw;
        width: 21.33333vw;
        height: 8vw;
      }
      
      &.down {
        background-color: #07c160;
        font-size: 3.73333vw;
        color: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 1.06667vw;
        border-radius: 1.06667vw;
        width: 21.33333vw;
        height: 8vw;
      }
    }
  }
}
</style>
