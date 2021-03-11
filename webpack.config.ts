import * as path from 'path';
import * as webpack from 'webpack';
import merge from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

interface Environment {
    dev: boolean,
    analyze: boolean,
}

const baseWebpackConfig: webpack.Configuration = {
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".mjs", ".cjs", ".json", ".wasm"],
    },
    entry: {
        main: './src/main.ts',
    },
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {},
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CleanWebpackPlugin(),
    ],
};

const analyzeWebpackConfig: webpack.Configuration = {
    plugins: [
        new BundleAnalyzerPlugin({

        }),
    ],
};

function createConfig(env: Environment) {
    console.log('ENVIRONMENT:', env);

    let outputWebpackConfig: webpack.Configuration = baseWebpackConfig;

    if (env.analyze) {
        outputWebpackConfig = merge(outputWebpackConfig, analyzeWebpackConfig);
    }

    return outputWebpackConfig;
}

export default createConfig;
