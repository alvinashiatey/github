var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./src/js/script.js",
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: "source-map",
  mode: 'development';
};
