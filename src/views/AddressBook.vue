<template>
  <div class="address-book">
    <van-nav-bar
      title="地址管理"
      left-arrow
      @click-left="goBack"
      fixed
      placeholder
    >
      <template #right>
        <span class="add-btn" @click="handleAdd">添加</span>
      </template>
    </van-nav-bar>

    <div class="content">
      <!-- 搜索栏 -->
      <div class="search-section">
        <van-search
          v-model="searchValue"
          placeholder="搜索幣種,備註名"
          @clear="handleSearchClear"
        >
          <template #right-icon>
            <van-icon
              v-if="searchValue"
              name="clear"
              @click="handleSearchClear"
              class="clear-icon"
            />
          </template>
        </van-search>
      </div>

      <!-- 地址列表 -->
      <div class="address-list">
        <div
          v-for="item in filteredAddressList"
          :key="item.id"
          class="address-item"
        >
          <div class="coin-icon-wrapper">
            <div class="coin-icon" :class="item.iconClass">
              {{ item.icon }}
            </div>
          </div>
          <div class="address-info">
            <div class="address-name">{{ item.name }} ({{ item.currency }})</div>
            <div class="address-value">{{ maskAddress(item.address) }}</div>
          </div>
          <div class="menu-btn" @click.stop="showMenu(item)">
            <van-icon name="ellipsis" />
          </div>
        </div>

        <van-empty v-if="filteredAddressList.length === 0" description="暂无地址" />
      </div>
    </div>

    <!-- 菜单操作弹窗 -->
    <van-action-sheet
      v-model:show="showActionSheet"
      :actions="actions"
      @select="onActionSelect"
      cancel-text="取消"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchValue = ref('')
const showActionSheet = ref(false)
const selectedItem = ref(null)

// 地址列表数据
const addressList = ref([
  {
    id: 1,
    name: '32323',
    currency: 'USDT',
    address: 'TCTbANdJ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    icon: 'T',
    iconClass: 'usdt',
  },
])

// 过滤后的地址列表
const filteredAddressList = computed(() => {
  if (!searchValue.value) {
    return addressList.value
  }
  const keyword = searchValue.value.toLowerCase()
  return addressList.value.filter(
    (item) =>
      item.currency.toLowerCase().includes(keyword) ||
      item.name.toLowerCase().includes(keyword)
  )
})

// 掩码地址显示
const maskAddress = (address) => {
  if (!address || address.length < 10) return address
  const start = address.substring(0, 4)
  const end = address.substring(address.length - 4)
  return `${start} *** ${end}`
}

// 操作菜单
const actions = [
  { name: '编辑', value: 'edit' },
  { name: '删除', value: 'delete' },
]

const showMenu = (item) => {
  selectedItem.value = item
  showActionSheet.value = true
}

const onActionSelect = (action) => {
  if (action.value === 'edit') {
    // 编辑逻辑
    console.log('编辑', selectedItem.value)
  } else if (action.value === 'delete') {
    // 删除逻辑
    console.log('删除', selectedItem.value)
    const index = addressList.value.findIndex(
      (item) => item.id === selectedItem.value.id
    )
    if (index > -1) {
      addressList.value.splice(index, 1)
    }
  }
  showActionSheet.value = false
}

const handleSearchClear = () => {
  searchValue.value = ''
}

const goBack = () => {
  router.back()
}

const handleAdd = () => {
  router.push('/add-address')
}
</script>

<style lang="scss" scoped>
.address-book {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 20px;
}

.content {
  padding: 16px;
}

.search-section {
  margin-bottom: 16px;

  :deep(.van-search) {
    padding: 0;
    background-color: transparent;

    .van-search__content {
      background-color: #f7f8fa;
      border-radius: 8px;
    }
  }

  .clear-icon {
    font-size: 16px;
    color: #969799;
  }
}

.address-list {
  .address-item {
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 12px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    .coin-icon-wrapper {
      margin-right: 12px;
      flex-shrink: 0;

      .coin-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 18px;
        color: #fff;

        &.usdt {
          background-color: #26a17b;
        }
      }
    }

    .address-info {
      flex: 1;
      min-width: 0;

      .address-name {
        font-size: 16px;
        color: #323233;
        margin-bottom: 4px;
        font-weight: 500;
      }

      .address-value {
        font-size: 14px;
        color: #969799;
      }
    }

    .menu-btn {
      margin-left: 12px;
      padding: 4px;
      color: #646566;
      font-size: 20px;
      flex-shrink: 0;
    }
  }
}

:deep(.van-nav-bar) {
  .add-btn {
    color: #323233;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>

