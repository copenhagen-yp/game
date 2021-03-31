/* eslint-disable @typescript-eslint/no-var-requires */
const clientConfig = require('./webpack/client.config');
const serverConfig = require('./webpack/server.config');

module.exports = [clientConfig, serverConfig];
