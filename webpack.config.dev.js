const webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    es3ifyPlugin = require('es3ify-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, ".");
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    entry: {
        // iefile: './src/assets/hack-ie8.js',
        polyfill : 'babel-polyfill',
        main : './src/index.js'
    },
    output: {
        path: BUILD_PATH,
        filename: 'js/[name].[hash:5].js'
    },
    //如果不需要react这段可以去掉
    resolve: {
        root : ['./src/scss'],
        extensions: ['', '.js', '.jsx'],
        alias: {
            "react": "anujs/dist/ReactIE.js",
            "react-dom": "anujs/dist/ReactIE.js",
            'prop-types': 'anujs/lib/ReactPropTypes',
            'devtools' : "anujs/lib/devtools",
            'create-react-class': 'anujs/lib/createClass'
        }
    },
    module: {
        loaders: [
            {test: /\.(js|jsx)(\?.*$|$)/,exclude: /node_modules/,loader: 'babel-loader'},
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:8].[ext]',
                    publicPath:"/anu-antd-axios-echarts-ie8/build/"//处理css引用图片相对路径问题
                }
            },
            {test: /\.css$/,loader: "style!css"},
            {test:/\.less$/,loader: 'style-loader!css-loader!less-loader'},
            {test: /\.scss$/,loader: ExtractTextPlugin.extract("style", "css?modules=true&sourceMap=true!postcss!sass")}
        ],
        postLoaders: [
            {test: /\.(js|jsx)(\?.*$|$)/,loader: "es3ify-loader"},
            {test: /\.(js|jsx)$/,loader: 'export-from-ie8/loader'}
        ]
    },
    postcss: function () {
        return [autoprefixer];
    },
    plugins: [
        new es3ifyPlugin(),
        new ExtractTextPlugin("./css/[name].[hash:5].css"),
        new HtmlWebpackPlugin({
            title:'Anu-Antd-Axios-Echarts-Ie8',
            template : "src/index.html",
        }),
        new CleanWebpackPlugin("build", {root:ROOT_PATH})
    ],
    devServer: {
        disableHostCheck: true,
        historyApiFallback: true,
        progress: true,
        outputPath : BUILD_PATH,
        // host : "localhost",
        host : "192.168.102.184",
        port:8088,
    },
    devtool: 'source-map'
}