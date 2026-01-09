export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 75, // 设计稿宽度 750px，1rem = 75px
      propList: ['*'], // 所有属性都转换
      selectorBlackList: ['.ignore', '.hairlines'], // 忽略的类名
      replace: true,
      mediaQuery: false,
      minPixelValue: 1, // 小于1px的值不转换
    },
  },
}

