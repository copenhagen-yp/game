export default {
  client: {
    test: /(\.css|\.pcss)$/,
    use: [
      'isomorphic-style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          esModule: false,
        },
      },
      'postcss-loader'
    ],
  },
  server: {
    test: /(\.css|\.pcss)$/,
    // loader: 'null-loader',
    use: [
      'isomorphic-style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          esModule: false,
        },
      },
      'postcss-loader'
    ],

  },
};
