<template>
  <div class="charity-detail">
    <!-- 顶部导航栏 -->
    <div class="nav-bar">
      <van-icon name="arrow-left" class="back-icon" @click="goBack" />
      <div class="support-btn" @click="handleSupport">支持我們</div>
    </div>

    <!-- Banner区域 -->
    <div class="banner-section">
      <div class="banner-overlay">
        <h1 class="banner-title">WEB3改革慈善事業的方案</h1>
      </div>
    </div>

    <!-- 介绍文字 -->
    <div class="intro-section">
      <p class="intro-text">
        我們是「Web3」慈善機構,一個非營利組織,致力於與web3的技術作為正義力量的未來
      </p>
    </div>

    <!-- 我们做了什么 -->
    <div class="what-we-do-section">
      <div class="section-title">
        <span class="bullet">■</span>
        <span>我們做了什麼</span>
      </div>

      <div class="features-list">
        <div class="feature-item">
          <div class="feature-icon icon-transparency">
            <div class="icon-inner">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">透明與可追溯性</h3>
            <p class="feature-desc">
              使用區塊鏈技術可以實現捐款和資金流向的透明化,捐款人可以準確地追蹤他們的資金用於何處,確保捐款的去向合法且符合預期。
            </p>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon icon-reduce">
            <div class="icon-inner">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">減少中間環節</h3>
            <p class="feature-desc">
              去除了傳統的中間機構和手續費,將資金直接流向受益人或慈善項目,從而最大程度地減少了捐款的成本和時間。
            </p>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon icon-smart">
            <div class="icon-inner">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M9 9h6M9 15h6M9 12h6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">智能合約</h3>
            <p class="feature-desc">
              利用智能合約自動化捐款流程,確保捐款達到特定條件時會被釋放,以提高捐款的可信度和安全性。
            </p>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon icon-community">
            <div class="icon-inner">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">社區參與與激勵</h3>
            <p class="feature-desc">
              利用加密貨幣和區塊鏈技術可以建立社區參與的激勵機制,例如透過代幣獎勵來鼓勵參與者做出貢獻,從而促進更多人參與慈善活動。
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 统计数据 -->
    <div class="stats-section">
      <div class="section-title">
        <span class="bullet">■</span>
        <span>捐款與收益</span>
      </div>
      <div class="stats-content">
        <div class="stat-item">
          <div class="stat-label">總收益人數</div>
          <div class="stat-value stat-beneficiaries">422801</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">捐款金額</div>
          <div class="stat-value stat-amount">$62.48M</div>
        </div>
      </div>
    </div>

    <!-- 合作单位 -->
    <div class="partners-section">
      <div class="section-title">
        <span class="bullet">■</span>
        <span>合作單位</span>
      </div>
      <div class="partners-list">
        <div class="partner-item">
          <div class="partner-logo uwa-logo">
            <div class="logo-text">THE UNIVERSITY OF WESTERN AUSTRALIA</div>
          </div>
        </div>
        <div class="partner-item">
          <div class="partner-logo berkeley-logo">
            <div class="logo-text">Berkeley</div>
            <div class="logo-subtext">UNIVERSITY OF CALIFORNIA</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 慈善捐款纪录 -->
    <div class="records-section">
      <div class="section-title">
        <span class="bullet">■</span>
        <span>慈善捐款紀錄</span>
      </div>
      <div class="records-table">
        <div class="table-header">
          <div class="header-cell">參與用戶/捐款時間</div>
          <div class="header-cell">捐款金額</div>
        </div>
        <div class="table-body">
          <div
            class="table-row"
            v-for="(record, index) in donationRecords"
            :key="index"
          >
            <div class="table-cell">
              <div class="user-id">{{ record.userId }}</div>
              <div class="donation-time">{{ record.time }}</div>
            </div>
            <div class="table-cell amount-cell">{{ record.amount }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back();
};

const handleSupport = () => {
  // 支持我们的逻辑
  console.log("支持我們");
};

// 捐款纪录数据
const donationRecords = ref([
  {
    userId: "0******9",
    time: "2025/02/25 04:55:43",
    amount: "1283.67 USDT",
  },
  {
    userId: "x******y",
    time: "2025/02/14 23:56:42",
    amount: "300 USDT",
  },
  {
    userId: "0******y",
    time: "2025/02/11 10:04:28",
    amount: "157.18 USDT",
  },
  {
    userId: "0******C",
    time: "2025/01/15 09:52:24",
    amount: "1018.72 USDT",
  },
  {
    userId: "9******y",
    time: "2024/12/12 04:54:19",
    amount: "369.43 USDT",
  },
  {
    userId: "0******f",
    time: "2024/11/17 02:34:41",
    amount: "346.78 USDT",
  },
  {
    userId: "0******y",
    time: "2024/09/01 15:23:22",
    amount: "212.47 USDT",
  },
  {
    userId: "0******y",
    time: "2024/08/08 02:51:21",
    amount: "458.53 USDT",
  },
]);
</script>

