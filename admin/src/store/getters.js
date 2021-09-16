const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  avatar: state => state.self.avatar,
  name: state => state.self.name,
  roles: state => state.self.roles
}
export default getters
