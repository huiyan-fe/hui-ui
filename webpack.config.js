/**
 * @file webpack config
 */
const env = process.env.NODE_ENV || 'production';
const wk = require('webpack');

console.log(env);

module.exports = {
    entry: {
        'list/list': './src/list/list.jsx',
        'list/list-table': './src/list/list-table.jsx',
        'chart/chart': './src/chart/chart.jsx',
        'option/option': './src/option/option.jsx',
        vendor: ['react', 'react-dom']
    },
    output: {
        filename: './dist/[name].js',
        publicPath: 'dist/demo'
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            loader: 'babel-loader'
        }, {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.less$/,
            loaders: ['style-loader', 'css-loader', 'less-loader']
        }]
    },
    watch: true || env !== 'production'
};