export default {
  client: {
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
  server: {
    test: /(\.css|\.pcss)$/,
    loader: 'null-loader',
  },
};
