export default {
  client: {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: 'ts-loader',
  },
  server: {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: 'ts-loader',
  },
};
