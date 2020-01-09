import request from '@/utils/request'

export function getModules(params) {
  return request({
    url: '/module/modules',
    method: 'get',
    params
  })
}