<style lang="scss" scoped>
.charity-detail {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 20px;
  padding: 0 2.66667vw;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62.39px;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
  margin-bottom: 3vw;
  padding: 0 1.66667vw;
  //   border-bottom: 1px solid #ebedf0;

  .back-icon {
    font-size: 20px;
    color: #040303;
    cursor: pointer;
  }

  .support-btn {
    color: #2b6d16;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }
}

.banner-section {
  width: 100%;
  height: 166.39px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 0 auto;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
        circle at 50% 30%,
        rgba(255, 255, 255, 0.15) 0%,
        transparent 40%
      ),
      radial-gradient(
        circle at 50% 70%,
        rgba(255, 200, 200, 0.1) 0%,
        transparent 50%
      );
    background-size: 150% 150%;
    animation: shimmer 4s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.6) 0%,
      transparent 100%
    );
    pointer-events: none;
  }

  .banner-overlay {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 0 20px;

    .banner-title {
      color: #fff;
      font-size: 24px;
      font-weight: 700;
      line-height: 1.4;
      text-shadow: 0 2px 20px rgba(255, 255, 255, 0.3),
        0 4px 30px rgba(255, 100, 100, 0.2);
      letter-spacing: 1px;
    }
  }
}

@keyframes shimmer {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.intro-section {
  margin: 4.26667vw 0 5.86667vw;
  font-size: 3.2vw;
  color: #040303;

  .intro-text {
    margin: 4.26667vw 0 5.86667vw;
    font-size: 3.2vw;
    color: #040303;
  }
}

.what-we-do-section,
.stats-section,
.partners-section,
.records-section {
  //   padding: 14px 20px;
  background-color: #fff;
  //   margin-top: 16px;
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 20.8px;
  margin-top: 5vw;
  //   font-weight: 600;
  color: #040303;

  .bullet {
    margin-right: 8px;
    font-size: 12px;
  }
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  .icon-inner {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;

    svg {
      width: 100%;
      height: 100%;
      color: #333;
    }
  }

  &.icon-transparency {
    background: linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%);
  }

  &.icon-reduce {
    background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  }

  &.icon-smart {
    background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  }

  &.icon-community {
    background: linear-gradient(135deg, #a0de1f 0%, #7cb518 100%);
  }
}

.feature-content {
  flex: 1;

  .feature-title {
    font-size: 18px;
    font-weight: 400;
    color: #040303;
    // margin: 0 0 12px 0;
  }

  .feature-desc {
    font-size: 14px;
    color: #323233;
    line-height: 1.6;
    margin: 0;
  }
}

.stats-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  //   padding: 20px 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-label {
  font-size: 3.73333vw;
  color: #040303;
}

.stat-value {
  font-size: 32px;
//   font-weight: 700;
  line-height: 1.2;

  &.stat-beneficiaries {
    color: #1989fa;
    font-size: 9.6vw
  }

  &.stat-amount {
    color: #07c160;
    font-size: 9.6vw
  }
}

.partners-list {
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 20px 0;
  flex-wrap: wrap;
}

.partner-item {
  flex: 1;
  min-width: 140px;
}

.partner-logo {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &.uwa-logo {
    background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
    color: #000;
    border: 2px solid #000;

    .logo-text {
      font-size: 12px;
      font-weight: 700;
      text-align: center;
      line-height: 1.4;
    }
  }

  &.berkeley-logo {
    background-color: #000;
    color: #ffd700;
    border: 2px solid #ffd700;

    .logo-text {
      font-size: 18px;
      font-weight: 700;
      font-style: italic;
      margin-bottom: 4px;
    }

    .logo-subtext {
      font-size: 9px;
      text-align: center;
      letter-spacing: 0.5px;
    }
  }
}

.records-table {
  margin-top: 16px;
  border: 1px solid #ebedf0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
}

.table-header {
  display: flex;
  background-color: #f7f8fa;
  border-bottom: 1px solid #ebedf0;

  .header-cell {
    flex: 1;
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 600;
    color: #040303;

    &:first-child {
      border-right: 1px solid #ebedf0;
    }
  }
}

.table-body {
  .table-row {
    display: flex;
    border-bottom: 1px solid #ebedf0;

    &:last-child {
      border-bottom: none;
    }
  }

  .table-cell {
    flex: 1;
    padding: 16px;
    font-size: 14px;
    color: #323233;

    &:first-child {
      border-right: 1px solid #ebedf0;
    }

    &.amount-cell {
      font-weight: 600;
      color: #1989fa;
      text-align: right;
    }
  }

  .user-id {
    font-weight: 500;
    margin-bottom: 4px;
  }

  .donation-time {
    font-size: 12px;
    color: #969799;
  }
}

@media (max-width: 375px) {
  .banner-section {
    height: 250px;

    .banner-overlay .banner-title {
      font-size: 20px;
    }
  }

  .feature-icon {
    width: 14.93333vw;
    height: 14.93333vw;

    .icon-inner {
      width: 45px;
      height: 45px;
    }
  }

  .stat-value {
    font-size: 28px;
  }
}
</style>
