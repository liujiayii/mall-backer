let externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  'ant-design-vue': 'antd',
  '@antv/g2': 'G2',
  'vue-i18n': 'VueI18n',
  'nprogress': 'NProgress',
  'screenfull': 'screenfull'
}
const cdn = {
  css: [],
  js: [
    '//cdn.jsdelivr.net/npm/vue@2/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/ant-design-vue@1/dist/antd.min.js',
    '//cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js',
    '//cdn.jsdelivr.net/npm/@antv/g2@3/dist/g2.min.js',
    '//cdn.jsdelivr.net/npm/vue-i18n@8/dist/vue-i18n.min.js',
    '//cdn.jsdelivr.net/npm/screenfull@4/dist/screenfull.min.js'
  ]
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: './docs',
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#4b94ff',                         // 全局主色
          'link-color': '#4b94ff',                           // 链接色
          'success-color': '#52c41a',                         // 成功色
          'warning-color': '#faad14',                         // 警告色
          'error-color': '#f5222d',                           // 错误色
          'font-size-base': '14px',                            // 主字号
          'heading-color': 'rgba(0, 0, 0, .85)',               // 标题色
          'text-color': 'rgba(0, 0, 0, .65)',                  // 主文本色
          'text-color-secondary': 'rgba(0, 0, 0, .45)',       // 次文本色
          'disabled-color': 'rgba(0, 0, 0, .25)',             // 失效色
          'border-radius-base': '2px',                         // 组件/浮层圆角
          'border-color-base': '#d9d9d9',                      // 边框色
          'box-shadow-base': ' 0 2px 8px rgba(0, 0, 0, .15)',   // 浮层阴影
        },
        javascriptEnabled: true
      }
    }
  },
  lintOnSave: false,
  devServer: {
    port: 8081,
    // proxy: {
    //   '/': {
    //     target: 'http://192.168.1.110:8080',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/': ''
    //     }
    //   }
    // }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.externals(externals)//忽略打包
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn;
          return args
        })
    }
  }
}
