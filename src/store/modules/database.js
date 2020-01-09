// import { passwordLogin } from '@/api/login'
// import { Message } from 'element-ui'

const userStoreModule = {
  state: {
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
    // 获取
    // PasswordLogin: async({ commit }, { loginInfo }) => {
    //   try {
    //     const data = await passwordLogin(loginInfo.email, loginInfo.password)
    //     console.log(data)
    //     commit('SET_TOKEN', data.accessToken)
    //   } catch (err) {
    //     console.log(err)
    //     Message({
    //       message: err.data.message || '登录失败,请确认账户和密码正确',
    //       type: 'error'
    //     })
    //   }
    // },
  },

  mutations: {
    // SET_TOKEN: (state, token) => {
    //   state.token = token
    // }
  }
}

export default userStoreModule
