const TokenKey = 'token'

export function getToken() {
  let userToken = ''
  try {
    uni.getStorage({
      key: TokenKey,
      success: (res) => {
        userToken = res.data
      }
    })
  } catch (e) {
    // console.log(e)
  }
  return userToken
}

export function setToken(token) {
  return uni.setStorage({
    key: TokenKey,
    data: token
  })
}

export function removeToken() {
  return uni.removeStorage({
    key: TokenKey
  })
}
