//可在登录成功后再加载权限配置。此时界面中只显示有权限的菜单
import api from '../api'

const moduleParamet = {
  /**
   * 格式：{table_name.col_name: {
   *   col_value: value_desc
   * }}
   */
  state: {
    paramets: {}
  },
  getters: {
    getParamets: state => {
      return state.paramets
    }
  },
  mutations: {
    init(state, body) {
      Object.assign(state.paramets, body.st_para)
    }
  },
  actions: {
    loadParamets ({ commit }){
      api.api.call('getTableParamet').then(data => {
        commit({
          type: 'init',
          ... data
        })
      })
    }
  }
}

export default moduleParamet