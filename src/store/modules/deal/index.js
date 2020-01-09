import {
  getDeal,
  updateDeal,
  editFinalCheck,
  dealWon,
  dealLost,
  dealFrozen,
  dealProcess,
  updateSales,
  getComments,
  createComment,
  updateComment,
  deleteComment,
  getCountries,
  cacheUrls,
  informSecretary,
  getOrders,
  createReminder,
  getPlannerAndAdvisor
} from '@/api/deal'
import { getSales } from '@/api/user'
import { translateStage } from '@/utils/translate'
import { Message } from 'element-ui'
import roomStoreModule from './room'
import planStoreModule from './plan'
import DiscountModule from './discount'

const dealStoreModule = {
  state: {
    deal: {
      stage: {
        stageCreatedAt: '',
        currentStage: '',
        countries: [],
        countryList: [],
        personnelStructure: '',
        travelType: '',
        destinations: [],
        travelDestination: '',
        nextStage: false
      },
      stageCreatedTimes: {},
      isSignFormCompleted: false,
      comments: [],
      customer: {
        name: '',
        phone: '',
        wechat: '',
        qq: '',
        referrerName: '',
        isRegular: false
      },
      customerRemark: '',
      creatorName: '',
      sourceUrl: '',
      pricingFormStatus: '',
      signingFormStatus: '',
      priority: '',
      planId: '',
      callcenterTicketId: '',
      unifiedPlanId: '',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      creator: '',
      createdAt: '',
      status: '',
      activities: [],
      agreement: {
        finalPrice: ''
      },
      account: {
        confirmerAndTime: '',
        healthConfirmedAt: '',
        incomeAmount: 0,
        incomes: {},
        isAllTravelersFilled: false,
        isBudgetGt: false,
        isCostPriceNil: false,
        isMainTravelerFilled: false,
        isPaymentCompleted: false,
        planUuid: '',
        receiverAt: '',
        userAges: [],
        verifiedIncomeAmount: 0
      },
      subject: '',
      travelDestination: '',
      travelIntention: '',
      travelDepartureDate: '',
      travelDays: 0,
      travelDepartureCity: '',
      personnelStructure: '',
      cancelReason: '',
      contactStatus: '',
      orders: [],
      reminderTime: '',
      salesName: '',
      salesPipelineName: '',
      secretaryName: '',
      plannerName: '',
      advisorName: '',
      isSignFromDist: ''
    },
    currentStage: 0,
    countries: [],
    planUrl: {}
  },

  actions: {
    GetAllAboutDeal: async({ rootState, dispatch }) => {
      try {
        const id = rootState.route.params.id

        const deal = await dispatch('GetDeal')
        dispatch('GetComments', id)
        dispatch('GetSales')
        dispatch('GetCountries')
        dispatch('GetPlannerAndAdvisor', id)
        dispatch('GetPlanUrl', deal.planId)
      } catch (err) {
        return Promise.reject(err)
      }
    },
    GetDeal: async({ rootState, state, commit }) => {
      try {
        const id = rootState.route.params.id
        const { deal } = await getDeal(id)

        commit('SET_DEAL', deal)

        if (deal.status === 'won') {
          commit('SET_CURRENT_STAGE', 6)
        } else {
          commit('SET_CURRENT_STAGE', translateStage(state.deal.stage.currentStage))
        }

        return deal
      } catch (err) {
        return Promise.reject(err)
      }
    },
    GetComments: async({ rootState, commit }, id) => {
      const comments = await getComments(id)

      commit('SET_DEAL', comments)
    },
    GetSales: async({ commit }) => {
      const { sales } = await getSales()

      commit('SET_SALES', sales)
    },
    GetCountries: async({ commit }) => {
      const countries = await getCountries()

      commit('SET_COUNTRIES', countries)
    },
    GetPlanUrl: async({ commit }, planId) => {
      const planUrl = await cacheUrls({ planId }).catch(err => console.log(err))

      commit('SET_URL', planUrl)
    },
    GetPlannerAndAdvisor: async({ commit }, id) => {
      const plannerAndAdvisor = await getPlannerAndAdvisor(id)

      commit('SET_ADVISER_AND_CUSTOMIZER', plannerAndAdvisor)
    },
    GetOrders: async({ rootState, state, commit }) => {
      const { orders } = await getOrders(rootState.route.params.id)

      commit('SET_ORDERS', orders)
    },

    UpdateDeal: async({ rootState, state, commit }, data) => {
      const { deal } = await updateDeal(rootState.route.params.id, data)

      commit('SET_DEAL', deal)

      Message({
        message: '修改成功！',
        type: 'success'
      })
    },
    UpdatePriority: async({ commit }, data) => {
      const { deal } = await updateDeal(data.dealId, {
        priority: data.priority
      })

      if (data.update) {
        commit('SET_DEAL', deal)
      }

      Message({
        message: '修改成功！',
        type: 'success'
      })
    },
    UpdatePrice: async({ rootState, state, commit }, data) => {
      const { agreement } = await editFinalCheck(rootState.route.params.id, data)
      commit('SET_AGREEMENT', agreement)

      Message({
        message: '修改成功！',
        type: 'success'
      })
    },
    UpdateStage: async({ rootState, state, commit, dispatch }, data) => {
      commit('SET_CURRENT_STAGE', data.stage)
      dispatch('GetAllAboutDeal')

      Message({
        message: '阶段已跳转！',
        type: 'success'
      })
    },
    UpdateStatus: async({ rootState, state, commit }, data) => {
      let res

      const { status } = data
      switch (status) {
        case 'lost':
          res = await dealLost(rootState.route.params.id, data)
          break
        case 'frozen': {
          const { unfreezeTime } = data
          res = await dealFrozen(rootState.route.params.id, { unfreezeTime })
          break
        }
        case 'won':
          res = await dealWon(rootState.route.params.id)
          commit('SET_CURRENT_STAGE', 5)
          break
        case 'process':
          res = await dealProcess(rootState.route.params.id)
          break
      }

      commit('SET_DEAL', res.deal)
    },
    UpdateSales: async({ rootState, state, commit }, data) => {
      const { deal } = await updateSales(rootState.route.params.id, data)

      commit('SET_DEAL', deal)
    },
    CreateComment: async({ rootState, state, commit }, data) => {
      try {
        const { comment } = await createComment(rootState.route.params.id, data)

        commit('CREATE_COMMENT', comment)

        Message({
          message: '创建备注成功！',
          type: 'success'
        })
      } catch (err) {
        Message({
          message: '创建备注失败,请重试',
          type: 'error'
        })
      }
    },
    UpdateComment: async({ rootState, state, commit }, data) => {
      const { comment } = await updateComment(rootState.route.params.id, data)

      commit('UPDATE_COMMENT', comment)

      Message({
        message: '更新备注成功！',
        type: 'success'
      })
    },
    DeleteComment: async({ rootState, state, commit }, commentId) => {
      await deleteComment(rootState.route.params.id, commentId)

      commit('DELETE_COMMENT', commentId)

      Message({
        message: '删除备注成功！',
        type: 'success'
      })
    },
    InformSecretary: async({ commit }, params) => {
      const res = await informSecretary(params)

      Message({
        message: res.message,
        type: res.status === 'fail' ? 'error' : 'success'
      })
    },
    CreateReminder: async({ commit }, data) => {
      const { deal } = await createReminder(data)

      commit('SET_DEAL', deal)

      Message({
        message: '设置提醒时间成功！',
        type: 'success'
      })
    }
  },

  mutations: {
    SET_DEAL: (state, deal) => {
      Object.assign(state.deal, deal)
    },
    SET_AGREEMENT: (state, agreement) => {
      Object.assign(state.deal.agreement, agreement)
    },
    SET_CURRENT_STAGE: (state, stage) => {
      state.currentStage = stage
    },
    SET_ACCOUNT: (state, account) => {
      Object.assign(state.deal.account, account)
    },
    CREATE_COMMENT: (state, comment) => {
      state.deal.comments.unshift(comment)
    },
    UPDATE_COMMENT: (state, comment) => {
      const index = state.deal.comments.map(({ id }) => id).indexOf(comment.id)
      state.deal.comments.splice(index, 1, comment)
    },
    DELETE_COMMENT: (state, id) => {
      const index = state.deal.comments.map(({ id }) => id).indexOf(id)
      state.deal.comments.splice(index, 1)
    },
    SET_COUNTRIES: (state, countries) => {
      state.countries = countries
    },
    SET_URL: (state, planUrl) => {
      Object.assign(state.planUrl, planUrl)
    },
    SET_ORDERS: (state, orders) => {
      state.deal.orders = orders
    },
    SET_REMINDER: (state, time) => {
      state.deal.reminderTime = time
    },
    SET_ADVISER_AND_CUSTOMIZER: (state, plannerAndAdvisor) => {
      state.deal.advisorName = plannerAndAdvisor.advisorName
      state.deal.plannerName = plannerAndAdvisor.plannerName
      state.deal.isSignFromDist = plannerAndAdvisor.isSignFromDist
    }
  },

  modules: {
    room: roomStoreModule,
    plan: planStoreModule,
    discount: DiscountModule
  }
}

export default dealStoreModule
