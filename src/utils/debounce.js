var last
export function debounce(idle, action) {
  return function() {
    const ctx = this
    const args = arguments
    clearTimeout(last)

    last = setTimeout(function() {
      action.apply(ctx, args)
    }, idle)
  }
}

// 节流函数
export function throttle(delay, action) {
  var last = 0
  return function() {
    var curr = +new Date()
    if (curr - last > delay) {
      action.apply(this, arguments)
      last = curr
    }
  }
}
