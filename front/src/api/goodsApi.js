import axios from 'axios'

export const goodsApi = {
  getGoodsDetail(param) {
    return axios.post('/api/v2/search/getGoodsDetail', param)
      .then(res => Promise.resolve(res.data))
  },
  getTopSell() {
    return axios.get('/api/v2/goods/getTopSell')
      .then(res => Promise.resolve(res.data))
  }
}