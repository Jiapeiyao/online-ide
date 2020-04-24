const webpack = require("webpack");
const path = require("path");

const config = {
    entry: ["./src/service/start.ts"],
    output: {
        path: path.resolve(__dirname, ".", "dist", "service"),
        filename: "start.js",
    },
    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                use: ["awesome-typescript-loader"],
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    target: 'node',
    node: {
        fs: 'empty',
        path: 'empty'
    }
};

module.exports = config;
