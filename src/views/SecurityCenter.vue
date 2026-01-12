<template>
  <div class="security-center">
    <van-nav-bar
      :title="t('securityCenter')"
      left-arrow
      @click-left="goBack"
      fixed
      placeholder
    />

    <div class="content">
      <!-- 初級認證 -->
      <div class="security-card" @click="handlePrimaryAuth">
        <div class="card-header">
          <div class="card-title">{{ t('primaryAuthentication') }}</div>
          <div class="status-badge status-unverified">{{ t('unverified') }}</div>
        </div>
        <div class="card-description">{{ t('primaryAuthDescription') }}</div>
        <van-icon name="arrow" class="arrow-icon" />
      </div>

      <!-- 登錄密碼 -->
      <div class="security-card" @click="handleLoginPassword">
        <div class="card-header">
          <div class="card-title">{{ t('loginPassword') }}</div>
        </div>
        <div class="card-description">{{ t('loginPasswordDescription') }}</div>
        <van-icon name="arrow" class="arrow-icon" />
      </div>

      <!-- 信箱綁定 -->
      <div class="security-card" @click="handleEmailBinding">
        <div class="card-header">
          <div class="card-title">{{ t('emailBinding') }}</div>
          <div class="status-badge status-bound">{{ t('bound') }}</div>
        </div>
        <div class="card-description">{{ t('emailBindingDescription') }}</div>
        <van-icon name="arrow" class="arrow-icon" />
      </div>

      <!-- 交易密碼 -->
      <div class="security-card" @click="handleTransactionPassword">
        <div class="card-header">
          <div class="card-title">{{ t('transactionPassword') }}</div>
          <div class="status-badge status-unset">{{ t('notSet') }}</div>
        </div>
        <div class="card-description">{{ t('transactionPasswordDescription') }}</div>
        <van-icon name="arrow" class="arrow-icon" />
      </div>

      <!-- 手机认证 -->
      <div class="security-card" @click="handlePhoneAuth">
        <div class="card-header">
          <div class="card-title">{{ t('phoneAuthentication') }}</div>
          <div class="status-badge status-unverified">{{ t('unverified') }}</div>
        </div>
        <div class="card-description">{{ t('emailBindingDescription') }}</div>
        <van-icon name="arrow" class="arrow-icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from '@/i18n'

const router = useRouter()
const { t } = useI18n()

const goBack = () => {
  router.back()
}

const handlePrimaryAuth = () => {
  router.push('/primary-auth')
}

const handleLoginPassword = () => {
  // 处理登錄密碼点击
  console.log('登錄密碼')
}

const handleEmailBinding = () => {
  // 处理信箱綁定点击
  console.log('信箱綁定')
}

const handleTransactionPassword = () => {
  // 处理交易密碼点击
  console.log('交易密碼')
}

const handlePhoneAuth = () => {
  // 处理手机认证点击
  console.log('手机认证')
}
</script>

<style lang="scss" scoped>
.security-center {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding-bottom: 20px;
}

.content {
  padding: 16px;
  padding-top: 16px;
}

.security-card {
  height: 124px;
  background-color: #f3f3f3;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 5.33333vw;

  &:active {
    opacity: 0.8;
    background-color: #f5f5f5;
  }

  .card-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 8px;
    gap: 8px;
    padding-right: 32px;

    .card-title {
      font-size: 16px;
      font-weight: 500;
      color: #000;
      white-space: nowrap;
    }

    .status-badge {
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      line-height: 1.4;
      flex-shrink: 0;

      &.status-unverified {
        background-color: #ffeaea;
        color: #ee0a24;
      }

      &.status-bound {
        background-color: #e8f8f0;
        color: #07c160;
      }

      &.status-unset {
        background-color: #ffeaea;
        color: #ee0a24;
      }
    }
  }

  .card-description {
    font-size: 14px;
    color: #969799;
    line-height: 1.5;
    padding-right: 32px;
    margin-top: 0;
  }

  .arrow-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    color: #646566;
    pointer-events: none;
  }
}
</style>

