import { Configuration, HotModuleReplacementPlugin } from 'webpack'
import { merge } from 'webpack-merge'
import baseConfig from './webpack.base'
import { Configuration as DevConfiguration } from 'webpack-dev-server'

const config: Configuration & DevConfiguration = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 3060,
  },
  plugins: [new HotModuleReplacementPlugin()],
})

export default config
