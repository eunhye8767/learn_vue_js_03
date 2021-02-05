var path = require('path');

module.exports = {
  mode: 'none',      // production, development, none
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']   // 오른쪽에서 왼쪽순으로 적용
      }
    ]
  },
}