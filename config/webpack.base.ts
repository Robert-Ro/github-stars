import { Configuration, ProvidePlugin, DefinePlugin, RuleSetUseItem, ProgressPlugin } from 'webpack'
import { resolve } from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import htmlWebpackPlugin from 'html-webpack-plugin'
import dotenv from 'dotenv-flow'
import { version } from '../package.json'
import gitCommitInfo from 'git-commit-info'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const { shortCommit } = gitCommitInfo()
const commonLessRule: RuleSetUseItem = {
  loader: 'less-loader',
  options: {
    lessOptions: {
      modifyVars: {},
      javascriptEnabled: true,
    },
  },
}
const lastStyleLoader = process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader
const config: Configuration = {
  entry: resolve(__dirname, '../src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-typescript', '@babel/preset-react'],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', { targets: 'defaults' }]],
        },
        exclude: /node_modules/,
      },

      {
        test: /\.css$/,
        use: [
          lastStyleLoader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, // 如果在css文件中使用import，则需此设置
            },
          },
          'postcss-loader',
        ],
      },

      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          lastStyleLoader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName:
                  process.env.NODE_ENV === 'production' ? '__[hash:base64:5]' : '[local]__[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          commonLessRule,
        ],
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          lastStyleLoader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          commonLessRule,
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, // in bytes TODO
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts', '.json'],
    alias: {
      '@': resolve(__dirname, '../src/renderer'),
    },
  },
  output: {
    filename: 'bundle.[contenthash].js',
    path: resolve(__dirname, '../dist'),
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ProgressPlugin(),
    new ProvidePlugin({
      process: 'process/browser',
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
    new htmlWebpackPlugin({
      title: 'Maple Github Stars',
      template: resolve(__dirname, '../public/index.html'),
      inject: true,
      PUBLIC_URL: '/',
      base: '/',
      hash: true,
    }),
  ],
}

export default config
