const path = require("path");
const webpack = require('webpack');
const basicConfig = require('./webpack.basic');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
	{
		name: "dll",
		// mode: "development || "production",
		entry: ["./src/project/index.tsx"],
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "dll.js",
			library: "dll"
        },
        module: {
            rules: basicConfig.rules,
        },
		plugins: [
			new webpack.DllPlugin({
				name: "dll",
				path: path.resolve(__dirname, "dist/manifest.json")
            }),
            new HtmlWebpackPlugin({
                template: path.resolve('./src/project/index.html'),
                inject: true,
                appMountId: "app",
                filename: "index.html",
            }),
        ],
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            alias: {
                "react-dom": "@hot-loader/react-dom",
            },
        },
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
	},

	{
		name: "app",
		// mode: "development || "production",
		dependencies: ["dll"],
		entry: {
			app: "./src/project/App.tsx",
		},
		output: {
			path: path.join(__dirname, "dist"),
			filename: "[name].js"
		},
		plugins: [
			new webpack.DllReferencePlugin({
				manifest: path.resolve(__dirname, "dist/manifest.json")
			})
        ],
        module: {
            rules: basicConfig.rules,
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            alias: {
                "react-dom": "@hot-loader/react-dom",
            },
        },
	}
];