/* eslint-disable */
import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, userPermission) {
  // const accessedRouters = asyncRouterMap.filter(route => {
  //   if (route.path === '*') return true
  //   if (!route.meta || !route.meta.permissionName) return false
  //   if ( pagePermission[route.meta.permissionName] !== false ) {
  //     if (route.children && route.children.length) {
  //       route.children = filterAsyncRouter(route.children, pagePermission)
  //     }
  //     return true
  //   }else{
  //     return false
  //   }
  // })
  // return accessedRouters
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.path === '*') return true

    if ( route.children && route.children.length ) {
      route.children = filterAsyncRouter(route.children, userPermission)
      return true
    }

    if (!route.meta || !route.meta.permissionName) return false
    const hasPermission = userPermission.indexOf(route.meta.permissionName) !== -1  

    return hasPermission
  })
  return accessedRouters
}


const permissionStoreModule = {
  state: {
    permissionRouters: constantRouterMap ? constantRouterMap.concat(asyncRouterMap) : [],
    addRouters: asyncRouterMap
  },
  mutations: {
    SET_ROUTERS: (state, routes) => {
      state.addRouters = routes
      state.permissionRouters = constantRouterMap.concat(routes)
    }
  },
  actions: {
    GenerateRoutes({ commit }, userPermission) {
      return new Promise(resolve => {
        let accessedRouters
        accessedRouters = filterAsyncRouter(asyncRouterMap, userPermission)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}
// const permissionStoreModule = {
//   state: {
//     routers: constantRouterMap,
//     addRouters: []
//   },
//   mutations: {
//     SET_ROUTERS: (state, routers) => {
//       state.addRouters = routers
//       state.routers = constantRouterMap.concat(routers)
//     }
//   },
//   actions: {
//     GenerateRoutes({ commit }, data) {
//       return new Promise(resolve => {
//         const pagePermission = data
//         let accessedRouters
//         accessedRouters = filterAsyncRouter(asyncRouterMap, pagePermission)
//         commit('SET_ROUTERS', accessedRouters)
//         resolve()
//       })
//     }
//   }
// }

export default permissionStoreModule
