import request from '@/utils/request'

export function createStatLog(data) {
  return request({
    url: 'analytics/stat_logs',
    method: 'post',
    data: data
  })
}
