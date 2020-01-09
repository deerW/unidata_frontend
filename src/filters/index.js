export { parseTime, formatTime } from '@/utils'

export function priceSymbol(price) {
  if (!price && price !== 0) return ''
  return `¥ ${price}`
}

export function secondToDuration(sec) {
  const hourNum = Math.floor(sec / 3600)
  const hour = hourNum ? hourNum + '小时' : ''

  sec = sec % 3600
  const minNum = Math.floor(sec / 60)
  const min = minNum ? minNum + '分钟' : ''

  sec = sec % 60 + '秒'

  return hour + min + sec
}
