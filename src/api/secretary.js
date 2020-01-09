import request from '@/utils/request'

export function getSecData() {
  return request({
    url: `/wechaty_bots`,
    method: 'GET'
  })
}

export function getFilterThenAddSecStatus() {
  return request({
    url: `/wechaty_bots/filter_then_add_flow_status`,
    method: 'GET'
  })
}

export function updateFilterThenAddSecStatus(data) {
  return request({
    url: `/wechaty_bots/filter_then_add_toggle`,
    method: 'PUT',
    data
  })
}

export function getRobotAddSecStatus() {
  return request({
    url: `/wechaty_bots/robot_add_flow_status`,
    method: 'GET'
  })
}

export function updateRobotAddSecStatus(data) {
  return request({
    url: `/wechaty_bots/robot_add_toggle`,
    method: 'PUT',
    data
  })
}

export function addSecItem(data) {
  return request({
    url: `wechaty_bots`,
    method: 'POST',
    data
  })
}

export function updateSecItem(secId, data) {
  return request({
    url: `/wechaty_bots/${secId}`,
    method: 'PUT',
    data
  })
}
