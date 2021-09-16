import axios from 'axios'

export const classifyApi = {
  getClassify() {
    return axios.get('/api/v2/goods/typeList').then(res => Promise.resolve(res.data))
  },
  getRecommend() {
    return axios.post('/api/v2/goods/recommend').then(res => Promise.resolve(res.data))
  }
  
}
