import path from 'path'
import * as webpack from 'webpack'

const config: webpack.Configuration = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  module: {
    rules: [
      {
        test: /^\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts', '.json'],
  },
  optimization: {},
  output: {
    filename: 'bundle.js',
    path: path.relative(__dirname, 'dist'),
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
}

export default config
