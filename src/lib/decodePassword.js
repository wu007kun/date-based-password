const sha1 = require('js-sha1')
const tailLength = 3
const addZero = (num, total = 2) => {
  const str = `${new Array(total).fill(0).join('')}${num}`
  return str.substring(str.length - total)
}

export default (password, key) => {
  password = password.toString()
  // 从密码中分离出36进制字符串和尾巴
  const n36 = password.substring(0, password.length - tailLength)
  const tail = password.substring(password.length - tailLength)
  // 36位字符串转化为10进制数字，即(reversed - 0 + key)
  const n10 = Number.parseInt(n36, 36)
  // 10进制数字减去密钥并补0得到reversed
  const reversed = addZero(n10 - key, 8)
  // 再反转得到过期时间
  const expireAt = reversed.split('').reverse().join('') - 0
  // 用解得的过期时间和密钥计算sha
  /* eslint-disable */
    const sha = sha1(`${expireAt}${key}`)
    // 校验sha的后3位是否等于尾巴
    if (tail === sha.substring(sha.length - tailLength)) {
      const expireStr = `${expireAt.toString().substring(0, 4)}-${expireAt.toString().substring(4, 6)}-${expireAt.toString().substring(6, 8)}`
      const expireTime = new Date(expireStr).getTime()
      const now = new Date()
      const nowStr = `${now.getFullYear()}-${addZero(now.getMonth() + 1)}-${addZero(now.getDate())}`
      const nowTime = new Date(nowStr).getTime()
      if (expireTime > nowTime) {
        return {
          code: 200,
          info: expireTime
        }
      } else {
        return {
          code: 403,
          info: 'expired'
        }
      }
    } else {
      return {
        code: 401,
        info: 'error'
      }
    }
}
