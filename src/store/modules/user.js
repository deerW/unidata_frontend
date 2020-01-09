import { passwordLogin, authLogin, getInfo, getPermission } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'

const userStoreModule = {
  state: {
    token: getToken(),
    id: '',
    name: '',
    roles: [],
    avatar: '',
    isDuty: false,
    userPermission: [],
    operationPermission: {},
    ownGroups: [],
    sales: [],
    saleGroup: ''
  },

  actions: {
    // 登录
    PasswordLogin: async({ commit }, { loginInfo }) => {
      try {
        const data = await passwordLogin(loginInfo.email, loginInfo.password)
        setToken(data.accessToken)
        commit('SET_TOKEN', data.accessToken)
      } catch (err) {
        console.log(err)
        Message({
          message: err.data.message || '登录失败,请确认账户和密码正确',
          type: 'error'
        })
      }
    },

    AuthLogin: async({ commit }, { token }) => {
      try {
        const data = await authLogin(token)

        setToken(data.authenticationToken)

        commit('SET_TOKEN', data.authenticationToken)
      } catch (err) {
        console.log(err)
      }
    },

    // 获取用户信息
    GetInfo: async({ commit, dispatch, state }) => {
      try {
        const res = await getInfo(state.token)
        const user = res.data

        console.log(user)
        commit('SET_ID', user.id)
        commit('SET_ROLES', user.roles)
        commit('SET_NAME', user.name)
        commit('SET_USER_PERMISSION', user.abilities)
        // return dispatch('GetPermission')
      } catch (err) {
        console.log(err)
        return Promise.reject(err)
      }
    },

    // 获取用户权限信息
    GetPermission: async({ commit, state }) => {
      try {
        const { permissions } = await getPermission(state.token)

        const userPermission = permissions.userPermission
        const operationPermission = permissions.operationPermission

        commit('SET_USER_PERMISSION', userPermission)
        commit('SET_OPERATION_PERMISSION', operationPermission)
      } catch (err) {
        console.log(err)
        return Promise.reject(err)
      }
    },

    // 切换接单开关
    ToggleIsDuty: async({ commit, state }, newValue) => {
      try {
        commit('SET_IS_DUTY', newValue)
      } catch (err) {
        console.log(err)
      }
    },

    // 登出
    LogOut: async({ commit, state }) => {
      try {
        // await logout(state.token)

        removeToken()

        commit('SET_TOKEN', '')
        commit('SET_USER_PERMISSION', {})
        commit('SET_OPERATION_PERMISSION', {})
      } catch (err) {
        console.log(err)
      }
    },

    // 前端 登出
    FedLogOut: async({ commit }) => {
      try {
        removeToken()

        commit('SET_TOKEN', '')
        commit('SET_USER_PERMISSION', [])
        // commit('SET_OPERATION_PERMISSION', {})
      } catch (err) {
        console.log(err)
      }
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_IS_DUTY: (state, isDuty) => {
      state.isDuty = isDuty
    },
    SET_IS_PARTICIPATE_DISTRIBUTION: (state, isParticipateDistribution) => {
      state.isParticipateDistribution = isParticipateDistribution
    },
    SET_USER_PERMISSION: (state, userPermission) => {
      state.userPermission = userPermission
    },
    SET_OPERATION_PERMISSION: (state, operationPermission) => {
      state.operationPermission = operationPermission
    },
    SET_GROUPS: (state, groups) => {
      state.groups = groups
    },
    SET_SALE_GROUP: (state, group) => {
      state.saleGroup = group
    },
    SET_OWN_GROUPS: (state, ownGroups) => {
      state.ownGroups = ownGroups
    },
    SET_SALES: (state, sales) => {
      state.sales = sales.map(item => {
        item.id = String(item.id)
        return item
      })
    }
  }
}

export default userStoreModule
