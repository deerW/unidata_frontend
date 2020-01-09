import { getModules } from '@/api/module'
// import { Message } from 'element-ui'

const moduleStoreModule = {
  state: {
    allModules: []
  },

  actions: {
    // 获取
    GetModules: async({ commit }) => {
      try {
        const data = await getModules()
        commit('SET_MODULES', data.data)
      } catch (err) {
        console.log(err)
      }
    }
  },

  mutations: {
    SET_MODULES: (state, data) => {
      const modules = [{ id: '', value: '', label: '全部模块' }]
      data.map(item => {
        if (!item.parentId) {
          modules.push({
            id: item.id,
            value: item.id,
            label: item.cnName
          })
        }
      })
      modules.map(module => {
        return data.map(item => {
          if (item.parentId === module.id) {
            return module.children.push({
              id: item.id,
              value: item.id,
              label: item.cnName
            })
          }
        })
      })
      state.allModules = modules
    }
  }
}

export default moduleStoreModule
