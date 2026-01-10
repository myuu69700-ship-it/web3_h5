import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// Vant 样式已通过 unplugin-vue-components 自动导入（按需加载）

// 全局样式
import './styles/index.scss'

// 移动端适配：项目使用 vw 单位适配，不需要设置 rem
// 如果使用 rem 适配，请取消下面的注释并启用 postcss-pxtorem
// function setRemUnit() {
//   const designWidth = 750 // 设计稿宽度
//   const baseSize = 75 // 基准值：1rem = 75px (750 / 10)
//   const scale = document.documentElement.clientWidth / designWidth
//   document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
// }

// 初始化
// setRemUnit()
// 监听窗口变化
// window.addEventListener('resize', setRemUnit)
// 监听屏幕旋转
// window.addEventListener('orientationchange', setRemUnit)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')

