<template>
  <div class="order-book">
    <div class="order-book-content">
      <!-- 买盘 -->
      <div class="order-section buy-section">
        <div class="order-header">買盤</div>
        <div class="order-list">
          <div
            v-for="(order, index) in buyOrders"
            :key="index"
            class="order-item buy-order"
            :class="{ highlight: order.highlight }"
          >
            <span class="order-price">{{ formatPrice(order.price) }}</span>
            <span class="order-amount">{{ formatAmount(order.amount) }}</span>
          </div>
        </div>
      </div>

      <!-- 当前价格 -->
      <div class="current-price">
        <div class="price-value">{{ formatPrice(currentPrice) }}</div>
        <div class="price-info">
          ≈ ${{ formatPrice(currentPrice) }}
          <span class="price-change" :class="priceChange >= 0 ? 'positive' : 'negative'">
            {{ priceChange >= 0 ? '+' : '' }}{{ priceChange }}%
          </span>
        </div>
      </div>

      <!-- 卖盘 -->
      <div class="order-section sell-section">
        <div class="order-header">賣盤</div>
        <div class="order-list">
          <div
            v-for="(order, index) in sellOrders"
            :key="index"
            class="order-item sell-order"
            :class="{ highlight: order.highlight }"
          >
            <span class="order-price">{{ formatPrice(order.price) }}</span>
            <span class="order-amount">{{ formatAmount(order.amount) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  buyOrders: {
    type: Array,
    default: () => []
  },
  sellOrders: {
    type: Array,
    default: () => []
  },
  currentPrice: {
    type: Number,
    required: true
  },
  priceChange: {
    type: Number,
    default: 0
  }
})

// 格式化价格 - 根据价格大小决定小数位数
const formatPrice = (price) => {
  if (price >= 1000) {
    return price.toFixed(2)
  } else if (price >= 1) {
    return price.toFixed(4)
  } else {
    return price.toFixed(6)
  }
}

// 格式化数量
const formatAmount = (amount) => {
  if (amount >= 1000) {
    return amount.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return amount.toLocaleString('en-US', { maximumFractionDigits: 2 })
}
</script>

<style lang="scss" scoped>
.order-book {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  flex: 1;
  min-width: 0;
  max-width: 300px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
}

.order-book-content {
  display: flex;
  flex-direction: column;
}

.order-section {
  flex: 1;

  .order-header {
    font-size: 14px;
    font-weight: 500;
    color: #040303;
    margin-bottom: 8px;
  }

  .order-list {
    .order-item {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      font-size: 13px;
      transition: background-color 0.2s;

      &.buy-order {
        .order-price {
          color: #26a69a;
        }

        &.highlight {
          background-color: rgba(38, 166, 154, 0.1);
        }
      }

      &.sell-order {
        .order-price {
          color: #ef5350;
        }

        &.highlight {
          background-color: rgba(239, 83, 80, 0.1);
        }
      }

      .order-price {
        font-weight: 500;
      }

      .order-amount {
        color: #969799;
      }
    }
  }
}

.current-price {
  text-align: center;
  padding: 16px 0;
  border-top: 1px solid #ebedf0;
  border-bottom: 1px solid #ebedf0;
  margin: 12px 0;

  .price-value {
    font-size: 24px;
    font-weight: 600;
    color: #26a69a;
    margin-bottom: 4px;
  }

  .price-info {
    font-size: 12px;
    color: #969799;

    .price-change {
      margin-left: 8px;

      &.positive {
        color: #26a69a;
      }

      &.negative {
        color: #ef5350;
      }
    }
  }
}
</style>

