const webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    es3ifyPlugin = require('es3ify-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, ".");
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    entry: {
        polyfill : 'babel-polyfill',
        main : './src/index.js'
    },
    output: {
        path: BUILD_PATH,
        filename: 'js/[name].[hash:5].js'
    },
    //如果不需要react这段可以去掉
    resolve: {
        root : ['./scss'],
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
            // {
            //     test: /\.html$/,
            //     loader: 'html-loader'
            // },
       /*     {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                useRelativePath:true,
                query:{
                    name:'img/[name]-[hash:5].[ext]'  //这里img是存放打包后图片文件夹，结合publicPath来看就是/webBlog/build/img文件夹中，后边接的是打包后图片的命名方式。
                }
            },*/
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:8].[ext]',
                    publicPath:"/anu-antd-axios-echarts-ie8/dist/"//处理css引用图片相对路径问题
                }
            },
            // {test: /\.json$/,loader: "json"},
            {test: /\.css$/,loader: "style!css"},
            {test:/\.less$/,loader: 'style-loader!css-loader!less-loader'},
            {test: /\.scss$/,loader: ExtractTextPlugin.extract("style", "css?modules=true&sourceMap=true!postcss!sass", {publicPath: "./"})}
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
        new HtmlWebpackPlugin({template : "src/index.html",favicon:'./favicon.ico'}),
        new webpack.optimize.UglifyJsPlugin({mangle : false, output : {keep_quoted_props:true}, compress : {properties:false, drop_console: true},comments:false}),
        new CleanWebpackPlugin("dist", {root:ROOT_PATH})
    ]
}