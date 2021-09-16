import axios from 'axios'
export const roleApi = {
  /**
   * 获取查询条件下角色列表
   */
  searchRoles(role, pageData) {
    return axios.post('/api/v1/role/search', role, {
      params: pageData
    }).then(res => Promise.resolve(res.data))
  },

  addRole(role) {
    return axios.post('/api/v1/role/add', role)
      .then(res => Promise.resolve(res.data))
  },

  deleteRoles(roleIdSet) {
    return axios.post('/api/v1/role/delete', roleIdSet)
      .then(res => Promise.resolve(res.data))
  },

  updateRole(role) {
    return axios.post('/api/v1/role/update', role)
      .then(res => Promise.resolve(res.data))
  },

  checkRole(role) {
    return axios.post('/api/v1/role/check', role)
      .then(res => Promise.resolve(res.data))
  }
}
