import path from "path"
import { DefinePlugin } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import "@babel/polyfill";

const APP_DIR = path.resolve(__dirname, "src")

const config = env => {
  const mode = env.production ? "production" : "development"
  return {
    mode,
    context: APP_DIR,
    entry: { main: ['babel-polyfill', env.which === "EDITOR" ? "./Editor/index.jsx" : "./Viewer/index.jsx"] },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
      publicPath: "/",
      ...(mode === "development" && { sourceMapFilename: "[file].map" })
    },
    resolve: {
      extensions: [".jsx", ".mjs", ".js"]
    }, 
    module: {
      rules: [
        {
          test: /\.jsx$|\.js$|\.mjs$/,
          include: APP_DIR,
          exclude: /node_modules/,
          use: [{ loader: "babel-loader" }]
        }
      ]
    },
    
    ...(mode === "development"
      ? {
          devtool: "inline-source-map",
          devServer: {
            historyApiFallback: true
          }
        }
      : { devtool: false }),
    plugins: [
      new HtmlWebpackPlugin({ template: "./assets/index.html" }),
      new DefinePlugin({
        API: JSON.stringify(mode === "development" ? "http://localhost:4000" : "")
      })
    ]
  }
}
export default config
