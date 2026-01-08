<template>
  <div class="my-assets">
    <van-nav-bar
      title="我的资产"
      fixed
      placeholder
      left-arrow
      @click-left="goBack"
    />

    <div class="content">
      <!-- 资产总估值和今日收益 -->
      <div class="asset-summary">
        <div class="summary-header">
          <span class="summary-title">資產總估值</span>
          <van-icon
            name="eye-o"
            class="eye-icon"
            @click="toggleBalanceVisibility"
          />
        </div>
        <div class="total-balance">
          <div v-if="balanceVisible" class="total-balance-text">
            <div class="total-balance-text-value">${{ totalBalance }}</div>
            <div class="total-balance-text-unit">USD</div>
          </div>
          <span v-else class="masked">*******.** USD</span>
        </div>
        <div class="daily-profit">
          <span>今日收益</span>
          <span :class="dailyProfit >= 0 ? 'profit' : 'loss'">
            <span v-if="balanceVisible"
              >{{ dailyProfit >= 0 ? "+" : "" }}{{ dailyProfit }} ({{
                dailyProfitPercent
              }}%)</span
            >
            <span v-else class="masked">*******.**</span>
          </span>
        </div>
      </div>

      <!-- 快速操作按钮 -->
      <div class="action-buttons">
        <div class="action-btn" @click="handleDeposit">
          <div class="btn-icon deposit-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 5L6 11M12 5L18 11"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="btn-label">儲值</span>
        </div>
        <div class="action-btn" @click="handleWithdraw">
          <div class="btn-icon withdraw-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 19V5M12 19L6 13M12 19L18 13"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="btn-label">提現</span>
        </div>
        <div class="action-btn" @click="handleTransfer">
          <div class="btn-icon transfer-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 7H16M8 7L5 4M8 7L5 10M16 17H8M16 17L19 20M16 17L19 14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="btn-label">劃轉</span>
        </div>
        <div class="action-btn" @click="handleBill">
          <div class="btn-icon bill-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 2V8H20"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="btn-label">帳單</span>
        </div>
        <div class="action-btn" @click="handleConvert">
          <div class="btn-icon convert-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="btn-label">閃兌</span>
        </div>
      </div>

      <!-- 资产分布 -->
      <div class="asset-distribution">
        <div class="section-title">資產分佈</div>
        <div class="distribution-cards">
          <div class="distribution-card">
            <div class="card-header">
              <div class="card-icon spot-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 16V8C21 7.46957 20.7893 6.96086 20.4142 6.58579C20.0391 6.21071 19.5304 6 19 6H5C4.46957 6 3.96086 6.21071 3.58579 6.58579C3.21071 6.96086 3 7.46957 3 8V16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18H19C19.5304 18 20.0391 17.7893 20.4142 17.4142C20.7893 17.0391 21 16.5304 21 16Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7 10H17M7 14H12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="card-percentage">{{ spotPercentage }}%</div>
            </div>
            <div class="card-label">現貨帳户</div>
            <div class="card-balance">
              <span v-if="balanceVisible">{{ spotBalance }}</span>
              <span v-else class="masked">*******.**</span>
            </div>
          </div>
          <div class="distribution-card">
            <div class="card-header">
              <div class="card-icon trading-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="card-percentage">{{ tradingPercentage }}%</div>
            </div>
            <div class="card-label">交易賬戶</div>
            <div class="card-balance">
              <span v-if="balanceVisible">{{ tradingBalance }}</span>
              <span v-else class="masked">*******.**</span>
            </div>
          </div>
          <div class="distribution-card">
            <div class="card-header">
              <div class="card-icon wealth-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="card-percentage">{{ wealthPercentage }}%</div>
            </div>
            <div class="card-label">理財帳户</div>
            <div class="card-balance">
              <span v-if="balanceVisible">{{ wealthBalance }}</span>
              <span v-else class="masked">*******.**</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 资产总览 -->
      <div class="asset-overview">
        <div class="overview-header">
          <div class="section-title">資產總覽</div>
          <div class="filter-option">
            <van-checkbox v-model="hideSmallAmounts" shape="square">
              隱藏金額≤1USD的幣種
            </van-checkbox>
          </div>
        </div>
        <div class="asset-list">
          <div class="list-header">
            <span class="header-col">名稱/數量</span>
            <span class="header-col">價值/現貨收益</span>
          </div>
          <div
            v-for="asset in filteredAssets"
            :key="asset.symbol"
            class="asset-item"
          >
            <div class="asset-left">
              <div
                class="asset-icon"
                :style="{ backgroundColor: asset.iconBg }"
              >
                <span class="icon-text">{{ asset.iconText }}</span>
              </div>
              <div class="asset-info">
                <div class="asset-name">{{ asset.symbol }}</div>
                <div class="asset-quantity">{{ asset.quantity }}</div>
              </div>
            </div>
            <div class="asset-right">
              <div class="asset-value">
                <span v-if="balanceVisible">${{ asset.value }}</span>
                <span v-else class="masked">*********</span>
              </div>
              <!-- <div class="asset-profit">
                <span v-if="balanceVisible">${{ asset.profit }}</span>
                <span v-else class="masked">*********</span>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 余额可见性
