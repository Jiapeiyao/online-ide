import webpack from 'webpack';
import path from 'path';

const websitePath = path.resolve(__dirname, 'website');
const projectPath = path.resolve(__dirname, 'project');

const babelrc = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-transform-runtime'
    ]
}

const postcssLoaderOptions = {
    plugins: [require('autoprefixer')],
    javascriptEnabled: true,
};

const config: webpack.Configuration = {
    mode: 'production',
    entry: path.resolve(projectPath, 'entry.tsx'),
    output: {
        path: websitePath,
        filename: 'preview.[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                loader: 'babel-loader',
                options: babelrc,
                include: projectPath,
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: postcssLoaderOptions,
                    },
                ],
                exclude: /\.module\.css$/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: postcssLoaderOptions,
                    },
                ],
                include: /\.module\.css$/,
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif|ttf)$/,
                use: 'url-loader',
            },
        ],
    },
    externals: [
        {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'antd': 'antd',
        },
        /^(antd|react|react\-dom)(\/[a-z0-9]*)*$/i,
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
};

export default config;
