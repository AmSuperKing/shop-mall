import axios from 'axios'

export const infoApi = {
  getNewProductBanner() {
    return axios.get('/api/v2/info/getNewProductBanner')
      .then(res => Promise.resolve(res.data))
  }
}