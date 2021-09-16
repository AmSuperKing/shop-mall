const TransformPages = require('uni-read-pages')
const { webpack } = new TransformPages()

module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      scss: {
        // @/ 是 src/ 的别名
        // 注意：在 sass-loader v7 中，这个选项名是 "data"
        prependData: ` 
        @import "@/assets/scss/custom_theme.scss";
        @import "@nutui/nutui/dist/styles/index.scss";
        @import "@/uni.scss";
        `,
      }
    },
  },
  transpileDependencies: ['@dcloudio/uni-ui'],
  devServer: {
    disableHostCheck: true,
    port: 8090,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        ROUTES: webpack.DefinePlugin.runtimeValue(() => {
          const tfPages = new TransformPages({
            includes: ['path', 'name', 'aliasPath','animation']
          });
          return JSON.stringify(tfPages.routes)
        }, true )
      })
    ]
  }
}