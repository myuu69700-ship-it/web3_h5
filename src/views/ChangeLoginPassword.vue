<template>
  <div class="change-login-password">
    <van-nav-bar
      title="修改登陸密碼"
      left-arrow
      @click-left="goBack"
      fixed
      placeholder
    />

    <div class="content">
      <!-- 原密碼 -->
      <div class="form-section">
        <div class="form-label">原密碼</div>
        <van-field
          v-model="originalPassword"
          :type="showOriginalPassword ? 'text' : 'password'"
          placeholder="請輸入原密碼"
          class="input-field"
        >
          <template #right-icon>
            <van-icon
              :name="showOriginalPassword ? 'eye-o' : 'closed-eye'"
              @click="showOriginalPassword = !showOriginalPassword"
              class="eye-icon"
            />
          </template>
        </van-field>
      </div>

      <!-- 設置新密碼 -->
      <div class="form-section">
        <div class="form-label">設置新密碼</div>
        <van-field
          v-model="newPassword"
          :type="showNewPassword ? 'text' : 'password'"
          placeholder="請輸入新密碼"
          class="input-field"
        >
          <template #right-icon>
            <van-icon
              :name="showNewPassword ? 'eye-o' : 'closed-eye'"
              @click="showNewPassword = !showNewPassword"
              class="eye-icon"
            />
          </template>
        </van-field>
      </div>

      <!-- 確認新密碼 -->
      <div class="form-section">
        <div class="form-label">確認新密碼</div>
        <van-field
          v-model="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="再次確認新密碼"
          class="input-field"
        >
          <template #right-icon>
            <van-icon
              :name="showConfirmPassword ? 'eye-o' : 'closed-eye'"
              @click="showConfirmPassword = !showConfirmPassword"
              class="eye-icon"
            />
          </template>
        </van-field>
      </div>

      <!-- 注意事項 -->
      <div class="notice">
        *注意:請牢記登陸密碼,如忘記登陸密碼請聯繫平台在線客服。
      </div>

      <!-- 提交按鈕 -->
      <div class="submit-section">
        <van-button
          type="primary"
          block
          size="large"
          class="submit-btn"
          @click="handleSubmit"
        >
          提交修改
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const originalPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showOriginalPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const goBack = () => {
  router.back()
}

const handleSubmit = () => {
  // 驗證邏輯
  if (!originalPassword.value) {
    // TODO: 顯示錯誤提示
    console.log('請輸入原密碼')
    return
  }
  
  if (!newPassword.value) {
    // TODO: 顯示錯誤提示
    console.log('請輸入新密碼')
    return
  }
  
  if (newPassword.value !== confirmPassword.value) {
    // TODO: 顯示錯誤提示
    console.log('新密碼與確認密碼不一致')
    return
  }
  
  // TODO: 實現提交邏輯
  console.log('提交修改密碼', {
    originalPassword: originalPassword.value,
    newPassword: newPassword.value
  })
}
</script>

<style lang="scss" scoped>
.change-login-password {
  min-height: 100vh;
  background-color: #fff;
}

.content {
  padding: 16px;
  padding-top: 16px;
}

.form-section {
  margin-bottom: 24px;

  .form-label {
    font-size: 16px;
    color: #000;
    margin-bottom: 12px;
    font-weight: 500;
  }

  .input-field {
    border: 1px solid #ebedf0;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;

    :deep(.van-field__control) {
      font-size: 14px;
      color: #323233;
      padding: 12px 16px;

      &::placeholder {
        color: #969799;
        font-size: 14px;
      }
    }

    .eye-icon {
      font-size: 18px;
      color: #969799;
      cursor: pointer;
      padding-right: 16px;
    }
  }
}

.notice {
  font-size: 14px;
  color: #000;
  line-height: 1.5;
  margin-top: 16px;
  margin-bottom: 32px;
}

.submit-section {
  margin-top: 40px;

  .submit-btn {
    width: 100%;
    height: 48px;
    background-color: #000;
    border: none;
    border-radius: 8px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;

    &:active {
      opacity: 0.8;
    }
  }
}
</style>

