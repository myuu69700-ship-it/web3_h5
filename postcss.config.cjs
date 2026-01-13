module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue({ file }) {
        // Vant 组件库基于 375 设计稿，所以 rootValue 为 37.5
        // 项目代码基于 750 设计稿，所以 rootValue 为 75
        // 这样设计稿上 750px = 10rem
        return file.indexOf('vant') !== -1 ? 37.5 : 75;
      },
      propList: ['*'], // 转换所有 CSS 属性
      selectorBlackList: ['.ignore', '.hairlines'], // 忽略某些类名，不进行转换
      replace: true, // 替换而不是添加
      mediaQuery: false, // 不转换媒体查询中的 px
      minPixelValue: 1, // 小于 1px 的值不转换
    },
  },
};