const webpack = require('webpack'),
    path = require('path'),
    glob = require('glob'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin"),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    es3ifyPlugin = require('es3ify-webpack-plugin'),
    PurifyCSSPlugin = require("purifycss-webpack");

const ROOT_PATH = path.resolve(__dirname, ".");
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    devtool: 'source-map',
    // devtool: 'cheap-module-eval-source-map',
    entry: {
        polyfill : 'babel-polyfill',
        main : './src/index.js',
        vendor: [
            'react',
            'react-dom'
        ]
    },
    output: {
        path: BUILD_PATH,
        filename: 'js/[name].[hash:5].js',
        // publicPath:'./'
    },
    //如果不需要react这段可以去掉
    resolve: {
        modules:[path.resolve(__dirname, "scss"), "node_modules"],
        extensions: ['.js', '.jsx'],
        alias: {
            "react": "anujs/dist/ReactIE.js",
            "react-dom": "anujs/dist/ReactIE.js",
            'prop-types':  'anujs/lib/ReactPropTypes.js',
            'create-react-class': 'anujs/lib/createClass.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)(\?.*$|$)/,
                // use: {loader: "es3ify-loader",options: {
                //         cacheDirectory: true
                //     },enforce: 'post'}
                // ,{loader:'export-from-ie8/loader',enforce: 'post'}, {
                //     loader: "babel-loader",
                    // options: {
                    //     presets: ["env"]
                    // }
                // }
                // use: 'babel-loader',
                // use: 'babel-loader',
            // {
            //     loader: 'es3ify-loader',
            // },
            // {
            //     loader: 'export-from-ie8/loader',
            //     enforce: 'pre'
            // }
                    // {
                    // loader:'babel-loader',
                    // options: {
                    //     presets: ['es2015-loose', 'react'],
                    //     plugins: [
                    //         'transform-class-properties',
                    //         [
                    //             'transform-es2015-classes'
                    //         ]
                    //     ]
                    // }
                // },
                // exclude:/node_modules/
                loader: 'babel-loader', include:path.resolve(__dirname, 'src')
            },
            //     {test: /\.(js|jsx)(\?.*$|$)/,use: "es3ify-loader", enforce: "post"},
            {test: /\.(js|jsx)$/,use: 'export-from-ie8/loader',enforce: "post",exclude:/node_modules/},
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options:{
                        limit:500000,
                        name: 'img/[name].[hash:8].[ext]',
                    }
                }]
                // options: {
                //     limit: 10000,
                //     name: 'img/[name].[hash:8].[ext]',
                //     publicPath:"/anu-antd-axios-echarts-ie8/build/"//处理css引用图片相对路径问题
                // }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader'},
                        { loader: 'postcss-loader'}
                        // { loader: 'css-loader', options: { importLoaders: 1 } },
                        // 'postcss-loader'
                    ]
                })},
            {
                test:/\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    fallback: "style-loader"
                })},
            // {test: /\.scss$/,loader: ExtractTextPlugin.extract("style-loader", "css?modules=true&sourceMap=true!postcss-loader!sass", {publicPath: "./"})}
            {
                test: /\.scss$/,
                // use: ExtractTextPlugin.extract({
                //     fallback:"style-loader",
                //     use: ['css-loader','sass-loader'],
                //     publicPath: path.join(__dirname, "src/scss")
                // })
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",options: {
                            modules: true
                        }
                    },{
                        loader: "sass-loader",
                        options: {
                            modules: true
                        }
                    }
                    ],
                    fallback: "style-loader"
                }),
            }
        ],
        // postLoaders: [
        //     {test: /\.(js|jsx)(\?.*$|$)/,loader: "es3ify-loader"},
        //     {test: /\.(js|jsx)$/,loader: 'export-from-ie8/loader'}
        // ]
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: JSON.stringify('production')
        //     }
        // }),
        new es3ifyPlugin(),
        new CleanWebpackPlugin("build", {root:ROOT_PATH}),
        new HtmlWebpackPlugin({template : "src/index.html", favicon: './favicon.ico'}),
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     mangle: {
        //         screw_ie8: false,
        //         except: ['$']
        //     },
        //     mangleProperties: {
        //         screw_ie8: false
        //     },
        //     compress:{
        //         screw_ie8: false,
        //         warnings: false
        //     },
        //     output: {
        //         screw_ie8: false
        //     },
        //     support_ie8: true
        // }),
        new ExtractTextPlugin("./css/[name].[hash:5].css")
        // new PurifyCSSPlugin({
        //     paths: glob.sync(path.join(__dirname, 'src/*.html')),
        // }),
        // new webpack.HotModuleReplacementPlugin(),

    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        historyApiFallback: true,
        progress: true,
        // hot: true,
        // host : "localhost",
        // host : "192.168.199.247",
        host : "192.168.102.184",
        port:8088,
        // open:true
    },
}