const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.ts$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: 'ts-loader',
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.graphql', '.gql'],
  },
  target: 'node',
  experiments: {
    topLevelAwait: true,
  },
};
