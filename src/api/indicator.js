import request from '@/utils/request'

export function getIndicators(params) {
  return request({
    url: '/indicator/indicators',
    method: 'get',
    params
  })
}

export function createIndicator(params) {
  return request({
    url: '/indicator/indicators',
    method: 'post',
    params
  })
}

export function updateIndicator(params) {
  return request({
    url: `/indicator/indicators/${params.id}`,
    method: 'put',
    params
  })
}

export function getIndicator(id) {
  return request({
    url: `/indicator/indicators/${id}`,
    method: 'get'
  })
}
export function getSelectIndicators(params) {
  return request({
    url: '/indicator/indicator/search',
    method: 'get',
    params
  })
}

