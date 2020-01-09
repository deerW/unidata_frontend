import { getDealAuditPlan, getHaveSendPlans } from '@/api/deal'

const planStoreModule = {
  state: {
    auditPlan: {
      prime: '',
      profit: '',
      profitRate: '',
      suggest: '',
      distPlanUrl: ''
    },
    haveSendPlans: [],
    finalSystem: 'dist'
  },

  actions: {
    GetHaveSendPlans: async({ rootState, state, commit }) => {
      try {
        const { unifiedPlans } = await getHaveSendPlans(rootState.route.params.id)

        commit('SET_HAVE_SEND_PLANS', unifiedPlans)
      } catch (err) {
        console.log(err)
      }
    },
    GetAuditPlan: async({ rootState, state, commit }, finalSystem) => {
      try {
        const { unifiedPlan } = await getDealAuditPlan(rootState.route.params.id, finalSystem || state.finalSystem)

        commit('SET_AUDIT_PLAN', unifiedPlan)
      } catch (err) {
        console.log(err)
      }
    },
    ResetAuditPlan: ({ commit }) => {
      const initAuditPlan = {
        prime: '',
        profit: '',
        profitRate: '',
        suggest: '',
        distPlanUrl: ''
      }

      commit('SET_AUDIT_PLAN', initAuditPlan)
    },
    SetAuditPlanFinalSystem: ({ state }, val) => {
      state.finalSystem = val
    }
  },

  mutations: {
    SET_HAVE_SEND_PLANS: (state, plans) => {
      state.haveSendPlans = plans
    },
    SET_AUDIT_PLAN: (state, plan) => {
      state.auditPlan = plan
    }
  }
}

export default planStoreModule
