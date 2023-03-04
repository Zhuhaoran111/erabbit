const { defineConfig } = require('@vue/cli-service')
const path =require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      //哪些文件需要自动引入到style里面，使用绝对路径
      //需要使用path.join来拼接完整的路径
      patterns: [
        path.join(__dirname,'./src/assets/styles/varables.less'),
        path.join(__dirname,'./src/assets/styles/mixins.less')
    
      ]
    }
  }
})
