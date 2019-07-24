const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== "production";

const htmlPlugin = new HtmlWebpackPlugin({
    template: "assets/index.html",
    filename: "../public/index.html",
    inject: true,
    hash: true,
});

let config = {
    entry: {bundle: "./src/index.tsx"},
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            pages: path.resolve(__dirname, '..', 'src/pages/'),
            components: path.resolve(__dirname, '..', 'src/components/'),
        }
    },
    output: {
        path: path.resolve(__dirname, "assets"),
        publicPath: "/assets/",
        filename: "javascript/[name].js"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,//, options: {
                            // hmr: devMode,
                            // publicPath:"../",
                            // reloadAll:true
                        // }},
                    "css-loader",
                    "sass-loader",
                    "postcss-loader",
                ]
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    devServer: {
        contentBase: ["./public","./assets"],
        // historyApiFallback: true,
        open: true,
        hot: true,
        port: 8090
    },
    plugins: [
        htmlPlugin,
        new MiniCssExtractPlugin({
            filename: devMode ? "stylesheets/style.css" : "stylesheets/style.min.css"
        }),
    ],
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 1000
    }
}

module.exports = [config ];