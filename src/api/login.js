import request from '@/utils/request'

export function passwordLogin(email, password) {
  return request({
    url: '/admin/oauth/token',
    method: 'post',
    data: {
      email,
      password
    }
  })
}

export function authLogin(token) {
  return request({
    url: '/sessions/login_via_sso',
    method: 'post',
    data: {
      token
    }
  })
}

export function getInfo(Authorization) {
  return request({
    url: '/admin/profile',
    method: 'get',
    params: { Authorization: `Bearer ${Authorization}` }
  })
}

export function getPermission(token) {
  return request({
    url: 'permissions',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
