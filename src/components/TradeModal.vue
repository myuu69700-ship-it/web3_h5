<template>
  <van-overlay :show="show" @click="handleOverlayClick">
    <div class="trade-modal" @click.stop>
      <div class="modal-content">
        <!-- 菜单项列表 -->
        <div class="menu-list">
          <div
            v-for="item in menuItems"
            :key="item.key"
            class="menu-item"
            @click="handleMenuClick(item)"
          >
            <div class="menu-icon">
              <component :is="item.iconComponent" />
            </div>
            <span class="menu-text">{{ item.text }}</span>
          </div>
        </div>

        <!-- 关闭按钮 -->
        <div class="close-button" @click="handleClose">
          <van-icon name="cross" size="20" />
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script setup>
import { h } from 'vue'

defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:show', 'close'])

// 菜单项数据
const menuItems = [
  {
    key: 'ai',
    text: 'AI量化策略',
    // AI/机器人图标 - 方形芯片形状
    iconComponent: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      style: { width: '24px', height: '24px' }
    }, [
      h('rect', {
        x: '4',
        y: '4',
        width: '16',
        height: '16',
        rx: '2',
        stroke: 'currentColor',
        'stroke-width': '2'
      }),
      h('circle', { cx: '8', cy: '8', r: '1.5', fill: 'currentColor' }),
      h('circle', { cx: '16', cy: '8', r: '1.5', fill: 'currentColor' }),
      h('path', {
        d: 'M8 12h8M8 16h8',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round'
      })
    ])
  },
  {
    key: 'flash',
    text: '閃兌',
    // 閃兌图标 - 方形内带闪电
    iconComponent: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      style: { width: '24px', height: '24px' }
    }, [
      h('rect', {
        x: '4',
        y: '4',
        width: '16',
        height: '16',
        rx: '2',
        stroke: 'currentColor',
        'stroke-width': '2'
      }),
      h('path', {
        d: 'M10 8l4 4-4 4',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      })
    ])
  },
  {
    key: 'spot',
    text: '現貨',
    // 現貨图标 - 三条横线
    iconComponent: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      style: { width: '24px', height: '24px' }
    }, [
      h('line', {
        x1: '6',
        y1: '8',
        x2: '18',
        y2: '8',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round'
      }),
      h('line', {
        x1: '6',
        y1: '12',
        x2: '18',
        y2: '12',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round'
      }),
      h('line', {
        x1: '6',
        y1: '16',
        x2: '18',
        y2: '16',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round'
      })
    ])
  },
  {
    key: 'contract',
    text: '合約',
    // 合約图标 - 文档带T
    iconComponent: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      style: { width: '24px', height: '24px' }
    }, [
      h('path', {
        d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      }),
      h('polyline', {
        points: '14 2 14 8 20 8',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      }),
      h('line', {
        x1: '12',
        y1: '14',
        x2: '16',
        y2: '14',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round'
      }),
      h('line', {
        x1: '10',
        y1: '18',
        x2: '16',
        y2: '18',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round'
      })
    ])
  },
  {
    key: 'options',
    text: '期權',
    // 期權图标 - 图表上升趋势
    iconComponent: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      style: { width: '24px', height: '24px' }
    }, [
      h('rect', {
        x: '4',
        y: '4',
        width: '16',
        height: '16',
        rx: '2',
        stroke: 'currentColor',
        'stroke-width': '2'
      }),
      h('polyline', {
        points: '8 16 12 12 16 14 20 8',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      })
    ])
  }
]

const handleClose = () => {
  emit('update:show', false)
  emit('close')
}

const handleOverlayClick = () => {
  handleClose()
}

const handleMenuClick = (item) => {
  // 处理菜单项点击
  console.log('点击菜单项:', item.key)
  // 可以在这里添加路由跳转或其他逻辑
  handleClose()
}
</script>

<style lang="scss" scoped>
.trade-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 20px;
}

.modal-content {
  width: 100%;
  max-width: 320px;
  background-color: #fff;
  border-radius: 16px;
  padding: 24px 20px 80px;
  position: relative;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: #f5f5f5;
  }

  .menu-icon {
    width: 24px;
    height: 24px;
    margin-right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #323233;
    flex-shrink: 0;

    :deep(svg) {
      width: 24px;
      height: 24px;
    }
  }

  .menu-text {
    font-size: 16px;
    color: #323233;
    font-weight: 400;
  }
}

.close-button {
  position: absolute;
  bottom: -28px;
  left: 50%;
  transform: translateX(-50%);
  width: 56px;
  height: 56px;
  background-color: #323233;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;

  &:active {
    transform: translateX(-50%) scale(0.95);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

:deep(.van-overlay) {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
</style>
