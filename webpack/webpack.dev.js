const webpackMerge = require("webpack-merge")
const getBaseConfig = require("./base.config")
const terserWebpackPlugin = require("terser-webpack-plugin") //prod 环境会自动压缩
const config = {
    mode: "development",
    cache: {
        type: "memory", // 使用内存缓存
    },
    optimization: {
        // minimize: true,
        // moduleIds: [new terserWebpackPlugin()], // 开发环境自定义压缩
    },
};

module.exports = async () => {
    const baseConfig = await getBaseConfig()
    const devConfig = webpackMerge.merge(baseConfig, config)
    return devConfig
}