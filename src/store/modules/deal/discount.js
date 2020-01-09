import { getDiscounts, addDiscount, deleteDiscount } from '@/api/deal'

const discountModule = {
  state: {
    discounts: []
  },

  actions: {
    async GetDiscounts({ rootState, state, commit }) {
      try {
        const dealId = rootState.route.params.id
        const res = await getDiscounts(dealId)

        state.discounts = res.discounts
        return res
      } catch (err) {
        return Promise.reject(err)
      }
    },

    async AddDiscount({ rootState, dispatch }, discountData) {
      const dealId = rootState.route.params.id

      return addDiscount(dealId, discountData).then(_ => {
        return dispatch('GetDiscounts')
      })
    },

    async DeleteDiscount({ rootState, dispatch }, discountId) {
      const dealId = rootState.route.params.id

      return deleteDiscount(dealId, discountId).then(_ => {
        return dispatch('GetDiscounts')
      })
    }
  },

  mutations: {
    GET_DISCOUNT(state, discounts) {
      state.discounts = discounts
    }
  }
}

export default discountModule
