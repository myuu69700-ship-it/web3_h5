import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import 'amfe-flexible'

// Vant 样式已通过 unplugin-vue-components 自动导入（按需加载）

// 全局样式
import './styles/index.scss'

// 修复移动端浏览器（尤其 iOS Safari/各类内置浏览器）工具栏伸缩导致的 100vh 抖动：
// 将真实可视高度写入 CSS 变量 --app-height，供 #app 使用。
function syncAppHeight() {
  const root = document.documentElement
  const height = window.visualViewport?.height || window.innerHeight
  root.style.setProperty('--app-height', `${Math.round(height)}px`)
}

syncAppHeight()
window.addEventListener('resize', syncAppHeight)
window.addEventListener('orientationchange', syncAppHeight)
// visualViewport 在工具栏展开/收起、软键盘弹出时更准确
window.visualViewport?.addEventListener('resize', syncAppHeight)
window.visualViewport?.addEventListener('scroll', syncAppHeight)

// 移动端适配：使用 rem 适配（配合 postcss-pxtorem）
// amfe-flexible 会自动设置根字体大小，基于 750 设计稿
// 如果 amfe-flexible 不满足需求，可以使用下面的自定义函数
// function setRemUnit() {
//   const designWidth = 750 // 设计稿宽度
//   const baseSize = 75 // 基准值：1rem = 75px (750 / 10)
//   const scale = document.documentElement.clientWidth / designWidth
//   document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
// }

// 初始化（amfe-flexible 已自动处理，如需自定义可取消注释）
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

