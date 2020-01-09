import permission from './permission'

const install = function(Vue) {
  Vue.prototype.$permission = function(permissionName) {
    const { operationPermission, userPermission } = this.$store.getters
    const allPermission = Object.assign({}, operationPermission, userPermission)
    return allPermission[permissionName]
  }
  Vue.directive('permission', permission)
}

if (window.Vue) {
  window['permission'] = permission
  Vue.use(install); // eslint-disable-line
}

permission.install = install
export default permission
