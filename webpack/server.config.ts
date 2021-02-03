import path from 'path';
import nodeExternals from 'webpack-node-externals';
import webpack from 'webpack';

import { IS_DEV, DIST_DIR, SRC_DIR } from './env';
import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import jsLoader from './loaders/js';

const config = {
  name: 'server',
  target: 'node',
  node: { __dirname: false },
  entry: path.join(SRC_DIR, 'server'),
  module: {
    rules: [fileLoader.server, cssLoader.server, jsLoader.server],
  },
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: DIST_DIR,
    publicPath: '/src/images/',
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
  },

  devtool: 'source-map',

  performance: {
    hints: IS_DEV ? false : 'warning',
  },

  plugins: [
    new webpack.DefinePlugin({
      'SSR': JSON.stringify(true)
    })    
  ],

  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],

  optimization: { nodeEnv: false },
};

export default config;
