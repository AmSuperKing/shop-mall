import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  const inFifteenMinutes = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  return Cookies.set(TokenKey, token, { expires: inFifteenMinutes })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
