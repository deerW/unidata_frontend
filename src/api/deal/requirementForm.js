import request from '@/utils/request'

export function getRequirementForm(dealId) {
  return request({
    url: `/requirements/${dealId}`,
    method: 'get'
  })
}

export function createRequirementForm(data) {
  return request({
    url: '/requirements',
    method: 'post',
    data
  })
}

export function updateRequirementForm(dealId, data) {
  const params = { requirementId: data.id }
  return request({
    url: `/requirements/${dealId}`,
    method: 'put',
    params,
    data
  })
}
