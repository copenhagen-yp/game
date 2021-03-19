import webpack, { Configuration } from 'webpack';
import path from 'path';
import WorkboxPlugin from 'workbox-webpack-plugin';

import { IS_DEV, DIST_DIR, SRC_DIR } from './env';
import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import jsLoader from './loaders/js';


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

let entry = [path.join(SRC_DIR, 'index')];
const resolve = {
  modules: ['src', 'node_modules'],
  extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
};

if (IS_DEV) {
  entry = ['webpack-hot-middleware/client', 'react-hot-loader/patch', ...entry];
  resolve.alias = {
    'react-dom': '@hot-loader/react-dom',
  };
}

const config: Configuration = {
  name: 'client',
  mode: 'development',
  context: __dirname,
  entry,
  module: {
    rules: [fileLoader.client, cssLoader.client, jsLoader.client],
  },
  output: {
    path: DIST_DIR,
    publicPath: '/',
  },
  resolve,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WorkboxPlugin.GenerateSW(addParamToWorkbox()),
    new webpack.DefinePlugin({
      'SSR': JSON.stringify(false)
    })
  ],

  devtool: 'source-map',

  devServer: {
    hot: true,
  },

  performance: {
    hints: IS_DEV ? false : 'warning',
  },
};

module.exports = config;
