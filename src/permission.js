import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    const userPermission = store.getters.userPermission
    if (!userPermission || userPermission.length === 0) {
      store.dispatch('GetInfo').then(_ => {
        const userPermission = store.getters.userPermission
        store.dispatch('GenerateRoutes', userPermission).then(() => { // 生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRouters已完成 ,replace: true so the navigation will not leave a history record
          next({ path: '/tables/index' })
        })
      }).catch((error) => {
        console.log(error)
        next()
        next({ path: '/401' })
      })
    } else {
      next()
    }
  } else {
    checkIsWhiteList(to.path) ? next() : next('/login')
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

function checkIsWhiteList(toPath) {
  const whiteList = ['/login'] // 不重定向白名单

  for (const whitePath of whiteList) {
    if (new RegExp(whitePath).test(toPath)) return true
  }

  return false
}
