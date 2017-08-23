var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = function(config) {
    var _config = {
        basePath: '',

        frameworks: ['jasmine'],

        files: [{
            pattern: './karma-test-shim.js',
            watched: false
        }],

        preprocessors: {
            './karma-test-shim.js': ['webpack', 'sourcemap']
        },

        webpack: {
            devtool: 'inline-source-map',

            resolve: {
                extensions: ['.ts', '.js']
            },

            module: {
                rules: [{
                        test: /\.ts$/,
                        loaders: [{
                            loader: 'awesome-typescript-loader',
                            options: {
                                configFileName: helpers.root('src', 'tsconfig.json')
                            }
                        }, 'angular2-template-loader']
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader'

                    },
                    {
                        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                        loader: 'null-loader'
                    },
                    {
                        test: /\.css$/,
                        exclude: helpers.root('src', 'app'),
                        loader: 'null-loader'
                    },
                    {
                        test: /\.css$/,
                        include: helpers.root('src', 'app'),
                        loader: 'raw-loader'
                    }
                ]
            },

            plugins: [
                new webpack.ContextReplacementPlugin(
                    // The (\\|\/) piece accounts for path separators in *nix and Windows
                    /angular(\\|\/)core(\\|\/)@angular/,
                    // location of your src
                    helpers.root('./src'),
                    // a map of your routes
                    {}
                )
            ]
        },

        webpackMiddleware: {
            stats: 'errors-only'
        },

        webpackServer: {
            noInfo: true
        },

        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true
    };

    config.set(_config);
};