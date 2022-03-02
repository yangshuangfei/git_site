import axios from 'axios'
import { Message } from 'element-ui'
import cookie from "js-cookie";

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:9110',
  timeout: 30000 // 请求超时时间
})

// http request 拦截器(请求拦截器)
service.interceptors.request.use(
  config => {
    //当cookie中获取到了token时，则将token放在header中随请求发送给服务端接口
    if(cookie.get('stitch_jwt_token')){
      config.headers['token'] = cookie.get('stitch_jwt_token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
       * code为非20000是抛错 可结合自己业务进行修改
       */
    const res = response.data
    if (res.code === 20000) {
      return response.data
    } else if (res.code === 23004) {
      //清楚cookie
      cookie.set('stitch_jwt_token', '', { domain: 'localhost' })
      return response.data
    } else if (res.code === 25000) {//配合后端查询订单状态接口
      return response.data
    }else if (res.code === 28004) {//鉴权失败的响应码
      window.location.href = '/login'
    } else if (res.code !== 20000) {
      Message({
        message: res.message || 'error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    }
  },
  error => {
    console.log('err：' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
