<template>
  <div class="deposit-detail">
    <van-nav-bar title="儲值" fixed placeholder left-arrow @click-left="goBack" />
    
    <div class="content">
      <!-- 二维码区域 -->
      <div class="qr-section">
        <div class="qr-code-container">
          <div class="qr-code">
            <!-- 这里使用Canvas绘制二维码，实际应该使用二维码生成库生成真实的二维码 -->
            <canvas ref="qrCanvas" class="qr-canvas"></canvas>
          </div>
        </div>
        <div class="deposit-label">存入錢包</div>
        <div class="deposit-hint">複製您的唯一地址或使用二維碼存款</div>
      </div>

      <!-- 钱包地址区域 -->
      <div class="wallet-address-section">
        <div class="address-label">錢包地址</div>
        <div class="address-input-wrapper">
          <input 
            type="text" 
            class="address-input" 
            :value="walletAddress" 
            readonly
            ref="addressInput"
          />
          <button class="copy-btn" @click="copyAddress">複製</button>
        </div>
      </div>

      <!-- 主网标签 -->
      <div class="network-section">
        <div class="network-label">主網</div>
      </div>

      <!-- 说明文字区域 -->
      <div class="instructions-section">
        <div class="instruction-item">
          Web3 支援USDT、ETH、BTC、USDC、充值。
        </div>
        <div class="instruction-item">
          请在发起转账前确认网络和地址。
        </div>
        <div class="instruction-item">
          通过其他网络进行的存款将无法到账,并且可能导致资金永久丢失。
        </div>
        <div class="instruction-item">
          入金顯示資金「已提交」後,依不同儲值方式,後台處理儲值所需的時間也不同,實際收款以Web3 交易商收款顯示為準。
        </div>
        <div class="instruction-item">
          資金到達 Web3 帳戶後需要進行資金認證批准。美國假日不處理審核流程,請預留存款處理時間。據悉大陸地區無法進行出入金操作,感謝您對 Web3 的支持!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const addressInput = ref(null)
const qrCanvas = ref(null)

// 钱包地址（示例地址，实际应该从API获取）
const walletAddress = ref('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5')

// 绘制二维码（模拟）
const drawQRCode = () => {
  if (!qrCanvas.value) return
  
  const canvas = qrCanvas.value
  const size = 200
  canvas.width = size
  canvas.height = size
  
  const ctx = canvas.getContext('2d')
  const modules = 25
  const cellSize = size / modules
  
  // 清空画布
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, size, size)
  
  // 绘制二维码图案（模拟）
  ctx.fillStyle = '#000000'
  
  // 绘制定位点（三个角的方形）
  const drawFinderPattern = (x, y) => {
    // 外框 7x7
    ctx.fillRect(x * cellSize, y * cellSize, 7 * cellSize, 7 * cellSize)
    // 内框 5x5 白色
    ctx.fillStyle = '#ffffff'
    ctx.fillRect((x + 1) * cellSize, (y + 1) * cellSize, 5 * cellSize, 5 * cellSize)
    // 中心 3x3 黑色
    ctx.fillStyle = '#000000'
    ctx.fillRect((x + 2) * cellSize, (y + 2) * cellSize, 3 * cellSize, 3 * cellSize)
  }
  
  // 绘制三个定位点
  drawFinderPattern(0, 0)
  drawFinderPattern(18, 0)
  drawFinderPattern(0, 18)
  
  // 绘制数据区域（随机模式，模拟二维码）
  for (let i = 0; i < modules; i++) {
    for (let j = 0; j < modules; j++) {
      // 跳过定位点区域
      if ((i < 9 && j < 9) || (i < 9 && j >= 16) || (i >= 16 && j < 9)) {
        continue
      }
      
      // 创建一些模式，看起来更像二维码
      const pattern = (i * 7 + j * 11) % 3 === 0 || (i * 13 + j * 17) % 5 === 0
      if (pattern) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize)
      }
    }
  }
}

onMounted(() => {
  drawQRCode()
})

// 返回
const goBack = () => {
  router.back()
}

// 复制地址
const copyAddress = async () => {
  try {
    if (addressInput.value) {
      addressInput.value.select()
      await navigator.clipboard.writeText(walletAddress.value)
      showToast({
        message: '已複製到剪貼板',
        type: 'success'
      })
    }
  } catch (err) {
    // 如果clipboard API不可用，使用传统方法
    try {
      const textArea = document.createElement('textarea')
      textArea.value = walletAddress.value
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      showToast({
        message: '已複製到剪貼板',
        type: 'success'
      })
    } catch (e) {
      showToast({
        message: '複製失敗',
        type: 'fail'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.deposit-detail {
  min-height: 100vh;
  background-color: #ffffff;
  padding-bottom: 60px;
}

.content {
  padding: 16px;
}

// 二维码区域
.qr-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  padding-top: 24px;

  .qr-code-container {
    margin-bottom: 16px;

      .qr-code {
        width: 240px;
        height: 240px;
        background-color: #ffffff;
        border: 1px solid #ebedf0;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;

        .qr-canvas {
          width: 100%;
          height: 100%;
          image-rendering: pixelated;
        }
      }
  }

  .deposit-label {
    font-size: 16px;
    font-weight: 500;
    color: #07c160;
    margin-bottom: 8px;
  }

  .deposit-hint {
    font-size: 12px;
    color: #969799;
    text-align: center;
    padding: 0 16px;
  }
}

// 钱包地址区域
.wallet-address-section {
  margin-bottom: 24px;

  .address-label {
    font-size: 14px;
    color: #323233;
    margin-bottom: 8px;
  }

  .address-input-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;

    .address-input {
      flex: 1;
      height: 44px;
      padding: 0 12px;
      background-color: #f7f8fa;
      border: 1px solid #ebedf0;
      border-radius: 4px;
      font-size: 14px;
      color: #323233;
      outline: none;

      &:focus {
        border-color: #07c160;
      }
    }

    .copy-btn {
      height: 44px;
      padding: 0 20px;
      background-color: #f7f8fa;
      border: 1px solid #ebedf0;
      border-radius: 4px;
      font-size: 14px;
      color: #07c160;
      cursor: pointer;
      white-space: nowrap;
      transition: background-color 0.2s;

      &:active {
        background-color: #ebedf0;
      }
    }
  }
}

// 主网区域
.network-section {
  margin-bottom: 32px;

  .network-label {
    font-size: 14px;
    color: #323233;
  }
}

// 说明文字区域
.instructions-section {
  .instruction-item {
    font-size: 12px;
    color: #646566;
    line-height: 1.6;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

