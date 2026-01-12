<template>
  <div class="platform-notifications">
    <van-nav-bar
      :title="t('platformNotifications')"
      left-arrow
      @click-left="goBack"
      fixed
      placeholder
    />

    <div class="content">
      <div
        class="notification-item"
        v-for="(item, index) in notifications"
        :key="index"
        @click="handleNotificationClick(item)"
      >
        <div class="notification-text">{{ item.title }}</div>
        <van-icon name="arrow" class="arrow-icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "@/i18n";

const router = useRouter();
const { t } = useI18n();

const notifications = [
  { id: 1, title: "交易所更新通知" },
  { id: 2, title: "交易所借幣功能更新" },
  { id: 3, title: "虛擬預約金活動" },
  { id: 4, title: "WEB3 selt-buit pool" },
  { id: 5, title: "預約存款贈送USDT活動" },
  { id: 6, title: "活期生息" },
  { id: 7, title: "關於抄襲WEB3官網的公告" },
  { id: 8, title: "WEB3新用戶回饋活動" },
  { id: 9, title: "WEB3交易所監管查詢" },
];

const goBack = () => {
  router.back();
};

const handleNotificationClick = (item) => {
  // 跳转到详情页
  router.push(`/notification-detail/${item.id}`);
};
</script>

<style lang="scss" scoped>
.platform-notifications {
  min-height: 100vh;
  background-color: #fff;
}

.content {
  background-color: #fff;
}

.notification-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
  height: 16.53333vw;
  font-size: 16px;
  color: #000;
  &:nth-child(even) {
    background-color: #f3f3f3;
  }

  &:active {
    background-color: #f7f8fa;
  }

  &:last-child {
    border-bottom: none;
  }

  .notification-text {
    font-size: 16px;
    color: #000;
    flex: 1;
    line-height: 1.5;
  }

  .arrow-icon {
    font-size: 16px;
    color: #969799;
    margin-left: 12px;
    flex-shrink: 0;
  }
}
</style>
