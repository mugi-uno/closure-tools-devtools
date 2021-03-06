const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => ({
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
          transpileOnly: argv.mode !== "production",
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
      patterns: [
        { from: "manifest.json" },
        { from: "src/activator/setup.js" },
        { from: "resources/icon-16x16.png" },
        { from: "resources/icon-48x48.png" },
        { from: "resources/icon-128x128.png" },
      ],
    }),
  ],
  devtool: argv.mode !== "production" ? "source-map" : false,
});
