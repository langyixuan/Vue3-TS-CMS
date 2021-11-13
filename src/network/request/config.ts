/**
 * 环境变量配置文件
 */

// 根据process.env.NODE_ENV进行环境区分, webpack在打包时会根据当前的环境给process.env.NODE_ENV注入不同的值
/**
 * 1. 开发环境： development
 * 2. 生产环境： production
 * 3. 测试环境： test
 */

let BASE_URL = ''
const TIME_OUT = 1000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://123.207.32.32:8000/'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coderwhy.org/dev'
} else {
  BASE_URL = 'http://coderwhy.org/dev'
}

export { BASE_URL, TIME_OUT }
