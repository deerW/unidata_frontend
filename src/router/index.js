import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    permissionName: 'page_permission'    page permission depend on back_end return data, be true can entry,else not.
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('error/404'), hidden: true },
  { path: '/401', component: _import('error/401'), hidden: true },

  {
    path: '',
    component: Layout
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/tables',
    component: Layout,
    redirect: 'noredirect',
    name: 'table',
    title: '数据字典',
    meta: {
      title: '数据字典',
      icon: 'form',
      permissionName: 'database.tables.index'
    },
    children: [
      {
        path: 'index',
        name: 'tableIndex',
        component: _import('table/index'),
        meta: {
          title: '数据字典',
          icon: 'table',
          permissionName: 'database.tables.index'
        }
      },
      {
        path: 'new',
        name: 'tableNew',
        component: _import('table/new'),
        hidden: true,
        meta: {
          title: '新增',
          icon: 'table',
          permissionName: 'database.tables.store'
        }
      },
      {
        path: ':id/update',
        name: 'tableUpdate',
        component: _import('table/update'),
        hidden: true,
        meta: {
          title: '编辑',
          icon: 'table',
          permissionName: 'database.tables.update'
        }
      },
      {
        path: ':id/show',
        name: 'tableShow',
        component: _import('table/show'),
        hidden: true,
        meta: {
          title: '详情',
          icon: 'table',
          permissionName: 'database.tables.show'
        }
      }
    ]
  },
  {
    path: '/maps',
    component: Layout,
    redirect: 'noredirect',
    name: 'database',
    meta: {
      title: '血缘地图',
      icon: 'tree',
      permissionName: 'database.tables.index'
    },
    children: [
      {
        path: 'index',
        name: 'mapIndex',
        component: _import('map/index'),
        meta: {
          title: '血缘地图',
          icon: 'table',
          permissionName: 'database.tables.index'
        }
      }
    ]
  },
  {
    path: '/indicators',
    component: Layout,
    redirect: 'noredirect',
    name: 'indicator',
    meta: {
      title: '指标管理',
      icon: 'manager',
      permissionName: 'indicator.indicators.index'
    },
    children: [
      {
        path: 'index',
        name: 'indicatorIndex',
        component: _import('indicator/index'),
        meta: {
          title: '指标管理',
          icon: 'table',
          permissionName: 'indicator.indicators.index'
        }
      },
      {
        path: 'new',
        name: 'indicatorNew',
        component: _import('indicator/new'),
        hidden: true,
        meta: {
          title: '新增',
          icon: 'table',
          permissionName: 'indicator.indicators.store'
        }
      },
      {
        path: ':id/show',
        name: 'indicatorShow',
        component: _import('indicator/show'),
        hidden: true,
        meta: {
          title: '详情',
          icon: 'table',
          permissionName: 'indicator.indicators.show'
        }
      },
      {
        path: ':id/update',
        name: 'indicatorUpdate',
        component: _import('indicator/update'),
        hidden: true,
        meta: {
          title: '编辑',
          icon: 'table',
          permissionName: 'indicator.indicators.update'
        }
      }
    ]
  }
  // { path: '*', redirect: '/404', hidden: true }
]
