<template>
  <div class="terms-of-service">
    <!-- 顶部导航栏 -->
    <div class="header">
      <van-icon name="arrow-left" class="back-icon" @click="goBack" />
      <div class="title">{{ t("termsOfServiceTitle") }}</div>
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <h1 class="main-title">{{ t("termsTitle") }}</h1>

      <!-- 1. 总则 -->
      <section class="section">
        <h2 class="section-title">1. {{ t("section1Title") }}</h2>
        <p class="paragraph">{{ t("section1Para1") }}</p>
        <p class="paragraph">{{ t("section1Para2") }}</p>
        <p class="paragraph">{{ t("section1Para3") }}</p>
        <p class="paragraph">{{ t("section1Para4") }}</p>
        <p class="paragraph">{{ t("section1Para5") }}</p>
        <p class="paragraph">{{ t("section1Para6") }}</p>
      </section>

      <!-- 2. 交易账户-注册 -->
      <section class="section">
        <h2 class="section-title">2. {{ t("section2Title") }}</h2>
        <p class="paragraph">{{ t("section2Para1") }}</p>
        <p class="paragraph">{{ t("section2Para2") }}</p>
        <p class="paragraph">{{ t("section2Para3") }}</p>
        <p class="paragraph">{{ t("section2Para4") }}</p>
        <p class="paragraph">{{ t("section2Para5") }}</p>
        <p class="paragraph">{{ t("section2Para6") }}</p>
        <p class="paragraph">{{ t("section2Para7") }}</p>
        <p class="paragraph">{{ t("section2Para8") }}</p>
        <p class="paragraph">{{ t("section2Para9") }}</p>
      </section>

      <!-- 3. 授权 -->
      <section class="section">
        <h2 class="section-title">3. {{ t("section3Title") }}</h2>
        <p class="paragraph">{{ t("section3Para1") }}</p>
      </section>

      <!-- 4. 保证 -->
      <section class="section">
        <h2 class="section-title">4. {{ t("section4Title") }}</h2>
        <p class="paragraph">{{ t("section4Para1") }}</p>
        <ul class="list">
          <li>{{ t("section4Item1") }}</li>
          <li>{{ t("section4Item2") }}</li>
          <li>{{ t("section4Item3") }}</li>
          <li>{{ t("section4Item4") }}</li>
          <li>{{ t("section4Item5") }}</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "@/i18n";

const router = useRouter();
const { t } = useI18n();

const goBack = () => {
  router.back();
};
</script>

<style lang="scss" scoped>
.terms-of-service {
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
    margin-bottom: 24px;
    color: #040303;
  }

  .section {
    margin-bottom: 32px;

    .section-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #040303;
    }

    .paragraph {
      font-size: 14px;
      line-height: 1.8;
      margin-bottom: 12px;
      color: #040303;
      text-align: justify;
    }

    .list {
      padding-left: 20px;
      margin-top: 12px;

      li {
        font-size: 14px;
        line-height: 1.8;
        margin-bottom: 8px;
        color: #040303;
        text-align: justify;
      }
    }
  }
}
</style>
