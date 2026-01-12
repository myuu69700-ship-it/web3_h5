<template>
  <div class="market">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <van-search
        v-model="searchValue"
        placeholder="搜尋幣對"
        @click="showSearchModal = true"
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

    <!-- 子类别标签（仅市场页面显示） -->
    <div v-if="activeMainTab === 'market'" class="sub-tabs">
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

    <!-- 市场页面内容 -->
    <template v-if="activeMainTab === 'market'">
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
    </template>

    <!-- 新闻页面内容 -->
    <template v-if="activeMainTab === 'news'">
      <div class="news-list">
        <div
          v-for="article in newsList"
          :key="article.id"
          class="news-item"
          @click="handleNewsClick(article)"
        >
          <!-- 作者信息 -->
          <div class="article-author">
            <img :src="article.authorAvatar" :alt="article.authorName" class="author-avatar" />
            <div class="author-info">
              <div class="author-name">{{ article.authorName }}</div>
              <div class="article-time">{{ article.timestamp }}</div>
            </div>
          </div>

          <!-- 文章标题 -->
          <div class="article-title">{{ article.title }}</div>

          <!-- 缩略图 -->
          <div class="article-thumbnail">
            <img :src="article.thumbnail" :alt="article.title" />
            <!-- 缩略图上的文字覆盖 -->
            <div class="thumbnail-overlay">
              <div class="overlay-title">{{ article.title }}</div>
              <div class="overlay-author">{{ article.authorName }}</div>
            </div>
          </div>

          <!-- 互动数据和价格更新 -->
          <div class="article-footer">
            <div class="engagement-metrics">
              <div class="metric-item">
                <van-icon name="good-job-o" class="metric-icon" />
                <span class="metric-value">{{ article.likes }}</span>
              </div>
              <div class="metric-item">
                <van-icon name="eye-o" class="metric-icon" />
                <span class="metric-value">{{ article.views }}</span>
              </div>
            </div>
            <div v-if="article.priceUpdate" class="price-update" :class="article.priceUpdate.change >= 0 ? 'up' : 'down'">
              {{ article.priceUpdate.symbol }} {{ article.priceUpdate.change >= 0 ? '+' : '' }}{{ article.priceUpdate.change }}%
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 币对搜索弹窗 -->
    <CoinPairSearchModal
      v-model="showSearchModal"
      @select="handleSelectCoinPair"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CoinPairSearchModal from '@/components/Home/CoinPairSearchModal.vue'
import btcImage from '@/assets/images/BTC.webp'
import btc2Image from '@/assets/images/btc2.webp'

const router = useRouter()
const searchValue = ref('')
const activeMainTab = ref('market')
const activeSubTab = ref('spot')
const showSearchModal = ref(false)

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

// 处理选择交易对
const handleSelectCoinPair = (coin) => {
  // 处理选择交易对 - 跳转到详情页
  const pair = coin.pair || `${coin.symbol}${coin.pair || '/USDT'}`
  router.push(`/coin/${encodeURIComponent(pair)}`)
}

// 处理币种点击
const handleCoinClick = (coin) => {
  router.push(`/coin/${coin.pair}`)
}

// 新闻列表数据
const newsList = ref([
  {
    id: 1,
    authorName: 'Opeyemi Sule',
    authorAvatar: 'https://via.placeholder.com/40/cccccc/ffffff?text=OS',
    timestamp: '01-11-2026 07:43:38',
    title: 'Analyst Sets $105K As Next Bitcoin Price Target — Here\'s The Timeline',
    thumbnail: btcImage,
    likes: 5261,
    views: 4270,
    priceUpdate: null
  },
  {
    id: 2,
    authorName: 'Opeyemi Sule',
    authorAvatar: 'https://via.placeholder.com/40/cccccc/ffffff?text=OS',
    timestamp: '01-11-2026 06:32:01',
    title: 'Attention, Bitcoin Bulls: Here\'s Why $99K Might Be The Next Crucial Level To Watch',
    thumbnail: btc2Image,
    likes: 3207,
    views: 3662,
    priceUpdate: {
      symbol: 'AAVE',
      change: 1.4976
    }
  },
  {
    id: 3,
    authorName: 'Godspower Owie',
    authorAvatar: 'https://via.placeholder.com/40/cccccc/ffffff?text=GO',
    timestamp: '01-11-2026 02:47:02',
    title: 'Chainlink Stuck In A Micro-Range As Traders Await A Clear Trigger',
    thumbnail: btcImage,
    likes: 2800,
    views: 3200,
    priceUpdate: null
  },
  {
    id: 4,
    authorName: 'Opeyemi Sule',
    authorAvatar: 'https://via.placeholder.com/40/cccccc/ffffff?text=OS',
    timestamp: '01-10-2026 18:20:15',
    title: 'Bitcoin Market Analysis: Key Support Levels To Watch This Week',
    thumbnail: btc2Image,
    likes: 4500,
    views: 5100,
    priceUpdate: {
      symbol: 'TRX',
      change: -1.1984
    }
  },
  {
    id: 5,
    authorName: 'Opeyemi Sule',
    authorAvatar: 'https://via.placeholder.com/40/cccccc/ffffff?text=OS',
    timestamp: '01-10-2026 15:30:45',
    title: 'Ethereum Price Prediction: What Analysts Are Saying',
    thumbnail: btcImage,
    likes: 3800,
    views: 4200,
    priceUpdate: {
      symbol: 'ETH',
      change: 1.2658
    }
  }
])

// 处理新闻点击
const handleNewsClick = (article) => {
  // 可以跳转到新闻详情页
  console.log('点击新闻:', article)
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

// 新闻列表样式
.news-list {
  background-color: #fff;
  padding: 16px;
  
  .news-item {
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid #ebedf0;
    cursor: pointer;
    
    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
    
    .article-author {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      
      .author-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 12px;
        object-fit: cover;
      }
      
      .author-info {
        flex: 1;
        
        .author-name {
          font-size: 16px;
          font-weight: bold;
          color: #323233;
          margin-bottom: 4px;
        }
        
        .article-time {
          font-size: 12px;
          color: #969799;
        }
      }
    }
    
    .article-title {
      font-size: 18px;
      font-weight: bold;
      color: #323233;
      margin-bottom: 12px;
      line-height: 1.4;
    }
    
    .article-thumbnail {
      width: 100%;
      margin-bottom: 12px;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      aspect-ratio: 16 / 9;
      
      img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
      
      .thumbnail-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
        padding: 16px 12px 12px;
        color: #fff;
        
        .overlay-title {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .overlay-author {
          font-size: 12px;
          opacity: 0.9;
        }
      }
    }
    
    .article-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .engagement-metrics {
        display: flex;
        align-items: center;
        gap: 20px;
        
        .metric-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #969799;
          
          .metric-icon {
            font-size: 16px;
          }
          
          .metric-value {
            font-size: 14px;
          }
        }
      }
      
      .price-update {
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
        background-color: #f3f3f3;
        white-space: nowrap;
        
        &.up {
          color: #07c160;
        }
        
        &.down {
          color: #8b4513;
        }
      }
    }
  }
}
</style>
