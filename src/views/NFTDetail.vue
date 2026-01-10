<template>
  <div class="nft-detail">
    <!-- 顶部导航栏 -->
    <div class="nav-bar">
      <van-icon name="arrow-left" class="back-icon" @click="goBack" />
      <div class="nav-title">NFT</div>
    </div>

    <div class="content-wrapper">
      <!-- 视频/轮播区域 -->
      <div class="carousel-section">
        <div class="carousel-container">
          <van-swipe 
            :autoplay="3000" 
            :show-indicators="true"
            indicator-color="#fff"
            class="nft-carousel"
          >
            <van-swipe-item v-for="(item, index) in carouselItems" :key="index">
              <div class="carousel-item">
                <div class="carousel-nft-cards">
                  <div class="carousel-nft-card" :style="{ backgroundColor: item.leftCard.bgColor }">
                    <div class="carousel-nft-placeholder">{{ item.leftCard.placeholder }}</div>
                  </div>
                  <div class="carousel-nft-card" :style="{ backgroundColor: item.rightCard.bgColor }">
                    <div class="carousel-nft-placeholder">{{ item.rightCard.placeholder }}</div>
                  </div>
                </div>
                <div class="play-button-overlay">
                  <van-icon name="play-circle-o" size="60" color="#4CAF50" />
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>

      <!-- 统计仪表板 -->
      <div class="stats-section">
        <div class="stats-grid">
          <div class="stat-card blue">
            <div class="stat-icon">
              <van-icon name="bar-chart-o" size="24" color="#fff" />
            </div>
            <div class="stat-value">5,728</div>
            <div class="stat-label">交易量(單)</div>
          </div>
          <div class="stat-card black">
            <div class="stat-icon">
              <div class="menu-icon-custom">
                <div class="menu-line"></div>
                <div class="menu-line"></div>
                <div class="menu-line"></div>
              </div>
            </div>
            <div class="stat-value">37,354,239</div>
            <div class="stat-label">交易金額USDT</div>
          </div>
          <div class="stat-card orange">
            <div class="stat-icon">
              <div class="custom-nft-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                </svg>
                <span class="nft-text">NFT</span>
              </div>
            </div>
            <div class="stat-value">8,944</div>
            <div class="stat-label">NFT數量(張)</div>
          </div>
          <div class="stat-card green">
            <div class="stat-icon">
              <div class="people-icon-custom">
                <div class="person"></div>
                <div class="person"></div>
                <div class="person"></div>
              </div>
            </div>
            <div class="stat-value">982,486</div>
            <div class="stat-label">收益人數(人)</div>
          </div>
        </div>
      </div>

      <!-- Hot 部分 -->
      <div class="section hot-section">
        <div class="section-header">
          <span class="section-bullet">■</span>
          <span class="section-title">Hot</span>
          <van-icon name="arrow" class="section-arrow" />
        </div>
        <div class="nft-grid">
          <div 
            v-for="item in hotNFTs" 
            :key="item.id"
            class="nft-card"
            @click="handleNFTClick(item)"
          >
            <div class="nft-image-wrapper">
              <div class="nft-image" :style="{ backgroundColor: item.bgColor }">
                <div class="nft-placeholder">{{ item.placeholder }}</div>
              </div>
            </div>
            <div class="nft-info">
              <div class="nft-name">
                {{ item.name }}
                <van-icon name="passed" size="14" color="#4CAF50" class="verified-icon" />
              </div>
              <div class="nft-price">〒{{ item.price }}</div>
              <div class="nft-quantity">數量 {{ item.quantity }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ART 部分 -->
      <div class="section art-section">
        <div class="section-header">
          <span class="section-bullet">■</span>
          <span class="section-title">ART</span>
          <van-icon name="arrow" class="section-arrow" />
        </div>
        <div class="nft-grid">
          <div 
            v-for="item in artNFTs" 
            :key="item.id"
            class="nft-card"
            @click="handleNFTClick(item)"
          >
            <div class="nft-image-wrapper">
              <div class="nft-image" :style="{ backgroundColor: item.bgColor }">
                <div class="nft-placeholder">{{ item.placeholder }}</div>
              </div>
            </div>
            <div class="nft-info">
              <div class="nft-name">
                {{ item.name }}
                <van-icon name="passed" size="14" color="#4CAF50" class="verified-icon" />
              </div>
              <div class="nft-price">〒{{ item.price }}</div>
              <div class="nft-quantity">數量 {{ item.quantity }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Gaming 部分 -->
      <div class="section gaming-section">
        <div class="section-header">
          <span class="section-bullet">■</span>
          <span class="section-title">Gaming</span>
          <van-icon name="arrow" class="section-arrow" />
        </div>
        <div class="nft-grid">
          <div 
            v-for="item in gamingNFTs" 
            :key="item.id"
            class="nft-card"
            @click="handleNFTClick(item)"
          >
            <div class="nft-image-wrapper">
              <div class="nft-image" :style="{ backgroundColor: item.bgColor }">
                <div class="nft-placeholder">{{ item.placeholder }}</div>
              </div>
            </div>
            <div class="nft-info">
              <div class="nft-name">
                {{ item.name }}
                <van-icon name="passed" size="14" color="#4CAF50" class="verified-icon" />
              </div>
              <div class="nft-price">〒{{ item.price }}</div>
              <div class="nft-quantity">數量 {{ item.quantity }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- PFP 部分 -->
      <div class="section pfp-section">
        <div class="section-header">
          <span class="section-bullet">■</span>
          <span class="section-title">PFP</span>
          <van-icon name="arrow" class="section-arrow" />
        </div>
        <div class="nft-grid">
          <div 
            v-for="item in pfpNFTs" 
            :key="item.id"
            class="nft-card"
            @click="handleNFTClick(item)"
          >
            <div class="nft-image-wrapper">
              <div class="nft-image" :style="{ backgroundColor: item.bgColor }">
                <div class="nft-placeholder">{{ item.placeholder }}</div>
              </div>
            </div>
            <div class="nft-info">
              <div class="nft-name">
                {{ item.name }}
                <van-icon name="passed" size="14" color="#4CAF50" class="verified-icon" />
              </div>
              <div class="nft-price">〒{{ item.price }}</div>
              <div class="nft-quantity">數量 {{ item.quantity }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const handleNFTClick = (item) => {
  console.log('NFT clicked:', item)
  // 可以导航到 NFT 详情页
}

// 轮播图数据
const carouselItems = ref([
  { 
    id: 1, 
    leftCard: { bgColor: '#40E0D0', placeholder: '🦧' },
    rightCard: { bgColor: '#D3D3D3', placeholder: '🦧' }
  },
  { 
    id: 2, 
    leftCard: { bgColor: '#FF6B6B', placeholder: '🦍' },
    rightCard: { bgColor: '#4ECDC4', placeholder: '🦍' }
  },
  { 
    id: 3, 
    leftCard: { bgColor: '#95E1D3', placeholder: '🎨' },
    rightCard: { bgColor: '#F38181', placeholder: '🎨' }
  }
])

// Hot NFTs
const hotNFTs = ref([
  { id: 1, name: 'ApeReunion', price: '235.45', quantity: '23k', bgColor: '#FF0000', placeholder: '🦧' },
  { id: 2, name: 'MGLAND', price: '105.566', quantity: '49k', bgColor: '#4169E1', placeholder: 'MGLAND' }
])

// ART NFTs
const artNFTs = ref([
  { id: 3, name: 'OtherdeedforOthers...', price: '3070.84', quantity: '16k', bgColor: '#000000', placeholder: '⚔️' },
  { id: 4, name: 'TheSanctumNeophy...', price: '17.9085', quantity: '19k', bgColor: '#000000', placeholder: 'THE SANCTUM' },
  { id: 5, name: 'TheSandbox', price: '1338.43', quantity: '44k', bgColor: '#4169E1', placeholder: 'S' },
  { id: 6, name: 'WolfPupsOfficial', price: '4.71277', quantity: '47k', bgColor: '#DEB887', placeholder: '🐺' },
  { id: 7, name: 'AIORBIT', price: '22.4328', quantity: '23k', bgColor: '#000000', placeholder: '🌀' },
  { id: 8, name: 'BitcoinPunks', price: '141.195', quantity: '48k', bgColor: '#FFA500', placeholder: '👤' }
])

// Gaming NFTs
const gamingNFTs = ref([
  { id: 9, name: 'A.N.I.M.O', price: '56.5533', quantity: '36k', bgColor: '#FFD700', placeholder: '🚫' },
  { id: 10, name: 'Bullieverse-Barbeari...', price: '35.8171', quantity: '38k', bgColor: '#000000', placeholder: '🐻' },
  { id: 11, name: 'Castaways-Genesis', price: '1922.62', quantity: '31k', bgColor: '#F0E68C', placeholder: '✈️' },
  { id: 12, name: 'CitizensofBullieverlsl...', price: '133.654', quantity: '20k', bgColor: '#000000', placeholder: '🐂' },
  { id: 13, name: 'DeltanautsAlphaSilver', price: '52.7831', quantity: '21k', bgColor: '#000000', placeholder: '△' },
  { id: 14, name: 'HeroesNFTCollection', price: '54.4797', quantity: '19k', bgColor: '#87CEEB', placeholder: '🧙' }
])

// PFP NFTs
const pfpNFTs = ref([
  { id: 15, name: 'Azuki', price: '27334.1', quantity: '38k', bgColor: '#FF0000', placeholder: 'AZUKI' },
  { id: 16, name: 'BoredApeKennelClub', price: '13175', quantity: '49k', bgColor: '#FFC0CB', placeholder: '🐕' },
  { id: 17, name: 'BoredApeYachtClub', price: '124191', quantity: '20k', bgColor: '#87CEEB', placeholder: '🦍' },
  { id: 18, name: 'ChewZ', price: '15.0809', quantity: '15k', bgColor: '#FFC0CB', placeholder: 'ChewZ' },
  { id: 19, name: 'CLONEX-XTAKASHI...', price: '6560.18', quantity: '12k', bgColor: '#FFFFFF', placeholder: '⚡' },
  { id: 20, name: 'CoolCatsNFT', price: '2526.05', quantity: '48k', bgColor: '#FFC0CB', placeholder: '🐱' }
])
</script>

<style lang="scss" scoped>
.nft-detail {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 20px;
}

.nav-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ebedf0;

  .back-icon {
    font-size: 20px;
    color: #040303;
    cursor: pointer;
    margin-right: 12px;
  }

  .nav-title {
    font-size: 18px;
    font-weight: 600;
    color: #040303;
    flex: 1;
    text-align: center;
    margin-right: 32px;
  }
}

.content-wrapper {
  padding: 0 16px;
}

// 轮播区域
.carousel-section {
  margin: 16px 0;
  
  .carousel-container {
    width: 100%;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #fff;
    background-color: #000;
    position: relative;
  }

  .nft-carousel {
    width: 100%;
    height: 100%;

    .carousel-item {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;

      .carousel-nft-cards {
        display: flex;
        gap: 16px;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;

        .carousel-nft-card {
          flex: 1;
          max-width: 140px;
          height: 140px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;

          .carousel-nft-placeholder {
            font-size: 48px;
          }
        }
      }

      .play-button-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        pointer-events: none;
      }
    }
  }
}

// 统计仪表板
.stats-section {
  margin: 20px 0;

  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    .stat-card {
      padding: 16px;
      border-radius: 12px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100px;

      &.blue {
        background-color: #4169E1;
      }

      &.black {
        background-color: #000000;
      }

      &.orange {
        background-color: #FF8C00;
      }

      &.green {
        background-color: #4CAF50;
      }

      min-height: 110px;

      .stat-icon {
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: center;

        .menu-icon-custom {
          display: flex;
          flex-direction: column;
          gap: 4px;

          .menu-line {
            width: 20px;
            height: 2px;
            background-color: #fff;
            border-radius: 1px;
          }
        }

        .custom-nft-icon {
          width: 32px;
          height: 32px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;

          svg {
            width: 100%;
            height: 100%;
          }

          .nft-text {
            position: absolute;
            font-size: 8px;
            font-weight: bold;
            color: #fff;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .people-icon-custom {
          display: flex;
          gap: 4px;
          align-items: center;
          justify-content: center;

          .person {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #fff;
            position: relative;

            &::before {
              content: '';
              position: absolute;
              width: 12px;
              height: 12px;
              border-radius: 50% 50% 0 0;
              background-color: #fff;
              top: -8px;
              left: -2px;
            }
          }
        }
      }

      .stat-value {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 4px;
        text-align: center;
        line-height: 1.2;
        word-break: break-all;
      }

      .stat-label {
        font-size: 11px;
        opacity: 0.95;
        text-align: center;
        line-height: 1.3;
      }
    }
  }
}

// 部分样式
.section {
  margin: 24px 0;

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding: 0 4px;

    .section-bullet {
      font-size: 16px;
      color: #040303;
      margin-right: 8px;
    }

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #040303;
      flex: 1;
    }

    .section-arrow {
      font-size: 16px;
      color: #040303;
      transform: rotate(-90deg);
    }
  }

  .nft-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    .nft-card {
      background-color: #fff;
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;

      &:active {
        transform: scale(0.98);
        opacity: 0.8;
      }

      .nft-image-wrapper {
        width: 100%;
        aspect-ratio: 1;
        overflow: hidden;

        .nft-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;

          .nft-placeholder {
            font-size: 32px;
            text-align: center;
          }
        }
      }

      .nft-info {
        padding: 10px;
        background-color: #fff;

        .nft-name {
          font-size: 13px;
          font-weight: 600;
          color: #040303;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          .verified-icon {
            flex-shrink: 0;
          }
        }

        .nft-price {
          font-size: 14px;
          font-weight: 600;
          color: #4CAF50;
          margin-bottom: 4px;
        }

        .nft-quantity {
          font-size: 12px;
          color: #040303;
        }
      }
    }
  }
}
</style>
