import webpack, { Configuration } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpackConfig: Configuration = require('../../webpack/client.config');
const webpackCompiler = webpack(webpackConfig);

export default function (app) {
  app.use(webpackDevMiddleware(webpackCompiler, { publicPath: '/', serverSideRender: true }));
  app.use(webpackHotMiddleware(webpackCompiler));
}
