import webpack from 'webpack';
import path from 'path';

// tslint:disable-next-line: no-var-requires
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

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

// const postcssLoader = {
//     loader: 'postcss-loader',
//     options: {
//         plugins: [require('autoprefixer')],
//         javascriptEnabled: true,
//     },
// };

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
                use:[
                    // {
                    //     loader: 'thread-loader',
                    //     options: jsWorkerPool
                    // },
                    {
                        loader: 'babel-loader',
                        options: babelrc,
                    }
                ],
                include: projectPath,
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
                    }
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
                    }
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
        extensions: ['.tsx', '.ts', '.js', '.css']
    },
};

export default smp.wrap(config);
