/*
* 获取当前时间
* 2020-01-01 00:00:00
* */
export function getCurrentDate() {
  var date = new Date()
  var seperator1 = '-'
  var seperator2 = ':'
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
  ' ' + date.getHours() + seperator2 + ((Array(2).join(0) + date.getMinutes()).slice(-2)).slice(-length)
  // seperator2 + date.getSeconds()
  return currentdate
}
