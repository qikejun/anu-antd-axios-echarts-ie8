const webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'),
    es3ifyPlugin = require('es3ify-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, ".");
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    entry: {
        polyfill : 'babel-polyfill',
        main : './src/index.js',
        vendors: ['axios','echarts', 'moment','pubsub-js']
    },
    output: {
        path: BUILD_PATH,
        filename: 'js/[name].[hash:8].js'
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
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 50000,
                    name: 'img/[name].[hash:8].[ext]',
                    publicPath:"/"//处理css引用图片相对路径问题
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
        new webpack.DefinePlugin({'process.env': {
                //注意一个单引号一个双引号…… 这里是要将 "production" 替换到文件里面
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendors'],
            filename: 'vendors.[hash:8].js',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'polyfill',
        }),
        new ExtractTextPlugin("./css/[name].[hash:8].css"),
        //css压缩
        new optimizeCssAssetsWebpackPlugin({
            cssProcessor: require('cssnano'),   // 加载 cssnano 优化 css
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true // 删除所有注释
                }
            }
        }),
        new HtmlWebpackPlugin({template : "src/index.html",favicon:'./favicon.ico'}),
        //js压缩
        new webpack.optimize.UglifyJsPlugin({mangle : false, output : {keep_quoted_props:true}, compress : {properties:false, drop_console: true},comments:false}),
        new CleanWebpackPlugin("dist", {root:ROOT_PATH})
    ]
}