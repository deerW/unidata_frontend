import request from '@/utils/request'

// 核价表单的获取，保存和提交
export function getPricingForm(id) {
  return request({
    url: `/deals/${id}/handover/pricing_form`,
    method: 'get'
  })
}
export function pricingFormSubmit(id, data) {
  return request({
    url: `/deals/${id}/handover/pricing_form/submit`,
    method: 'put',
    data
  })
}
export function pricingFormPreserver(id, data) {
  return request({
    url: `/deals/${id}/handover/pricing_form/`,
    method: 'put',
    data
  })
}

// 签约表单的获取,保存和提交
export function getSigningForm(id) {
  return request({
    url: `/deals/${id}/handover/signing_form`,
    method: 'get'
  })
}
export function signingFormSave(id, data) {
  return request({
    url: `/deals/${id}/handover/signing_form`,
    method: 'put',
    data
  })
}

// 出行人员信息的增删查改
export function createTravelers(id, data) {
  return request({
    url: `/deals/${id}/travelers`,
    method: 'post',
    data
  })
}
export function getTravelers(id) {
  return request({
    url: `/deals/${id}/travelers`,
    method: 'get'
  })
}
export function updateTravelers(id, travelersId, data) {
  return request({
    url: `deals/${id}/travelers/${travelersId}`,
    method: 'put',
    data
  })
}
export function deleteTravelers(id, travelersId) {
  return request({
    url: `/deals/${id}/travelers/${travelersId}`,
    method: 'delete'
  })
}

// 房型信息的增删查改
export function createRoomType(id, data) {
  return request({
    url: `/deals/${id}/rooms`,
    method: 'post',
    data
  })
}
export function getRoom(id) {
  return request({
    url: `/deals/${id}/rooms`,
    method: 'get'
  })
}
export function updateRoom(id, roomsId, data) {
  return request({
    url: `/deals/${id}/rooms/${roomsId}`,
    method: 'put',
    data
  })
}
export function deleteRooms(id, roomsId) {
  return request({
    url: `/deals/${id}/rooms/${roomsId}`,
    method: 'delete'
  })
}

// 表单变更历史
export function getSigningFormActivities(id) {
  return request({
    url: `/deals/${id}/handover/signing_form/activities`,
    method: 'get'
  })
}
export function getPricingFormActivities(id) {
  return request({
    url: `/deals/${id}/handover/pricing_form/activities`,
    method: 'get'
  })
}

export function bindDealToDist(id, unifiedPlanId) {
  return request({
    url: `/deals/${id}/unified_plans/${unifiedPlanId}/bind_dist`,
    method: 'post'
  })
}

export function getDistCheckPriceList(id, planId) {
  return request({
    url: `/deals/${id}/unified_plans/${planId}/price_check_info`,
    method: 'get'
  })
}

export function editFinalCheck(id, data) {
  return request({
    url: `/deals/${id}/agreements/final_price`,
    method: 'put',
    data
  })
}

export function getDepositLink(data) {
  return request({
    url: `/deals/charge_plans/charge_info`,
    method: 'put',
    data
  })
}

export function cacheUrls(params) {
  return request({
    url: `/deals/charge_plans/cure_plan_urls`,
    method: 'get',
    params
  })
}

export function getIncomeInfo(id) {
  return request({
    url: `/deals/${id}/accounts/income_new`,
    method: 'get'
  })
}

export function addIncomeInfo(id, data) {
  return request({
    url: `/deals/${id}/accounts/income_create`,
    method: 'post',
    data
  })
}

export function updateFullReceived(id, params) {
  return request({
    url: `/deals/${id}/accounts/full_receive`,
    method: 'put',
    params,
    timeout: 102000
  })
}

export function getPriorityPoints(data, params) {
  return request({
    url: `/deals/priority/points`,
    method: 'post',
    params,
    data
  })
}

export function getFlightSuppliers() {
  return request({
    url: `/flight_suppliers`,
    method: 'get'
  })
}
