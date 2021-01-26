/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

function addEntryPath() {
  if (process.env.NODE_ENV === 'production') {
    return {
      bundle:'./src/index.tsx',
      sw: './src/worker.ts'
    };
  }

  return './src/index.tsx';
}

function addParamToWorkbox() {
  if (process.env.NODE_ENV === 'production') {
    return {
      clientsClaim: true,
      skipWaiting: true,
      importScriptsViaChunks: ['sw'],
    };
  }

  return {
    maximumFileSizeToCacheInBytes: 5000000
  };
}
  
module.exports = {
  entry: addEntryPath(),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /(\.css|\.pcss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            },
          },
          'postcss-loader'
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/images/', to: 'images' }],
    }),
    new WorkboxPlugin.GenerateSW(addParamToWorkbox())
  ],
};
