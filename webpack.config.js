var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var isDevelopment = process.env.NODE_ENV !== 'production';
var BUILD_PATH = path.resolve(__dirname, 'lib');

var common = {
  entry: {},
  output: {},
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, exclude: /node_modules/, use: 'style!css' },
      { test: /\.tsx?$/, exclude: /node_modules/, use: 'ts-loader' },
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    modules: [
        path.join(__dirname, "src"),
        "node_modules"
      ],
    extensions: ['.js', '.ts', '.tsx'],
  },
};

var finalConf;
if (isDevelopment) {
  finalConf = Object.assign({}, common);
  finalConf.mode = 'development';
  finalConf.entry.app = ['./demos/index.tsx']; // HMR
  finalConf.output = {
    path: BUILD_PATH,
    filename: 'demo.js'
  };
  finalConf.devtool = 'source-map';
  finalConf.plugins = [...finalConf.plugins,
    new HtmlWebpackPlugin({
      template: './index.html'
    })];
} else {
  // production config
  finalConf = Object.assign({}, common);
  finalConf.entry.app = './src/index.tsx';
  finalConf.mode = 'production';
  finalConf.output = {
    path: BUILD_PATH,
    filename: 'index.js',
    sourceMapFilename: 'index.map',
    library: 'InfiniteScroll',
    libraryTarget: 'umd'
  };
  finalConf.externals = {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  };
  finalConf.plugins = [...finalConf.plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ];
}

module.exports = finalConf;
