const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
//const nodeExternals = require('webpack-node-externals');
const path = require('path');

const common = require('./webpack.common.cjs');

module.exports = merge(common, {
  devtool: 'source-map',
  entry: [path.join(__dirname, 'src/index.ts')],
  stats: {
    errorDetails: true
  },
  //externals: [nodeExternals({})],
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
});
