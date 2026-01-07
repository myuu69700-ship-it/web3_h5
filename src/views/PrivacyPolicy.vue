<template>
  <div class="privacy-policy">
    <!-- 顶部导航栏 -->
    <div class="header">
      <van-icon name="arrow-left" class="back-icon" @click="goBack" />
      <div class="title">隱私協議</div>
    </div>

    <!-- 内容区域 - 可滚动 -->
    <div class="content-wrapper">
      <div class="content">
        <!-- 隱私政策 -->
        <section class="section">
          <h1 class="main-title">隱私政策</h1>
          <p class="paragraph">
            本平台將管理與您的會員資格、使用本平台品牌頁面或網站（包括我們擁有或運營的應用程序、移動電話或平板電腦）或其他交易相關的個人信息。我們致力於確保我們收集的個人信息根據隱私法和本政策得到保護、使用、存儲和披露。
          </p>
        </section>

        <!-- 1 網站使用 -->
        <section class="section">
          <h2 class="section-title">1 網站使用</h2>
          <p class="paragraph">
            使用本網站即表示您同意受本隱私政策條款的約束。我們保留不時審查和更改本隱私政策的權利，並通過在網站上發布更新來進行更改。更改將在發布時立即生效。如果您在發布更改後繼續使用本網站，則表示您接受該更改。本隱私政策不適用於從本平台鏈接的網站或超出本平台控制的網站。
          </p>
        </section>

        <!-- 2 個人信息 -->
        <section class="section">
          <h2 class="section-title">2 個人信息</h2>
          <p class="paragraph">我們可能會收集或可能收集的個人信息類型包括：</p>
          <ul class="list">
            <li>姓名</li>
            <li>電子郵件地址</li>
            <li>個人提交偏好</li>
            <li>出生日期</li>
            <li>公民權國家</li>
            <li>真實地址</li>
            <li>身份證號碼</li>
            <li>政府簽發的身份證明</li>
            <li>位置數據</li>
            <li>設備信息</li>
            <li>IP地址</li>
          </ul>
          <p class="paragraph">公司收集或可能收集此類信息的方式如下：</p>
          <ul class="list">
            <li>在帳戶註冊過程中輸入數據</li>
            <li>與客戶溝通</li>
          </ul>
        </section>

        <!-- 3 收集目的 -->
        <section class="section">
          <h2 class="section-title">3 收集目的</h2>
          <p class="paragraph">
            本平台將僅通過合法、公平的方式收集您的個人信息，不會以侵擾方式利用其業務用於以下目的：
          </p>
          <ul class="list">
            <li>了解您的客戶(KYC)身份驗證。</li>
            <li>如果您想訂閱平台的營銷傳播。</li>
            <li>處理您的申請以成為平台或任何託管子域的成員。</li>
            <li>為會員提供和改進服務。</li>
            <li>出於安全目的識別您的會員身份並驗證您的身份，並遵守我們的法律義務。</li>
            <li>維護您的會員帳戶。</li>
            <li>在網站內或通過電話升級和增強您的體驗，或定製或開發信息、服務或產品以滿足您的需求，其中可能包括市場調查和開展促銷活動。</li>
            <li>通過電子郵件、短信或電話與您溝通，向您介紹我們認為您可能感興趣的產品或服務。</li>
            <li>通過人口統計分析、數據庫統計分析來創建有關成員的聚合數據，以提供給潛在和現有的利益相關者，並使平台的業務更有效地運行。</li>
            <li>回應您的問題、意見或要求。</li>
            <li>確定會員支付 GST 和其他稅款的責任(如果適用)。</li>
            <li>遵守合同、法律和法定義務的權利。</li>
            <li>如果平台有理由懷疑與我們的職能和活動有關的嚴重非法活動或不當行為已經、正在或可能從事，則採取適當的行動。</li>
            <li>確立、行使或捍衛任何法律主張。</li>
            <li>管理職位申請。</li>
          </ul>
          <p class="paragraph">
            如果您不向平台提供我們要求的個人信息，我們可能無法處理您的會員申請、為您提供我們的服務或回复您的查詢或投訴。
          </p>
          <p class="paragraph">
            使用平台、成為會員或以其他方式選擇向平台提供個人信息，即表示您同意平台出於上述目的並根據本隱私政策所述收集、使用、處理和披露您的個人信息。
          </p>
        </section>

        <!-- 4 直接營銷和選擇退出 -->
        <section class="section">
          <h2 class="section-title">4 直接營銷和選擇退出</h2>
          <p class="paragraph">
            我們可能會不時使用您的個人信息來通知您我們的產品或服務，或平台認為您可能感興趣或有益的促銷活動。我們會通過電子郵件、短信、電話或郵件來完成此操作。
          </p>
          <p class="paragraph">
            如果您不想再收到來自平台或任何特定形式的營銷或促銷材料，可以隨時通過電子郵件與我們聯繫。根據您的要求，我們將盡快滿足您的要求。
          </p>
          <p class="paragraph">
            我們可能會不時就您的平台帳戶的管理和管理與您聯繫。此類通信可以通過註冊成為會員時記錄的任何聯繫方式進行。此類通信不會影響您選擇加入或退出直接營銷通信的狀態。
          </p>
        </section>

        <!-- 5 您個人信息的管理 -->
        <section class="section">
          <h2 class="section-title">5 您個人信息的管理</h2>
          <p class="paragraph">
            平台將採取一切合理措施確保其收集、使用或披露的個人信息正確無誤，並存儲在只有授權人員才能訪問的安全環境中。
          </p>
          <p class="paragraph">
            只要您使用我們的服務，我們就會存儲您的個人信息，或者根據需要實現我們收集信息的目的、提供我們的服務、解決糾紛、建立法律辯護、進行審計、追求合法的商業目的、執行我們的政策和遵守法律義務。
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
.privacy-policy {
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
  }
}
</style>

