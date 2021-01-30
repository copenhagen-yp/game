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

const config = {
  entry: [
    IS_DEV && 'react-hot-loader/patch',
    IS_DEV && 'webpack-hot-middleware/client',
    path.join(SRC_DIR, 'index'),
  ],
  module: {
    rules: [fileLoader.client, cssLoader.client, jsLoader.client],
  },
  output: {
    path: DIST_DIR,
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    modules: ['src', 'node_modules'],
    alias: { 'react-dom': '@hot-loader/react-dom' },
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  plugins: [
    new WorkboxPlugin.GenerateSW(addParamToWorkbox())
  ],

  devtool: 'source-map',

  performance: {
    hints: IS_DEV ? false : 'warning',
  },
};

export default config;
