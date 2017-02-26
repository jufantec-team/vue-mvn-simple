//可在登录成功后再加载权限配置。此时界面中只显示有权限的菜单
import menu from '../data/menu.json'

const moduleMenu = {
  state: {
    routes: menu.routes
  },
  getters: {
    getRoutes: state => {
      return state.routes
    }
  }
}

export default moduleMenu