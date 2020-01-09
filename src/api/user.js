import request from '@/utils/request'

export function getUsers(params) {
  return request({
    url: '/users',
    method: 'get',
    params
  })
}

export function updateUser(id, data) {
  return request({
    url: `/users/${id}`,
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}

export function getUserGroups(params) {
  return request({
    url: '/user_groups',
    method: 'get',
    params
  })
}

export function createUserGroup(data) {
  return request({
    url: '/user_groups',
    method: 'post',
    data
  })
}

export function updateUserGroup(id, data) {
  return request({
    url: `/user_groups/${id}`,
    method: 'put',
    data
  })
}

export function deleteUserGroup(id, data) {
  return request({
    url: `/user_groups/${id}`,
    method: 'delete'
  })
}

export function getSales(params) {
  return request({
    url: '/sales',
    method: 'get',
    params
  })
}

export function getArrangementsList(params) {
  return request({
    url: '/sales_arrangements',
    method: 'get',
    params
  })
}

export function updateArrangementsList(params) {
  return request({
    url: '/sales_arrangements/refresh',
    method: 'post',
    params
  })
}

export function updateArrangements(id, data) {
  return request({
    url: `/sales_arrangements/${id}`,
    method: 'put',
    data
  })
}

export function getArrangementsListCount() {
  return request({
    url: `/sales_arrangements/dispatch_analyze`,
    method: 'get'
  })
}

export function getRoles(params) {
  return request({
    url: '/roles',
    method: 'get',
    params
  })
}

export function getRole(id) {
  return request({
    url: `/roles/${id}`,
    method: 'get'
  })
}

export function createRole(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `roles/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `roles/${id}`,
    method: 'delete'
  })
}

export function updateRoleUser(id, data) {
  return request({
    url: `roles/add_users_to_role`,
    method: 'put',
    data
  })
}

export function updateUserDuty(data) {
  return request({
    url: 'users/change_receive_order_status',
    method: 'put',
    data
  })
}

export function updateUserMaxCount(data) {
  return request({
    url: 'users/update_max_count',
    method: 'put',
    data
  })
}

export function getRecommendSales(params) {
  return request({
    url: 'sales/recommend',
    method: 'get',
    params
  })
}

export function getDashBoardInfo(data) {
  return request({
    url: `dashboards/${data.id}`,
    method: 'get',
    data: data
  })
}
