import Vue from 'vue'
import Vuex from 'vuex'
import appStoreModule from './modules/app'
import userStoreModule from './modules/user'
import permissionStoreModule from './modules/permission'
import moduleStoreModule from './modules/module'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app: appStoreModule,
    user: userStoreModule,
    permission: permissionStoreModule,
    module: moduleStoreModule
  },
  getters
})

export default store
