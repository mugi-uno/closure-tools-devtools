const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    panel: path.resolve(__dirname, "./src/panel/panel.tsx"),
    devtools: path.resolve(__dirname, "./src/devtools/devtools.ts"),
    content: path.resolve(__dirname, "./src/content/content.ts"),
    background: path.resolve(__dirname, "./src/background/background.ts"),
    setupDevTools: path.resolve(__dirname, "./src/activator/setupDevTools.ts"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: process.env.NODE_ENV !== "production",
        },
      },
      {
        test: /\.svg/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "DevTools",
      filename: "devtools.html",
      chunks: ["devtools"],
    }),
    new HtmlWebpackPlugin({
      title: "Panel",
      filename: "panel.html",
      template: "./src/panel/panel.html",
      chunks: ["panel"],
    }),
    new CopyPlugin({
      patterns: [{ from: "manifest.json" }, { from: "src/activator/setup.js" }, { from: "resources/icon-*.png" }],
    }),
  ],
  devtool: "source-map",
};
