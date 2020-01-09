import stat from './stat'

const install = function(Vue) {
  Vue.directive('stat', stat)
}

if (window.Vue) {
  window.stat = stat
  Vue.use(install); // eslint-disable-line
}

stat.install = install
export default stat
