import axios from 'axios'
export const userApi = {
  searchUser(user, pagerData) {
    return axios.post('/api/v1/user/search', user, { params: pagerData })
      .then(res => Promise.resolve(res.data))
  },
  deleteUser(user) {
    return axios.delete('/api/v1/user', { data: user })
      .then(res => Promise.resolve(res.data))
  },
  adduser(employees, passwd) {
    const param = { password: passwd }
    return axios.post('/api/v1/user', employees, { params: param })
      .then(res => Promise.resolve(res.data))
  },
  getUserRoles(sn) {
    return axios.get(`/api/v1/user/${sn}/role`)
      .then(res => Promise.resolve(res.data))
  },
  admChangePwd(username, pwd) {
    const param = { password: pwd }
    return axios.put(`/api/v1/user/${username}/password`, null, { params: param })
      .then(res => Promise.resolve(res.data))
  },
  getUserInfo(username) {
    return axios.get(`/api/v1/user/${username}`)
      .then(res => Promise.resolve(res.data))
  },
  setDefaultRole(username, roleId) {
    return axios.put(`/api/v1/user/${username}/role/${roleId}`)
      .then(res => Promise.resolve(res.data))
  },
  modifyMyPassword(oldPassword, newPassword) {
    return axios.put('/api/v1/self/changePassword', null, {
      params: {
        oldPassword: oldPassword,
        newPassword: newPassword
      }
    }).then(res => Promise.resolve(res.data))
  }
}

