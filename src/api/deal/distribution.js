import request from '@/utils/request'

export function getUnassigned() {
  return request({
    url: '/deals/assignments/unassigned',
    method: 'get'
  })
}

export function updateUnassigned() {
  return request({
    url: '/deals/assignments/toggle',
    method: 'post'
  })
}

export function getDistributionLogs(params) {
  return request({
    url: '/regular_assign_sale_logs',
    method: 'get',
    params
  })
}

export function getDistributionSettings(params) {
  return request({
    url: '/deal_assignment_configs',
    method: 'get',
    params
  })
}

export function createDistributionSetting(data) {
  return request({
    url: '/deal_assignment_configs',
    method: 'post',
    data
  })
}

export function updateDistributionSetting(id, data) {
  return request({
    url: `/deal_assignment_configs/${id}`,
    method: 'put',
    data
  })
}

export function deleteDistributionSetting(id) {
  return request({
    url: `/deal_assignment_configs/${id}`,
    method: 'delete'
  })
}
