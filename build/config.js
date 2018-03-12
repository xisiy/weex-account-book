const path = require('path');
let rootDir = path.join(__dirname, '../');

module.exports = {
    root:rootDir,
    source:'src',
    assetsPath:'src/assets',
    web:{
        entryPath:'src/main.js',
        htmlTemp:'web/index.html',
        outputPath:'dist',
        outputFilename:'[name].web.js'
    },
    native:{
        outputPath:'platforms/WXSample-master/app/src/main/assets',
        outputFilename:'[name].js',
        ignore: ['assets','components','router','mixin','App.vue','native.js'],//不作为入口的路径，如指定文件需指定扩展名如index.vue
        mixin: {
            enable: true,
            path:path.join(rootDir,'src/native.js')
        }
    }
}