// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
// 动态计算环境变量并以 `process.env.` 注入网站
// trick from: https://cli.vuejs.org/zh/guide/mode-and-env.html#在客户端侧代码中使用环境变量
process.env.VUE_APP_VERSION = require('./package.json').version;

process.env.VUE_APP_COMMIT_HASH = process.env.COMMIT_REF;
// console.log(process.env.NODE_ENV);
const { NODE_ENV } = process.env;
module.exports = {
  configureWebpack: {
    plugins: [
      // 为生产环境修改配置...
      // new BundleAnalyzerPlugin(),
      // new webpack.IgnorePlugin(/\/iconv-loader$/),
      new webpack.ContextReplacementPlugin( // 减少moment体积
        /moment[/\\]locale$/,
        /zh-cn/,
      ),
    ],
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [],
      },
    },
  },
  pwa: {
    msTileColor: '#4DBA87',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico',
    },
  },
  productionSourceMap: NODE_ENV === 'development', // 去掉map文件
  chainWebpack: (config) => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
  },
  // 代理
  // devServer: {
  //   proxy: {
  //     '/': {
  //       target: 'https://apitest.smartsignature.io',
  //     },
  //   },
  // },
};
