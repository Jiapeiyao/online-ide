const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    entry: {
        app: ["react-hot-loader/patch", "./src/project/index.tsx"]
    },
    output: {
        path: path.resolve(__dirname, "..", "dist"),
        filename: "[name].js",
    },
    devServer: {
        contentBase: "./dist",
    },
    module: {
        rules: basicConfig.rules,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "react-dom": "@hot-loader/react-dom",
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: require("html-webpack-template"),
            inject: false,
            appMountId: "app",
            filename: "index.html",
        }),
    ],
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
};

module.exports = (env, argv) => {
    if (argv.hot) {
        // Cannot use 'contenthash' when hot reloading is enabled.
        config.output.filename = "[name].[hash].js";
    }

    return config;
};
