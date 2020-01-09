const TokenKey = 'Admin-Token'

export function getToken() {
  return window.localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return window.localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  window.localStorage.removeItem(TokenKey)
}
