const appStoreModule = {
  state: {
    sidebar: {
      opened: !+window.localStorage.getItem('sidebarStatus')
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar: ({ commit }) => {
      commit('CLOSE_SIDEBAR')
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        window.localStorage.setItem('sidebarStatus', 1)
      } else {
        window.localStorage.setItem('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    CLOSE_SIDEBAR: state => {
      state.sidebar.opened = false
    }
  }
}

export default appStoreModule
