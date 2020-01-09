import request from '@/utils/request'

export function getCustomers(params) {
  return request({
    url: '/customers',
    method: 'get',
    params
  })
}

export function createCustomer(data) {
  return request({
    url: '/customers',
    method: 'post',
    data
  })
}

export function updateCustomer(id, data) {
  return request({
    url: `/customers/${id}`,
    method: 'put',
    data
  })
}

export function getCustomer(id) {
  return request({
    url: `/customers/${id}`,
    method: 'get'
  })
}

export function getNoticeMessage(params) {
  return request({
    url: `/messages`,
    method: 'get',
    params
  })
}

export function updateNoticeMessage(id, data) {
  return request({
    url: `/messages/${id}/`,
    method: 'put',
    data
  })
}
