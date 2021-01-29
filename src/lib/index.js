import LoginComp from './login'
const sha1 = require('js-sha1')
export default LoginComp
const tailLength = 3
export const generatePassword = (expireAt, key) => {
  // 8位过期时间颠倒后和密钥数字相加转化为36进制字符串
  const reversed = expireAt.toString().split('').reverse().join('')
  const n36 = (reversed - 0 + (key - 0)).toString(36)
  // 8位过期时间和密钥拼字符串并进行sha1转换
  const sha = sha1(`${expireAt}${key}`)
  // 取sha的后3位作为尾巴
  const tail = sha.substring(sha.length - tailLength)
  // 36进制字符串和尾巴拼成最终密码
  const password = `${n36}${tail}`
  return password
}