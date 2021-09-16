import axios from 'axios'

export const roleUserApi = {
  getRoleMenu(roleId) {
    return axios.get(`/api/v1/roleMenu/getRoleMenu/${roleId}`).then(res => Promise.resolve(res.data))
  }
}
