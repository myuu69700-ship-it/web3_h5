<template>
  <div class="tutorial-list">
    <!-- 顶部导航栏 -->
    <div class="header">
      <van-icon name="arrow-left" class="back-icon" @click="goBack" />
      <div class="title">新手教程</div>
    </div>

    <!-- 教程列表 -->
    <div class="content">
      <div
        v-for="(tutorial, index) in tutorials"
        :key="tutorial.id"
        class="tutorial-item"
        :class="{ 'even': index % 2 === 1 }"
        @click="goToDetail(tutorial.id)"
      >
        <div class="tutorial-title">{{ tutorial.title }}</div>
        <van-icon name="arrow" class="arrow-icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 教程列表数据
const tutorials = ref([
  {
    id: 1,
    title: "比特幣為何值得投資?還有增值空間嗎?",
  },
  {
    id: 2,
    title: "為什麼要投資加密資產?",
  },
  {
    id: 3,
    title: "什麼是穩定幣,什麼是主流幣,什麼是山寨幣",
  },
  {
    id: 4,
    title: "機構投資了哪些加密資產?對新手投資有哪...",
  },
  {
    id: 5,
    title: "加密資產模擬交易的必要性",
  },
  {
    id: 6,
    title: "一文讀懂比特幣與區塊鏈的關係",
  },
  {
    id: 7,
    title: "什麼是比特幣",
  },
  {
    id: 8,
    title: "新手如何配置加密資產?看這篇就夠了",
  },
  {
    id: 9,
    title: "比特幣十年價格走勢",
  },
  {
    id: 10,
    title: "DeFi概念代幣大火,一文速覽熱門項目",
  },
]);

const goBack = () => {
  router.back();
};

const goToDetail = (id) => {
  router.push(`/tutorial-detail/${id}`);
};
</script>

<style lang="scss" scoped>
.tutorial-list {
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
  .tutorial-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.2s;

    &.even {
      background-color: #f5f5f5;
    }

    &:active {
      background-color: #ebedf0;
    }

    .tutorial-title {
      flex: 1;
      font-size: 16px;
      color: #040303;
      line-height: 1.5;
    }

    .arrow-icon {
      font-size: 16px;
      color: #969799;
      margin-left: 12px;
      flex-shrink: 0;
    }
  }
}
</style>

