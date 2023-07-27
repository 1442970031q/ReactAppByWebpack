const { merge } = require("webpack-merge");
const getBaseConfig = require("./base.config");

const config = {
    mode: "production",
    cache: {
        type: "filesystem",
        buildDependencies: {
            config: [__filename], //使用文件缓存
        },
    },
    optimization: {
        minimize: true,
        moduleIds: "deterministic",
    },
};

module.exports = async () => {
    const baseConfig = await getBaseConfig()
    const prodConfig = merge(baseConfig, config)
    return prodConfig
};
