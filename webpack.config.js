const path = require("path");

const WEBPACKDEV_PORT = 3000;

module.exports = (argv) => {
  const isDevelopment = argv && argv.mode === "development";

  return {
    mode: isDevelopment ? "development" : "production",
    devtool: isDevelopment ? "inline-source-map" : "nosources-source-map",
    entry: { bundle: "./src/index.tsx" },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          enforce: "pre",
          use: ["source-map-loader"],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          loader: "url-loader",
          options: {
            mimetype: "application/font-woff2",
          },
        },
        {
          test: /\.(png|jpg|gif)/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 80000,
              },
            },
          ],
        },
        {
          test: /\.(ts|tsx|js)$/,
          exclude: /node_modules/,
          use: {
            loader: "swc-loader",
            options: {
              sync: true,
              jsc: {
                transform: {
                  react: {
                    development: isDevelopment,
                    refresh: isDevelopment,
                  },
                },
              },
            },
          },
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      compress: true,
      port: WEBPACKDEV_PORT,
      host: "0.0.0.0",
      allowedHosts: "all",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
      static: {
        directory: path.join(__dirname, "public"),
      },
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".css", ".sass", ".scss"],
    },
    output: {
      path: path.join(__dirname, "public"),
      filename: "[name].js",
      publicPath: "/",
    },
  };
};
