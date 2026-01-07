<template>
  <div class="anti-money-laundering">
    <!-- 顶部导航栏 -->
    <div class="header">
      <van-icon name="arrow-left" class="back-icon" @click="goBack" />
      <div class="title">反洗錢協議</div>
    </div>

    <!-- 内容区域 - 可滚动 -->
    <div class="content-wrapper">
      <div class="content">
        <!-- 反洗钱、反恐怖主义融资声明 -->
        <section class="section">
          <h1 class="main-title">反洗錢、反恐怖主義融資聲明</h1>
        </section>

        <!-- 1. 公司商業模式 -->
        <section class="section">
          <h2 class="section-title">1. 公司商業模式</h2>
          <p class="paragraph">
            作為其全球運營的一部分，本平台已建立與其服務和產品相稱的合規措施。這些措施旨在合理防止和檢測平台上的非法活動。本平台特別關注客戶入職、合規篩選以及對基於交易的運營的控制。
          </p>
        </section>

        <!-- 2. 公司政策聲明 -->
        <section class="section">
          <h2 class="section-title">2. 公司政策聲明</h2>
          <p class="paragraph">
            本平台的目標是遵守全球最佳實踐，以防止其交易產品被用於促進非法活動。這些最佳實踐包括：
          </p>
          <ul class="list">
            <li>合理設計的書面政策、程序和控制措施，以防止洗錢、恐怖主義融資和違反貿易制裁</li>
            <li>在適當的情況下，指定合規官監督政策、程序和控制的實施</li>
            <li>向人員提供相關教育和培訓</li>
            <li>對政策、程序和控制措施進行獨立審查、監督和維護</li>
          </ul>
        </section>

        <!-- 3. 定義 -->
        <section class="section">
          <h2 class="section-title">3. 定義</h2>
          
          <div class="definition-item">
            <h3 class="definition-title">洗錢 (Money Laundering)</h3>
            <p class="paragraph">
              洗錢是指使非法獲得的收益看起來合法的過程。它通常涉及三個步驟：安置、分層和合併。
            </p>
          </div>

          <div class="definition-item">
            <h3 class="definition-title">安置 (Placement)</h3>
            <p class="paragraph">
              安置是指通過存款或其他方式將非法收益存入傳統金融機構的過程。
            </p>
          </div>

          <div class="definition-item">
            <h3 class="definition-title">分層 (Layering)</h3>
            <p class="paragraph">
              分層是指通過使用複雜的金融交易層將犯罪活動的收益與其來源分離的過程。例如，將現金轉換為旅行支票、匯票、電匯、信用證、股票、債券或購買資產。
            </p>
          </div>

          <div class="definition-item">
            <h3 class="definition-title">合併 (Integration)</h3>
            <p class="paragraph">
              合併是指使用看似合法的交易來隱藏非法收益，允許"洗淨"的資金重新分配給犯罪分子，並將現在乾淨的資金重新整合到正常使用中。
            </p>
          </div>

          <div class="definition-item">
            <h3 class="definition-title">可疑活動 (Suspicious Activity)</h3>
            <p class="paragraph">
              可疑活動是指設施的用戶或非用戶參與可能用於欺詐或非法目的的交易活動。
            </p>
          </div>

          <div class="definition-item">
            <h3 class="definition-title">制裁 (Sanctions)</h3>
            <p class="paragraph">
              制裁是指國際社會為禁止或限制受制裁實體的活動而採取的行動。制裁的使用示例包括：
            </p>
            <ul class="list">
              <li>鼓勵目標國家或政權改變其行為</li>
              <li>向目標國家施加壓力以遵守既定目標</li>
              <li>當國際和平與安全受到威脅且外交努力失敗時，作為執法工具</li>
              <li>防止和遏制恐怖主義融資或恐怖主義行為</li>
            </ul>
          </div>
        </section>

        <!-- 4. 治理和監督 -->
        <section class="section">
          <h2 class="section-title">4. 治理和監督</h2>
          <p class="paragraph">
            已任命首席合規官協調反洗錢政策和政策計劃的實施。
          </p>
          <p class="paragraph">首席合規官的職責包括：</p>
          <ul class="list">
            <li>制定反洗錢計劃</li>
            <li>與其他利益相關者合作修訂反洗錢政策</li>
            <li>評估新的監管要求</li>
            <li>調查潛在的可疑或異常活動</li>
          </ul>
          <p class="paragraph">
            本平台定期向所有員工提供反洗錢培訓。
          </p>
        </section>

        <!-- 5. 了解你的客戶和交易監控 -->
        <section class="section">
          <h2 class="section-title">5. 了解你的客戶和交易監控</h2>
          <p class="paragraph">
            本平台致力於根據法律要求實施適當的用戶盡職調查和持續監控措施。
          </p>
          <p class="paragraph">
            本平台將努力防止用戶從事非法或其他未經授權的活動。
          </p>
          <p class="paragraph">
            本平台將其軟件開發和其他服務協議整合在一起，這些協議通過內部運營職能執行，以確保遵守適用的法律。
          </p>
          <p class="paragraph">了解你的客戶 (KYC) 和客戶盡職調查：</p>
          <p class="paragraph">
            本平台採用基於風險的客戶交易監控機制。該機制使本平台能夠了解用戶與平台關係的性質和目的，這對於創建客戶風險檔案至關重要。
          </p>
          <p class="paragraph">
            為實現這一目標，本平台在開戶時收集特定的有文件和無文件信息。這些信息根據帳戶類型和所提供服務的性質進行定制。
          </p>
          <p class="paragraph">
            本平台為不同客戶維護不同的客戶交易監控機制，這意味著採用分層或基於風險的方法。
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style lang="scss" scoped>
.anti-money-laundering {
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  position: relative;
  border-bottom: 1px solid #ebedf0;
  background-color: #fff;
  flex-shrink: 0;
  z-index: 10;

  .back-icon {
    font-size: 20px;
    color: #040303;
    cursor: pointer;
    z-index: 2;
  }

  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: 600;
    color: #040303;
    width: 100%;
    text-align: center;
  }
}

.content-wrapper {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background-color: #fff;
}

.content {
  padding: 20px 16px;
  line-height: 1.8;
  color: #040303;
  max-width: 100%;

  .main-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #040303;
    line-height: 1.5;
  }

  .section {
    margin-bottom: 28px;

    .section-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 14px;
      color: #040303;
      line-height: 1.5;
    }

    .paragraph {
      font-size: 14px;
      line-height: 1.8;
      margin-bottom: 12px;
      color: #040303;
      word-break: break-word;
    }

    .list {
      margin-top: 12px;
      padding-left: 0;
      list-style: none;

      li {
        font-size: 14px;
        line-height: 1.8;
        margin-bottom: 10px;
        color: #040303;
        word-break: break-word;
        padding-left: 16px;
        position: relative;

        &::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #040303;
        }
      }
    }

    .definition-item {
      margin-bottom: 20px;

      .definition-title {
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 10px;
        color: #040303;
        line-height: 1.5;
      }
    }
  }
}
</style>

