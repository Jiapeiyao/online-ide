const rules = [
    {
        test: /\.ts(x)?$/,
        use: ["awesome-typescript-loader"],
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
        test: /\.(png|svg|jpg|gif)$/,
        use: "url-loader",
    },
];

module.exports = {
    rules
};