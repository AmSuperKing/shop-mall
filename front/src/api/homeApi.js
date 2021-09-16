import axios from 'axios'

export const homeApi = {
  getMainTypes() {
    return axios.get('/api/v2/goods/getMainTypes')
      .then(res => Promise.resolve(res.data))
  },
  getSubTypes() {
    return axios.get('/api/v2/goods/getSubTypes')
      .then(res => Promise.resolve(res.data))
  },
  getRecGoods() {
    return axios.post('/api/v2/goods/recommend')
      .then(res => Promise.resolve(res.data))
  },
  getSaleTypeInfo() {
    return axios.get('/api/v2/goods/getSaleTypeInfo')
      .then(res => Promise.resolve(res.data))
  },
  getSaleTypeItem(typeId) {
    return axios.get(`/api/v2/goods/getSaleTypeItem?typeId=${typeId}`)
      .then(res => Promise.resolve(res.data))
  },
  // saleType
  getBriefInfo() {
    return axios.get('/api/v2/goods/getBriefInfo').then(res => Promise.resolve(res.data))
  },
  // saleType
  getTypeList() {
    return axios.get('/api/v2/goods/typeList').then(res => Promise.resolve(res.data))
  }

}
