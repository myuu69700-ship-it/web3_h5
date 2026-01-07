<template>
  <div class="tutorial-detail">
    <!-- 顶部导航栏 -->
    <div class="header">
      <van-icon name="arrow-left" class="back-icon" @click="goBack" />
      <div class="title">新手教程</div>
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <h1 class="main-title">{{ currentTutorial?.title }}</h1>

      <div class="article-content">
        <p class="paragraph">
          這是一篇關於{{ currentTutorial?.title }}的詳細教程內容。在這裡，我們將深入探討相關的主題和概念。
        </p>
        <p class="paragraph">
          加密資產投資是一個複雜的領域，需要投資者具備一定的知識和經驗。本教程將幫助您了解相關的基礎知識和投資策略。
        </p>
        <p class="paragraph">
          無論您是初學者還是有經驗的投資者，都可以從本教程中獲取有價值的信息。我們將從基礎概念開始，逐步深入探討更複雜的主題。
        </p>
        <p class="paragraph">
          請仔細閱讀本教程的內容，並根據您的實際情況做出明智的投資決策。記住，投資有風險，入市需謹慎。
        </p>
        <p class="paragraph">
          如果您對本教程有任何疑問，歡迎聯繫我們的客服團隊，我們將竭誠為您服務。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// 教程列表数据
const tutorials = ref([
  {
    id: 1,
    title: "比特幣為何值得投資?還有增值空間嗎?",
    content: "比特幣作為第一個加密貨幣，具有稀缺性、去中心化等特點，長期來看仍有增值空間。",
  },
  {
    id: 2,
    title: "為什麼要投資加密資產?",
    content: "加密資產具有全球化、24小時交易、高流動性等優勢，是現代投資組合的重要組成部分。",
  },
  {
    id: 3,
    title: "什麼是穩定幣,什麼是主流幣,什麼是山寨幣",
    content: "穩定幣是價格相對穩定的加密貨幣；主流幣是指市值較大的加密貨幣；山寨幣是指除比特幣外的其他加密貨幣。",
  },
  {
    id: 4,
    title: "機構投資了哪些加密資產?對新手投資有哪...",
    content: "機構投資者主要投資比特幣、以太坊等主流加密資產，新手可以參考機構的投資策略。",
  },
  {
    id: 5,
    title: "加密資產模擬交易的必要性",
    content: "模擬交易可以幫助新手熟悉交易流程，降低實際投資風險，是學習投資的重要步驟。",
  },
  {
    id: 6,
    title: "一文讀懂比特幣與區塊鏈的關係",
    content: "比特幣是區塊鏈技術的第一個應用，區塊鏈是比特幣的底層技術，兩者密不可分。",
  },
  {
    id: 7,
    title: "什麼是比特幣",
    content: "比特幣是一種去中心化的數字貨幣，由中本聰在2009年創建，是第一個成功的加密貨幣。",
  },
  {
    id: 8,
    title: "新手如何配置加密資產?看這篇就夠了",
    content: "新手應該從主流幣開始，分散投資，控制倉位，學習基礎知識，逐步建立自己的投資策略。",
  },
  {
    id: 9,
    title: "比特幣十年價格走勢",
    content: "比特幣從2009年創建至今，價格經歷了多次大幅波動，但總體趨勢向上，展現了強勁的增長潛力。",
  },
  {
    id: 10,
    title: "DeFi概念代幣大火,一文速覽熱門項目",
    content: "DeFi（去中心化金融）是當前加密市場的熱點，包括借貸、交易、流動性挖礦等多個領域。",
  },
]);

// 當前教程
const currentTutorial = computed(() => {
  const id = parseInt(route.params.id);
  return tutorials.value.find((t) => t.id === id);
});

const goBack = () => {
  router.back();
};
</script>

<style lang="scss" scoped>
.tutorial-detail {
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

  .article-content {
    .paragraph {
      font-size: 14px;
      line-height: 1.8;
      margin-bottom: 16px;
      color: #040303;
      text-align: justify;
    }
  }
}
</style>


