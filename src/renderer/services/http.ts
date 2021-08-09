import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'

const isDev = process.env.NODE_ENV === 'development'

axios.defaults.timeout = isDev ? 1000 * 1000 : 10 * 1000
axios.defaults.validateStatus = (status: number) => status >= 200 && status <= 300
const protocol = window.location.protocol
const hostname = window.location.hostname
const port = window.location.port
axios.defaults.baseURL = `${protocol}//${hostname}:${port}` + '/api'

const apiClient: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { baseURL, url } = config

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError) => {
    const { message, response } = error
    // TODO handle error 5xx, 4xx
    if (message.indexOf('timeout') !== -1) {
      throw new Error('timeout')
    }
    // TODO
    switch (response?.status) {
      case 404:
      case 400:
      // break
      case 500:
      // break
      default:
        throw error
    }
  }
)

export default apiClient
