const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./components/index.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  },
  //Esto lo que hace es copiar mi codigo html a la carpeta build
  plugins: [
    new HtmlWebpackPlugin({
      template: "./components/index.html"
    })
  ]
};
