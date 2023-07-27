const webpack = require("webpack")
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin"); // 生成index.html
const miniCssExtractPlugin = require("mini-css-extract-plugin"); // css打包成单独文件
const cssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin") // css 压缩

/**@type {import('webpack').Configuration} */
module.exports = function (env = {}, argv) {
    console.log('env', env)
    console.log('argv', argv)
    return Promise.resolve({
        entry: './src/index.jsx', // 入口
        output: {
            path: path.resolve(__dirname, '../dist'),// 打包文件目录
            filename: '[chunkhash:8].js', // 打包文件名称使用8位数hash
            assetModuleFilename: 'static/[hash:8][ext]' // 打包文件名称使用8位数hash ext是后缀名
        },
        module: {
            rules: [{
                test: /\.(css|less)$/,
                exclude: /node_modules/,
                use: [{ loader: miniCssExtractPlugin.loader }, 'css-loader', 'less-loader', {
                    loader: "postcss-loader", // 当样式需要分辨浏览器 如 use-select 对于webkit内核会自动添加__webkit-use-select
                    options: {
                        postcssOptions: {
                            plugins: [require("autoprefixer")]
                        }
                    }
                }],
            }, {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                include: [path.resolve("./src")],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    },
                },
            },
            {
                test: /\.ts|tsx$/,
                exclude: /node_modules/,
                include: [path.resolve("./src")],
                use: 'ts-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: /node_modules/,
                include: [path.resolve("./static")],
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 8kb
                    }
                }
            }]
        },
        plugins: [
            new htmlWebpackPlugin({ template: './src/index.html' }),
            new webpack.ProvidePlugin({
                "React": "react",
            }), //添加这句解决  react not defined
            new miniCssExtractPlugin(), 
            new cssMinimizerWebpackPlugin(),
        ],
        resolve: {
            extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],//表示这几个的后缀名可以忽略 如 import TestChild1 from '@/components/TestChild1/index.jsx' -> import TestChild1 from '@/components/TestChild1'
            alias: {
                '@': path.join(__dirname, '../src')  //@别名 
            }
        },
        devServer: {
            port: 9527,
            open: true
        },
        devtool: 'source-map'
    })
}


/**

            类型	例子	含义
            string	'./app/entry'	入口模块的文件路径，可以是相对路径。
            array	['./app/entry1', './app/entry2']	入口模块的文件路径，可以是相对路径。
            object	{ a: './app/entry-a', b: ['./app/entry-b1', './app/entry-b2']}	配置多个入口，每个入口生成一个 Chunk
            如果是 array 类型，则搭配 output.library 配置项使用时，只有数组里的最后一个入口文件的模块会被导出。

            Chunk 名称
            Webpack 会为每个生成的 Chunk 取一个名称，Chunk 的名称和 Entry 的配置有关：

            如果 entry 是一个 string 或 array，就只会生成一个 Chunk，这时 Chunk 的名称是 main；
            如果 entry 是一个 object，就可能会出现多个 Chunk，这时 Chunk 的名称是 object 键值对里键的名称。
            配置动态 Entry
            假如项目里有多个页面需要为每个页面的入口配置一个 Entry ，但这些页面的数量可能会不断增长，则这时 Entry 的配置会受到到其他因素的影响导致不能写成静态的值。其解决方法是把 Entry 设置成一个函数去动态返回上面所说的配置，代码如下：

            // 同步函数
            entry: () => {
            return {
                a:'./pages/a',
                b:'./pages/b',
            }
            };
            // 异步函数
            entry: () => {
            return new Promise((resolve)=>{
                resolve({
                a:'./pages/a',
                b:'./pages/b',
                });
            });
            };


            id	Chunk 的唯一标识，从0开始
name	Chunk 的名称
hash	Chunk 的唯一标识的 Hash 值
chunkhash	Chunk 内容的 Hash 值
            */