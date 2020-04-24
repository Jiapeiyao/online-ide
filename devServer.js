const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config');

const server = new WebpackDevServer(webpack(config({}, { hot: true })));
server.listen(8080);