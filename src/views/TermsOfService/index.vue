<template>
  <div class="terms-of-service">
    <!-- 顶部导航栏 -->
    <div class="header">
      <van-icon name="arrow-left" class="back-icon" @click="goBack" />
      <div class="title">{{ t("termsOfServiceTitle") }}</div>
    </div>

    <!-- 内容区域 - 可滚动 -->
    <div class="content-wrapper">
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
      // text-align: justify;
      word-break: break-word;
    }

    .list {
      // padding-left: 20px;
      margin-top: 12px;
      // list-style: disc;

      li {
        font-size: 14px;
        line-height: 1.8;
        margin-bottom: 10px;
        color: #040303;
        text-align: justify;
        word-break: break-word;
        padding-left: 4px;
      }
    }
  }
}
</style>
