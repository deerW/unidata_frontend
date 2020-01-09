import axios from 'axios'

// 暂时将novachat公告中的资源按钮配置数据放在JSON文件中
export function getResourceData() {
  return axios({
    method: 'get',
    url: '/static/novaResourceData.json'
  })
}

// 暂时将novachat公告中的更新公告配置数据放在JSON文件中
export function getUpdateInfoData() {
  return axios({
    method: 'get',
    url: '/static/novaUpdateInfoData.json'
  })
}
