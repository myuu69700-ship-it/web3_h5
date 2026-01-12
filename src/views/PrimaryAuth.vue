<template>
  <div class="primary-auth">
    <van-nav-bar
      title="初級認證"
      left-arrow
      @click-left="goBack"
      fixed
      placeholder
    />

    <div class="content">
      <!-- 類型選擇 -->
      <div class="form-section">
        <div class="form-label">類型</div>
        <div class="select-field" @click="showTypePicker = true">
          <div class="select-content">
            <span class="select-text">{{ selectedType }}</span>
          </div>
          <van-icon name="arrow-down" class="arrow-icon" />
        </div>
      </div>

      <!-- 真實姓名 -->
      <div class="form-section">
        <div class="form-label">真實姓名</div>
        <van-field
          v-model="realName"
          placeholder="請輸入真實姓名"
          class="input-field"
        />
      </div>

      <!-- 證件號碼 -->
      <div class="form-section">
        <div class="form-label">證件號碼</div>
        <van-field
          v-model="idNumber"
          placeholder="請輸入證件號碼"
          class="input-field"
        />
      </div>

      <!-- 上傳證件照正面 -->
      <div class="form-section">
        <div class="form-label">上傳證件照正面</div>
        <div class="upload-wrapper">
          <van-uploader
            v-model="frontFileList"
            :max-count="1"
            :after-read="afterReadFront"
            class="custom-uploader"
          >
            <div class="upload-placeholder">
              <div class="upload-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="6" width="16" height="12" rx="1" stroke="#4CAF50" stroke-width="1.5" fill="none"/>
                  <circle cx="8" cy="10" r="1.5" fill="#4CAF50"/>
                  <line x1="4" y1="14" x2="20" y2="14" stroke="#4CAF50" stroke-width="1.5" stroke-linecap="round"/>
                  <line x1="4" y1="16" x2="20" y2="16" stroke="#4CAF50" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M8 6 L8 4 C8 3.44772 8.44772 3 9 3 L15 3 C15.5523 3 16 3.44772 16 4 L16 6" stroke="#4CAF50" stroke-width="1.5" fill="none"/>
                </svg>
              </div>
              <div class="upload-text">選擇文件</div>
            </div>
          </van-uploader>
        </div>
      </div>

      <!-- 上傳證件照反面 -->
      <div class="form-section">
        <div class="form-label">上傳證件照反面</div>
        <div class="upload-wrapper">
          <van-uploader
            v-model="backFileList"
            :max-count="1"
            :after-read="afterReadBack"
            class="custom-uploader"
          >
            <div class="upload-placeholder">
              <div class="upload-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="6" width="16" height="12" rx="1" stroke="#4CAF50" stroke-width="1.5" fill="none"/>
                  <line x1="4" y1="10" x2="20" y2="10" stroke="#4CAF50" stroke-width="1.5" stroke-linecap="round"/>
                  <line x1="4" y1="12" x2="20" y2="12" stroke="#4CAF50" stroke-width="1.5" stroke-linecap="round"/>
                  <line x1="4" y1="14" x2="20" y2="14" stroke="#4CAF50" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="upload-text">選擇文件</div>
            </div>
          </van-uploader>
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
          提交認證
        </van-button>
      </div>
    </div>

    <!-- 類型選擇器 -->
    <van-popup
      v-model:show="showTypePicker"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-picker
        :columns="typeOptions"
        @confirm="onTypeConfirm"
        @cancel="showTypePicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

const realName = ref('')
const idNumber = ref('')
const selectedType = ref('身份認證')
const showTypePicker = ref(false)
const frontFileList = ref([])
const backFileList = ref([])

// 類型選項
const typeOptions = [
  { text: '身份認證', value: '身份認證' },
  { text: '護照認證', value: '護照認證' },
  { text: '駕駛證認證', value: '駕駛證認證' },
]

const onTypeConfirm = ({ selectedOptions }) => {
  selectedType.value = selectedOptions[0].text
  showTypePicker.value = false
}

const afterReadFront = (file) => {
  // 文件上傳後的處理
  console.log('正面照片上傳:', file)
}

const afterReadBack = (file) => {
  // 文件上傳後的處理
  console.log('反面照片上傳:', file)
}

const goBack = () => {
  router.back()
}

const handleSubmit = () => {
  // 表單驗證
  if (!realName.value.trim()) {
    showToast('請輸入真實姓名')
    return
  }
  if (!idNumber.value.trim()) {
    showToast('請輸入證件號碼')
    return
  }
  if (frontFileList.value.length === 0) {
    showToast('請上傳證件照正面')
    return
  }
  if (backFileList.value.length === 0) {
    showToast('請上傳證件照反面')
    return
  }

  // 提交邏輯
  console.log('提交認證', {
    type: selectedType.value,
    realName: realName.value,
    idNumber: idNumber.value,
    frontFile: frontFileList.value[0],
    backFile: backFileList.value[0],
  })

  showToast('提交成功')
  // 可以添加API調用
  // 成功後返回上一頁
  setTimeout(() => {
    router.back()
  }, 1500)
}
</script>

<style lang="scss" scoped>
.primary-auth {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding-bottom: 20px;
}

.content {
  padding: 16px;
}

.form-section {
  margin-bottom: 24px;

  .form-label {
    font-size: 16px;
    color: #323233;
    margin-bottom: 12px;
    font-weight: 500;
  }

  .select-field {
    background-color: #fff;
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    min-height: 48px;

    .select-content {
      flex: 1;

      .select-text {
        font-size: 16px;
        color: #323233;
      }
    }

    .arrow-icon {
      font-size: 16px;
      color: #969799;
      flex-shrink: 0;
    }
  }

  :deep(.input-field) {
    background-color: #fff;
    border-radius: 8px;
    padding: 0;

    .van-field__control {
      font-size: 16px;
      color: #323233;
      padding: 12px 16px;
    }

    .van-field__body {
      padding: 0;
    }

    .van-field__label {
      display: none;
    }
  }

  .upload-wrapper {
    background-color: #fff;
    border-radius: 8px;
    width: 100%;

    :deep(.custom-uploader) {
      width: 100%;

      .van-uploader {
        width: 100%;
      }

      .van-uploader__wrapper {
        display: block;
      }

      .van-uploader__upload {
        width: 100%;
        margin: 0;
        border: 2px dashed #d9d9d9;
        border-radius: 8px;
        min-height: 180px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        transition: all 0.3s;
        position: relative;

        &:active {
          opacity: 0.8;
          border-color: #4CAF50;
        }
      }

      .van-uploader__input {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }

      .upload-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        pointer-events: none;

        .upload-icon {
          width: 64px;
          height: 64px;
          margin-bottom: 12px;
          color: #4CAF50;

          svg {
            width: 100%;
            height: 100%;
          }
        }

        .upload-text {
          font-size: 16px;
          color: #4CAF50;
          font-weight: 500;
        }
      }

      .van-uploader__preview {
        width: 100%;
        margin: 0;
        border: 2px dashed #4CAF50;
        border-radius: 8px;
        min-height: 180px;
        position: relative;

        .van-uploader__preview-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 8px;
        }

        .van-uploader__preview-delete {
          background-color: rgba(0, 0, 0, 0.5);
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}

.submit-section {
  margin-top: 32px;
  padding-bottom: 20px;

  .submit-btn {
    background-color: #000;
    border: none;
    border-radius: 8px;
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }
}
</style>

