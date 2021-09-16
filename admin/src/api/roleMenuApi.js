import axios from 'axios'
export const roleMenuApi = {
  /**
   * 获取角色的授权菜单编号
   */
  getRoleMenuIds(roleId) {
    return axios.get(`/api/v1/roleMenu/${roleId}`).then(res => Promise.resolve(res.data))
  },

  /**
   * 获取角色的授权叶子菜单编号
   */
  getRoleLeafMenuIds(roleId) {
    return axios.get(`/api/v1/roleMenu/leaf/${roleId}`).then(res => Promise.resolve(res.data))
  },

  updateRoleMenus(menuIdSet, roleId) {
    const param = {
      roleId: roleId
    }
    return axios.post('/api/v1/roleMenu/update', menuIdSet, {
      params: param
    })
      .then(res => Promise.resolve(res.data))
  }

}