const balanceVisible = ref(true);

// 总资产和收益
const totalBalance = ref("0");
const dailyProfit = ref(0);
const dailyProfitPercent = ref("0.00");

// 资产分布
const spotBalance = ref("$0");
const tradingBalance = ref("$0");
const wealthBalance = ref("$0");
const spotPercentage = ref("0.00");
const tradingPercentage = ref("0.00");
const wealthPercentage = ref("0.00");

// 隐藏小额资产
const hideSmallAmounts = ref(false);

// 资产列表
const assets = ref([
  {
    symbol: "GRT",
    quantity: "0",
    value: "0.00",
    profit: "0.00",
    iconBg: "#6746ED",
    iconText: "G",
  },
  {
    symbol: "HBAR",
    quantity: "0",
    value: "0.00",
    profit: "0.00",
    iconBg: "#000000",
    iconText: "H",
  },
  {
    symbol: "ARB",
    quantity: "0",
    value: "0.00",
    profit: "0.00",
    iconBg: "#2D374B",
    iconText: "A",
  },
  {
    symbol: "TUSD",
    quantity: "0",
    value: "0.00",
    profit: "0.00",
    iconBg: "#002868",
    iconText: "T",
  },
  {
    symbol: "ETC",
    quantity: "0",
    value: "0.00",
    profit: "0.00",
    iconBg: "#00A859",
    iconText: "E",
  },
  {
    symbol: "IMX",
    quantity: "0",
    value: "0.00",
    profit: "0.00",
    iconBg: "#000000",
    iconText: "X",
  },
]);

// 过滤后的资产列表
const filteredAssets = computed(() => {
  if (!hideSmallAmounts.value) {
    return assets.value;
  }
  return assets.value.filter((asset) => parseFloat(asset.value) > 1);
});

// 切换余额可见性
const toggleBalanceVisibility = () => {
  balanceVisible.value = !balanceVisible.value;
};

// 返回
const goBack = () => {
  router.back();
};

// 操作按钮事件
const handleDeposit = () => {
  router.push("/deposit-detail");
};

const handleWithdraw = () => {
  router.push("/withdraw-detail");
};

const handleTransfer = () => {
  router.push("/transfer-detail");
};

const handleBill = () => {
  console.log("帳單");
};

const handleConvert = () => {
  console.log("閃兌");
};
</script>

<style lang="scss" scoped>
.my-assets {
  min-height: 100vh;
  background-color: #ffffff;
  padding-bottom: 60px;
}

.content {
  padding: 16px;
}

