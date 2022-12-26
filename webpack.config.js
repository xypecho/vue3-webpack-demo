
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // Webpack的打包模式，当前为生产的模式
    mode: 'production',
    // 执行打包、构建、编译时候从哪个文件开始编译
    entry: {
        'index': path.join(__dirname, 'src/index.js'),
    },
    // 编译结果要放在哪个目录下的哪个文件里
    output: {
        path: path.join(__dirname, 'dist'),
        // [name]是源文件的名称
        filename: '[name].js',
    },
    // Webpack打包构建的核心
    module: {
        rules: [
            // vue-loader解决项目里vue3源码打包编译处理
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            // css-loader解决项目里css代码的打包编译处理
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
        ]
    },
    plugins: [
        // VueLoaderPlugin 编译vue3代码时候做相关的编译处理
        new VueLoaderPlugin(),
        // MiniCssExtractPlugin 将vue3源码里的css代码分离出单独的css文件
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            title: 'Hello Vue',
            filename: 'index.html',
            template: './index.html',
            minify: false,
            inject: false,
            templateParameters:
            {
                publicPath: path.join(__dirname),
                js: ['./node_modules/vue/dist/vue.runtime.global.js', './index.js'],
                css: ['./index.css'],
            },
        })
    ],
    // 这个是声明在Webpack打包编译过程中，有哪些源码依赖的npm模块需要“排除打包”处理，也就是不做打包整合处理。我们这里就是将vue3的运行源码进行“排除打包”处理，让代码最终代码依赖的vue3运行时，从 window.Vue 全局变量获取。这么做的好处就是通过减少打包的内容来缩短打包时间。
    externals: {
        'vue': 'window.Vue'
    },
    devServer: {
        static: { directory: path.join(__dirname), },
        compress: true,
        port: 6001,
        hot: false,
        compress: false,
    },
    devtool: 'inline-cheap-module-source-map',
}