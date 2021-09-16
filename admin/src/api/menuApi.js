import axios from 'axios'

export const menuApi = {
  getRoleMenuIds(roleId) {
    return axios.get(`/api/v1/roleMenu/getUserMenu`).then(res => Promise.resolve(res.data))
  }
}
