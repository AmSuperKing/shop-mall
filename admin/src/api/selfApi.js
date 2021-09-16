import axios from 'axios'
export const selfApi = {
  login(userinfo) {
    return axios.post('/login', userinfo)
  },
  getMenus() {
    return axios.get('/api/v1/roleMenu/getUserMenu').then(res => Promise.resolve(res))
  },
  getUserInfo() {
    return axios.get('/login/getUserInfo').then(res => Promise.resolve(res))
  }
}
