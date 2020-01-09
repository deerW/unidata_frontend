import request from '@/utils/request'

export function getTables(params) {
  return request({
    url: '/database/tables',
    method: 'get',
    params
  })
}

export function createTable(params) {
  return request({
    url: '/database/tables',
    method: 'post',
    params
  })
}

export function updateTable(params) {
  return request({
    url: `/database/tables/${params.id}`,
    method: 'put',
    params
  })
}
export function updateColumn(tableId, params) {
  return request({
    url: `/database/tables/${tableId}/columns`,
    method: 'put',
    data: params
  })
}

export function getTable(id) {
  return request({
    url: `/database/tables/${id}`,
    method: 'get'
  })
}

export function getColumns(tableId) {
  return request({
    url: `/database/tables/${tableId}/columns`,
    method: 'get'
  })
}
export function getSelectTables(params) {
  return request({
    url: '/database/table/search',
    method: 'get',
    params
  })
}
export function getSelectDatabases(params) {
  return request({
    url: '/database/database/search',
    method: 'get',
    params
  })
}
export function getSelectInvolvedFunctions(params) {
  return request({
    url: '/database/involved_function/search',
    method: 'get',
    params
  })
}
export function getDataLineage(columnId) {
  return request({
    url: `/database/data_lineage/${columnId}/relations`,
    method: 'get'
  })
}
export function updateDataLineage(params) {
  return request({
    url: `/database/data_lineage/${params.columnId}/relations`,
    method: 'put',
    data: params.data
  })
}
export function createDataLineage(params) {
  return request({
    url: `/database/data_lineage/${params.columnId}/relations`,
    method: 'post',
    data: params.data
  })
}
