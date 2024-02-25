import path from "path";
const nodeExternals = require("webpack-node-externals");
module.exports = {
  entry: "./server/src/index.ts",
  target: "node",
  mode: "production",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  externals: [nodeExternals()],
};
