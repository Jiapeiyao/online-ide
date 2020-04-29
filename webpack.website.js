const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const websitePath = path.resolve(__dirname, ".", "dist", "website");

const config = {
    entry: ["react-hot-loader/patch", "./src/website/index.tsx"],
    output: {
        path: websitePath,
        filename: "[name].[contenthash].js",
    },
    devServer: {
        contentBase: websitePath,
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: "./postcss.config.js",
                            },
                        },
                    },
                ],
                exclude: /\.module\.css$/,
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: "./postcss.config.js",
                            },
                        },
                    },
                ],
                include: /\.module\.css$/,
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif|ttf)$/,
                use: "url-loader?limit=100000",
            },
        ],
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
        new MonacoWebpackPlugin({
            // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
            languages: ['typescript', 'javascript', 'less']
        })
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
