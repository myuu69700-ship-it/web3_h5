# Vue3 H5 项目

基于 Vue3 + Vite + Pinia + Vant 构建的移动端 H5 应用。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Pinia** - Vue 的状态管理库
- **Vant** - 轻量、可靠的移动端 Vue 组件库
- **Vue Router** - Vue.js 官方路由管理器

## 项目结构

```
.
├── src/
│   ├── views/          # 页面组件
│   ├── router/         # 路由配置
│   ├── store/          # Pinia 状态管理
│   ├── styles/         # 全局样式
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── index.html          # HTML 模板
├── vite.config.js      # Vite 配置
└── package.json        # 项目配置
```

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发

```bash
npm run dev
```

项目将在 `http://localhost:3000` 启动

### 构建

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 预览

```bash
npm run preview
```

## 功能特性

- ✅ Vue3 Composition API
- ✅ Vite 快速构建
- ✅ Pinia 状态管理
- ✅ Vue Router 路由配置
- ✅ Vant UI 组件库
- ✅ 移动端适配
- ✅ 响应式设计

## 开发说明

### 添加新页面

1. 在 `src/views/` 目录下创建新的 Vue 组件
2. 在 `src/router/index.js` 中添加路由配置

### 使用 Pinia Store

```javascript
import { useUserStore } from '@/store'

const userStore = useUserStore()
userStore.setToken('your-token')
```

### 使用 Vant 组件

所有 Vant 组件已全局注册，可以直接使用：

```vue
<template>
  <van-button type="primary">按钮</van-button>
</template>
```

## 浏览器支持

现代浏览器和移动端浏览器

## License

MIT