// 资产总估值和今日收益
.asset-summary {
  margin-bottom: 24px;

  .summary-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 12px;

    .summary-title {
      display: flex;
      align-items: center;
      font-size: 3.2vw;
      color: #494949;
      font-weight: 100;
    }

    .eye-icon {
      font-size: 14px;
      color: #969799;
      cursor: pointer;
      margin-left: 4px;
      margin-top: 2px;
    }
  }

  .total-balance {
    font-size: 32px;
    font-weight: 600;
    color: #040303;
    margin-bottom: 12px;

    .total-balance-text {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .total-balance-text-value {
        font-size: 7vw;
        font-weight: 700;
        margin-right: 2.66667vw;
        color: #000;
        word-wrap: break-word;
        word-break: break-word;
        white-space: normal;
      }
      .total-balance-text-unit {
        margin-right: 2.66667vw;
        color: #333333;
        font-size: 4vw;
        line-height: 100%;
        margin-top: 2.33333vw;
      }
    }

    .masked {
      letter-spacing: 2px;
    }
  }

  .daily-profit {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    color: #323233;

    .profit {
      color: #07c160;
    }

    .loss {
      color: #ee0a24;
    }

    .masked {
      letter-spacing: 2px;
    }
  }
}

// 快速操作按钮
.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 0 8px;

  .action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    .btn-icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background-color: rgb(51, 109, 24);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;

      svg {
        width: 24px;
        height: 24px;
        color: #ffffff;
      }
    }

    .btn-label {
      font-size: 12px;
      color: #323233;
    }
  }
}

// 资产分布
.asset-distribution {
  margin-bottom: 32px;

  .section-title {
    font-size: 4.26667vw;
    color: #333;
    margin-bottom: 16px;
  }

  .distribution-cards {
    display: flex;
    gap: 12px;

    .distribution-card {
      flex: 1;
      background: #f3f3f3;
      border-radius: 3.2vw;
      padding: 4.26667vw 3.2vw;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      min-width: 0;
      overflow: hidden;
      position: relative;
      z-index: 1;
      height: 112.7px;
      pointer-events: auto;

      .card-header {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 8px;

        .card-icon {
          width: 20.8px;
          height: 20.8px;
          flex-shrink: 0;
          margin-right: 8px;

          svg {
            width: 100%;
            height: 100%;
            color: #969799;
          }
        }

        .card-percentage {
          font-size: 3.2vw;
          font-weight: 500;
          color: #2b6d16;
          margin-left: 5.5vw;
          margin-top: -2vw;
        }
      }

      .card-label {
        margin-bottom: auto;
        margin-top: 4px;
        font-size: 3.73333vw;
        color: #333;
      }

      .card-balance {
        font-size: 3.46667vw;
        font-weight: 500;
        color: #333;
        margin-top: auto;

        .masked {
          letter-spacing: 1px;
        }
      }
    }
  }
}

// 资产总览
.asset-overview {
  .overview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .section-title {
      font-size: 4.26667vw;
      color: #333;
    }

    .filter-option {
      :deep(.van-checkbox) {
        font-size: 3.2vw;
        // color: #040303 !important;
      }
    }
  }

  .asset-list {
    .list-header {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #ebedf0;
      font-size: 12px;
      color: #969799;

      .header-col {
        flex: 1;
        font-size: 3.2vw;
        color: #040303;
      }
    }

    .asset-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid #ebedf0;

      &:last-child {
        border-bottom: none;
      }

      .asset-left {
        display: flex;
        align-items: center;
        flex: 1;

        .asset-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;

          .icon-text {
            color: #ffffff;
            font-size: 16px;
            font-weight: 600;
          }
        }

        .asset-info {
          .asset-name {
            font-size: 4vw;
            font-weight: 500;
            color: #040303;
            margin-bottom: 4px;
          }

          .asset-quantity {
            font-size: 3.73333vw;
            color: #040303;
          }
        }
      }

      .asset-right {
        text-align: right;

        .asset-value {
          font-size: 4.3vw;
          font-weight: 500;
          color: #040303;
          margin-bottom: 4px;

          .masked {
            letter-spacing: 1px;
          }
        }

        .asset-profit {
          font-size: 12px;
          color: #969799;

          .masked {
            letter-spacing: 1px;
          }
        }
      }
    }
  }
}

.masked {
  font-family: monospace;
}
</style>
