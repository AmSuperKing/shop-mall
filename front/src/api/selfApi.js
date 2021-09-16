import axios from 'axios'

export const selfApi = {
  login(userinfo) {
    return axios.post('/login', userinfo)
  },
  getUserInfo() {
    return axios.get('/login/getUserInfo').then(res => Promise.resolve(res))
  }
}
