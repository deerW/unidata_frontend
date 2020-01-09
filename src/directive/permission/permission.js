import store from '@/store'

export default {
  inserted(el, binding) {
    const { value } = binding
    const { operationPermission, userPermission } = store.getters
    const allPermission = Object.assign({}, operationPermission, userPermission)

    if (value && value instanceof Array && value.length > 0) {
      const permissionNames = value

      const hasPermission = permissionNames.some(permissionName => {
        return allPermission[permissionName]
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`v-permission directive need a permissionName array! Like v-permission="['showOrNot']"`)
    }
  }
}
