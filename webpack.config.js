const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'node_modules/sql.js/dist/sql-wasm.wasm', to: 'public/' }
            ]
        }),
        // Polyfill global variables
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "fs": false,                   // Disabled as it's server-side only
            "path": require.resolve("path-browserify"),
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer"),
            "assert": require.resolve("assert"),
            "vm": require.resolve("vm-browserify"),
            "process": require.resolve("process/browser")
        }
    },
    experiments: {
        topLevelAwait: true
    }
};
