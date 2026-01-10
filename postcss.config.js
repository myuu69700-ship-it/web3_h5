export default {
  plugins: {
    // 注释掉 postcss-pxtorem，因为项目主要使用 vw 单位适配
    // 如果启用会导致 px 和 vw 混用，适配不一致
    // 'postcss-pxtorem': {
    //   rootValue: 75, // 设计稿宽度 750px，1rem = 75px
    //   propList: ['*'], // 所有属性都转换
    //   selectorBlackList: ['.ignore', '.hairlines'], // 忽略的类名
    //   replace: true,
    //   mediaQuery: false,
    //   minPixelValue: 1, // 小于1px的值不转换
    // },
  },
}

