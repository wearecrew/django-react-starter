const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

const postcssOptions = {
  sourceMap: isDev,
  ident: "postcss",
  plugins: [require("postcss-flexbugs-fixes"), require("autoprefixer")],
};

if (!isDev) {
  postcssOptions.plugins.push(require("cssnano"));
}

let config = {
  entry: {
    application: "./frontend/js/index.js",
    styles: "./frontend/scss/index.scss",
  },
  output: {
    path: path.resolve(__dirname, "../backend/project", "static", "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: { sourceMap: isDev, url: false },
          },
          {
            loader: "postcss-loader",
            options: postcssOptions,
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
  ],
};

if (isDev) {
  config.devtool = "inline-source-map";
  config.plugins.push(
    new BrowserSyncPlugin(
      {
        host: "localhost",
        port: 3000,
        proxy: "http://localhost:8000/",
      },
      {
        injectCss: true,
      }
    )
  );
} else {
  config.devtool = "source-map";
}

module.exports = config;
