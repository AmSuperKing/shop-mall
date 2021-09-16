import axios from 'axios'

export const searchApi = {
  getHotSearchWords() {
    return axios.get('/api/v2/search/hotWord')
      .then(res => Promise.resolve(res.data))
  },
  searchGoods(word) {
    return axios.post('/api/v2/search/searchGoods', null, {
      params: {
        search: word
      }
    })
  }
}