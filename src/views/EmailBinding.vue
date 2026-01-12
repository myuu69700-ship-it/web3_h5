<template>
  <div class="email-binding">
    <van-nav-bar
      title="郵箱認證"
      left-arrow
      @click-left="goBack"
      fixed
      placeholder
    />

    <div class="content">
      <!-- 郵箱地址 -->
      <div class="form-section">
        <div class="form-label">郵箱地址</div>
        <van-field
          v-model="email"
          placeholder="請輸入要确认的邮箱地址"
          class="input-field"
        />
      </div>

      <!-- 驗證碼 -->
      <div class="form-section">
        <div class="form-label">驗證碼</div>
        <div class="code-input-wrapper">
          <van-field
            v-model="verificationCode"
            placeholder="請輸入驗證碼"
            class="code-input-field"
          />
          <van-button
            type="primary"
            class="send-btn"
            @click="handleSendCode"
            :disabled="countdown > 0"
          >
            {{ countdown > 0 ? `${countdown}秒` : "發送" }}
          </van-button>
        </div>
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
          提交綁定
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { showToast } from "vant";

const router = useRouter();

const email = ref("HeidiThomas5060@outlook.com");
const verificationCode = ref("");
const countdown = ref(0);
let countdownTimer = null;

const goBack = () => {
  router.back();
};

const handleSendCode = () => {
  if (!email.value) {
    showToast("請輸入郵箱地址");
    return;
  }

  // 發送驗證碼邏輯
  console.log("發送驗證碼到:", email.value);
  showToast("驗證碼已發送");

  // 開始倒計時
  countdown.value = 60;
  countdownTimer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
  }, 1000);
};

const handleSubmit = () => {
  if (!email.value) {
    showToast("請輸入郵箱地址");
    return;
  }

  if (!verificationCode.value) {
    showToast("請輸入驗證碼");
    return;
  }

  // 提交綁定邏輯
  console.log("提交綁定", {
    email: email.value,
    verificationCode: verificationCode.value,
  });

  showToast("綁定成功");
  // 可以添加API調用
  // 成功後返回上一頁
  setTimeout(() => {
    router.back();
  }, 1500);
};
</script>

<style lang="scss" scoped>
.email-binding {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 20px;
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
      //   padding: 12px 16px;
      padding: 8px 0px;

      &::placeholder {
        color: #969799;
        font-size: 14px;
      }
    }
  }

  .code-input-wrapper {
    display: flex;
    gap: 12px;
    align-items: flex-start;

    .code-input-field {
      flex: 1;
      border: 1px solid #ebedf0;
      border-radius: 8px;
      overflow: hidden;
      background-color: #fff;

      :deep(.van-field__control) {
        // font-size: 14px;
        color: #323233;
        padding: 8px 0px;
        background-color: unset;
        font-size: 4vw;

        &::placeholder {
          color: #969799;
          font-size: 4vw;
        }
      }
    }

    .send-btn {
      flex-shrink: 0;
      height: 48px;
      min-width: 80px;
      background-color: #000;
      border: none;
      border-radius: 8px;
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      padding: 0 16px;

      &:active {
        opacity: 0.8;
      }

      &:disabled {
        opacity: 0.6;
        background-color: #969799;
      }
    }
  }
}

.submit-section {
  margin-top: 40px;
  padding-bottom: 20px;

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
