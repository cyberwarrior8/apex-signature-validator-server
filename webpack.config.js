const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const version = require('./package.json').version;
const path = require('path');

module.exports = (env = {}) => { // set env as empty object if unset from cli
    let mode;
    if (env.production || env.devbuild) { mode = 'production'; }
    else { mode = 'development'; }

    let config = {
        mode: mode,
        entry: {
            app: './src/app.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: path.resolve(__dirname, 'node_modules'),
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            browsers: ['ie 11']
                                        }
                                    }
                                ]
                            ]
                        }
                    }
                },
                {
                    test: /\.(png|jpg|gif|eot|otf|svg|ttf|woff|woff2)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8182, // byte limit to inline files as data URL
                            name: 'assets/[name].[ext]' // path to file for file-loader fallback
                        }
                    }]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        plugins: [],
        devServer: {
            contentBase: path.resolve(__dirname, 'dist')
        }
    };

    if (env.production) {
        // PRODUCTION
        config.plugins.push(new OptimizeCssAssetsPlugin()); // minify css
        config.plugins.push(new webpack.DefinePlugin({
            'VERSION': JSON.stringify(version)
        }));
        config.plugins.push(new HtmlWebpackPlugin({
            title: 'Apex Signature Validator',
            template: 'index.ejs',
            inlineSource: '.js$'
        }));
        config.plugins.push(new HtmlWebpackInlineSourcePlugin());
    } else if (env.devbuild) {
        // DEV:MINIFIED/INLINED
        config.plugins.push(new OptimizeCssAssetsPlugin()); // minify css
        config.plugins.push(new webpack.DefinePlugin({
            'VERSION': JSON.stringify(version)
        }));
        config.plugins.push(new HtmlWebpackPlugin({
            title: 'Apex Signature Validator',
            template: 'index.ejs',
            inlineSource: '.js$'
        }));
        config.plugins.push(new HtmlWebpackInlineSourcePlugin());
    } else {
        // DEV
        config.plugins.push(new webpack.DefinePlugin({
            'VERSION': JSON.stringify(version)
        }));
        config.plugins.push(new HtmlWebpackPlugin({
            title: 'Apex Signature Validator',
            template: 'index.ejs'
        }));
    }
    return config;
};