import axios from 'axios'

export const saleTypeApi = {
  getBriefInfo() {
    return axios.get('/api/v2/goods/getBriefInfo').then(res => Promise.resolve(res))
  }
}
