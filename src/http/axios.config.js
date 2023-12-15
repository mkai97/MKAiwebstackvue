// api.js or api.ts
import axios from 'axios'

const instance = axios.create({
  baseURL: '/api', // 根据实际情况设置基本URL
  timeout: 24*60*60*1000, // 设置超时时间，单位毫秒
})

export default instance