import axios from 'axios'
import store from '../store'
import { Message } from 'element-ui'

import { getToken } from '@/utils/auth'
import { camelizeKeys, decamelizeKeys } from '@/utils/camelCase'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  config.data = decamelizeKeys(config.data)
  config.params = decamelizeKeys(config.params)
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

const inNovaChat = window.self !== window.top

// respone拦截器
service.interceptors.response.use(
  response => {
    const data = response.data
    return camelizeKeys(data)
  },
  error => {
    if (error.response) {
      console.log(error.response.status)
      switch (error.response.status) {
        case 401:
          if (inNovaChat) {
            return Promise.reject(error)
          }
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
          break
        case 500:
          Message({
            message: '系统错误，请联系管理员',
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject(error)
        case 422:
          return Promise.reject(error.response)
        case 404:
          return Promise.reject(error.response)
        default:

          // 确认全款错误时不在message中显示错误信息
          if (error.response.config.url.includes('full_receive')) {
            return Promise.reject(error.response.data)
          }

          Message({
            dangerouslyUseHTMLString: true,
            message: error.response.data.errors || error.response.data.message || error.response.statusText,
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject(error)
      }
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
