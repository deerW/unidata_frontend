import request from '@/utils/request'

export function getDeals(params) {
  return request({
    url: '/deals',
    method: 'get',
    params
  })
}

export function getDealCount(params) {
  return request({
    url: '/deals/segment_count',
    method: 'get',
    params
  })
}

export function createDeal(data) {
  return request({
    url: '/deals',
    method: 'post',
    data
  })
}

export function getDeal(id) {
  return request({
    url: `/deals/${id}`,
    method: 'get'
  })
}

export function updateDeal(id, data) {
  return request({
    url: `/deals/${id}`,
    method: 'put',
    data
  })
}

export function dealWon(id) {
  return request({
    url: `/deals/${id}/won`,
    method: 'put'
  })
}

export function dealLost(id, data) {
  return request({
    url: `/deals/${id}/lost`,
    method: 'put',
    data
  })
}

export function dealFrozen(id, data) {
  return request({
    url: `/deals/${id}/frozen`,
    method: 'put',
    data
  })
}

export function dealProcess(id) {
  return request({
    url: `/deals/${id}/activate`,
    method: 'put'
  })
}

export function updateSales(id, params) {
  return request({
    url: `/deals/${id}/sales_assignment`,
    method: 'put',
    params
  })
}

export function getComments(id) {
  return request({
    url: `/deals/${id}/comments`,
    method: 'get'
  })
}

export function createComment(id, data) {
  return request({
    url: `/deals/${id}/comments`,
    method: 'post',
    data
  })
}

export function updateComment(id, { commentId, content }) {
  return request({
    url: `/deals/${id}/comments/${commentId}`,
    method: 'put',
    data: {
      content
    }
  })
}

export function deleteComment(id, commentId) {
  return request({
    url: `/deals/${id}/comments/${commentId}`,
    method: 'delete'
  })
}

export function getUtmOption(params) {
  return request({
    url: '/utm_options',
    method: 'get',
    params
  })
}

export function getDestination() {
  return request({
    url: '/destinations',
    method: 'get'
  })
}

export function getCountries() {
  return request({
    url: '/countries',
    method: 'get'
  })
}

export function createPlan(id, data) {
  return request({
    url: `deals/${id}/submissions`,
    method: 'post',
    data
  })
}

export function getOrders(id) {
  return request({
    url: `/deals/${id}/travel_orders`,
    method: 'get'
  })
}

export function informSecretary(params) {
  return request({
    url: `/wechaty_bots/join_room`,
    method: 'get',
    timeout: 100000,
    params
  })
}

export function getSuggestedPrice(id, params) {
  return request({
    url: `deals/${id}/agreements/suggested_price`,
    method: 'get',
    params
  })
}

export function getScoreWeight() {
  return request({
    url: 'score_weight',
    method: 'get'
  })
}

export function updateScoreWeight(params) {
  return request({
    url: 'score_weight.json',
    method: 'put',
    data: params
  })
}

export function createReminder(data) {
  return request({
    url: 'appointments/create_deal_reminder',
    method: 'post',
    data: data
  })
}

export function getDealAuditPlan(id, finalSystem) {
  return request({
    url: `/deals/${id}/unified_plans/default?final_system=${finalSystem}`,
    method: 'get'
  })
}

export function getHaveSendPlans(id) {
  return request({
    url: `/deals/${id}/unified_plans`,
    method: 'get'
  })
}

export function syncOrdering(id) {
  return request({
    url: `/deals/${id}/handover/orders/sync_ordering`,
    method: 'put'
  })
}

export function getPlannerAndAdvisor(id) {
  return request({
    url: `/deals/${id}/plan`,
    method: 'get'
  })
}

export function distDirectlySign(id) {
  return request({
    url: `/deals/${id}/directly_sign`,
    method: 'get'
  })
}

export function getPoiHighlightReadLogs(id) {
  return request({
    url: `/deals/${id}/proposal_logs`,
    method: 'get'
  })
}
