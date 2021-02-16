import * as webpack from 'webpack'

const isDevelopment = process.env.NODE_ENV === 'development'
const config: webpack.Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'cheap' : false,
}

export default config
