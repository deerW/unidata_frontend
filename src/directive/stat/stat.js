import { createStatLog } from '@/api/analytic'

export default {
  bind(el, binding) {
    el.addEventListener('click', e => {
      const data = {
        event: binding.value.event,
        desc: binding.value.desc
      }
      if (binding.value.dealId) data.dealId = binding.value.dealId
      createStatLog(data).then(res => {
        console.log('已储存埋点')
      }).catch(error => {
        console.log(error)
      })
    }, false)
  }
}
