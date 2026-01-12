<template>
  <div class="notification-detail">
    <!-- 顶部导航栏 -->
    <div class="header">
      <van-icon name="arrow-left" class="back-icon" @click="goBack" />
      <div class="title">詳情</div>
    </div>

    <!-- 内容区域 -->
    <div class="content" v-if="currentNotification">
      <h1 class="main-title">{{ currentNotification.title }}</h1>
      <div class="time">{{ currentNotification.time }}</div>
      <div class="article-content">{{ currentNotification.content }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// 通知数据
const notifications = [
  {
    id: 1,
    title: "交易所更新通知",
    time: "2025-05-15 15:12",
    content:
      "您好,现交易所正在维护升级,更新服务器,因中国大陆部分地区出现网络不佳或打不开卡顿等原因,交易所现做出服务更新维护,维护时长6小时至24小时,给您带来不便请您谅解,再次感谢您对交易所的信任与使用!做此通告!请知悉!",
  },
  {
    id: 2,
    title: "交易所借幣功能更新",
    time: "2025-05-14 10:30",
    content:
      "尊敬的用戶，我們很高興地宣布交易所借幣功能已全面更新升級。新版本提供了更優惠的利率、更靈活的還款方式以及更完善的安全保障。請您及時更新應用程序以享受最新功能。如有任何疑問，歡迎聯繫客服。",
  },
  {
    id: 3,
    title: "虛擬預約金活動",
    time: "2025-05-13 14:20",
    content:
      "為回饋廣大用戶的支持，我們推出了虛擬預約金活動。參與活動即可獲得豐厚獎勵，活動時間有限，請抓緊時間參與。詳細活動規則請查看活動頁面。",
  },
  {
    id: 4,
    title: "WEB3 selt-buit pool",
    time: "2025-05-12 16:45",
    content:
      "我們推出了全新的 WEB3 selt-buit pool 功能，為用戶提供更多元化的投資選擇。該功能採用先進的技術架構，確保資金安全和收益穩定。",
  },
  {
    id: 5,
    title: "預約存款贈送USDT活動",
    time: "2025-05-11 11:15",
    content:
      "為慶祝平台升級，我們推出預約存款贈送USDT活動。凡在活動期間預約存款的用戶，均可獲得USDT獎勵。活動名額有限，先到先得。",
  },
  {
    id: 6,
    title: "活期生息",
    time: "2025-05-10 09:30",
    content:
      "平台推出活期生息功能，用戶可將閒置資金存入活期賬戶，享受靈活存取和高收益。支持多種數字貨幣，利率優厚，隨時可取。",
  },
  {
    id: 7,
    title: "關於抄襲WEB3官網的公告",
    time: "2025-05-09 15:00",
    content:
      "近期發現有不法分子惡意抄襲本平台官網設計，請廣大用戶認準官方網站，避免誤入虛假網站造成財產損失。我們已採取法律手段維護權益，請用戶提高警惕。",
  },
  {
    id: 8,
    title: "WEB3新用戶回饋活動",
    time: "2025-05-08 13:25",
    content:
      "為歡迎新用戶加入，我們特別推出新用戶回饋活動。新註冊用戶可獲得豐厚禮包，包括交易手續費優惠券、新手教程指導等。活動詳情請查看活動頁面。",
  },
  {
    id: 9,
    title: "WEB3交易所監管查詢",
    time: "2025-05-07 10:10",
    content:
      "為提升平台透明度和用戶信任度，我們開通了監管查詢功能。用戶可通過該功能查詢平台的監管狀態、合規信息等，確保投資安全。",
  },
];

// 當前通知
const currentNotification = computed(() => {
  const id = parseInt(route.params.id);
  return notifications.find((n) => n.id === id);
});

const goBack = () => {
  router.back();
};
</script>

<style lang="scss" scoped>
.notification-detail {
  min-height: 100vh;
  background-color: #fff;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  position: relative;
  border-bottom: 1px solid #ebedf0;

  .back-icon {
    font-size: 20px;
    color: #040303;
    cursor: pointer;
  }

  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: 500;
    color: #040303;
  }
}

.content {
  padding: 24px 16px;
  line-height: 1.6;
  color: #040303;

  .main-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #040303;
    line-height: 1.5;
  }

  .time {
    font-size: 14px;
    color: #1989fa;
    margin-bottom: 24px;
    line-height: 1.5;
  }

  .article-content {
    font-size: 14px;
    line-height: 1.8;
    color: #040303;
    text-align: justify;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}
</style>

